import React, { useEffect, useRef, useState } from 'react';
import { MapPin } from 'lucide-react';
import tamilNaduDistricts from '../data/tamilNaduDistricts.json';

/**
 * Offline Branch Map Component
 * Displays branches on a canvas-based coordinate system without external tile servers
 */
const BranchMap = ({ branches, regionName }) => {
    const canvasRef = useRef(null);
    const [selectedBranch, setSelectedBranch] = useState(null);
    const [hoveredBranch, setHoveredBranch] = useState(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        if (!branches || branches.length === 0) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;

        // Extract coordinates from branches
        const coords = branches
            .filter(b => b.latitude && b.longitude)
            .map(b => ({
                ...b,
                lat: parseFloat(b.latitude),
                lng: parseFloat(b.longitude)
            }));

        if (coords.length === 0) {
            ctx.fillStyle = '#94a3b8';
            ctx.font = '14px Inter, sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText('Map data not available for this region', width / 2, height / 2);
            return;
        }

        // Calculate bounds
        const lats = coords.map(c => c.lat);
        const lngs = coords.map(c => c.lng);
        const minLat = Math.min(...lats);
        const maxLat = Math.max(...lats);
        const minLng = Math.min(...lngs);
        const maxLng = Math.max(...lngs);

        // Add padding
        const latPadding = (maxLat - minLat) * 0.1 || 0.1;
        const lngPadding = (maxLng - minLng) * 0.1 || 0.1;

        // Apply cosine correction for latitude (Tamil Nadu is around 10-13°N)
        const centerLat = (minLat + maxLat) / 2;
        const latCosCorrection = Math.cos(centerLat * Math.PI / 180);

        // Calculate aspect ratios with latitude correction
        const dataLatRange = maxLat - minLat + 2 * latPadding;
        const dataLngRange = (maxLng - minLng + 2 * lngPadding) * latCosCorrection;
        const dataAspect = dataLngRange / dataLatRange;
        const canvasAspect = width / height;

        // Adjust bounds to preserve aspect ratio
        let adjustedMinLat = minLat - latPadding;
        let adjustedMaxLat = maxLat + latPadding;
        let adjustedMinLng = minLng - lngPadding;
        let adjustedMaxLng = maxLng + lngPadding;

        if (dataAspect > canvasAspect) {
            // Data is wider - add vertical padding
            const targetLatRange = dataLngRange / canvasAspect;
            const currentLatRange = adjustedMaxLat - adjustedMinLat;
            const extraPadding = (targetLatRange - currentLatRange) / 2;
            adjustedMinLat -= extraPadding;
            adjustedMaxLat += extraPadding;
        } else {
            // Data is taller - add horizontal padding
            const targetLngRange = (adjustedMaxLat - adjustedMinLat) * canvasAspect / latCosCorrection;
            const currentLngRange = adjustedMaxLng - adjustedMinLng;
            const extraPadding = (targetLngRange - currentLngRange) / 2;
            adjustedMinLng -= extraPadding;
            adjustedMaxLng += extraPadding;
        }

        // Map projection - cosine correction already applied in bounds
        const project = (lat, lng) => {
            const x = ((lng - adjustedMinLng) / (adjustedMaxLng - adjustedMinLng)) * width;
            const y = height - ((lat - adjustedMinLat) / (adjustedMaxLat - adjustedMinLat)) * height;
            return { x, y };
        };

        // Clear and draw background
        ctx.clearRect(0, 0, width, height);
        ctx.fillStyle = '#f8fafc';
        ctx.fillRect(0, 0, width, height);

        // Draw district boundaries from GeoJSON
        tamilNaduDistricts.features.forEach(feature => {
            const districtName = feature.properties.dtname;
            const coords = feature.geometry.coordinates[0];
            const isRegionDistrict = districtName === "Dindigul" || districtName === "Theni";

            // Draw polygon
            ctx.beginPath();
            coords.forEach((point, i) => {
                const { x, y } = project(point[1], point[0]); // GeoJSON is [lng, lat]
                if (i === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            });
            ctx.closePath();

            // Fill
            if (isRegionDistrict) {
                ctx.fillStyle = 'rgba(251, 146, 60, 0.12)';
                ctx.fill();
            }

            // Stroke
            ctx.strokeStyle = isRegionDistrict ? '#f59e0b' : '#cbd5e1';
            ctx.lineWidth = isRegionDistrict ? 2.5 : 1;
            ctx.stroke();

            // Label at centroid
            const avgLat = coords.reduce((sum, p) => sum + p[1], 0) / coords.length;
            const avgLng = coords.reduce((sum, p) => sum + p[0], 0) / coords.length;
            const center = project(avgLat, avgLng);
            ctx.fillStyle = isRegionDistrict ? '#ea580c' : '#94a3b8';
            ctx.font = isRegionDistrict ? 'bold 11px Inter' : '10px Inter';
            ctx.textAlign = 'center';
            ctx.fillText(districtName, center.x, center.y);
        });

        // Draw grid
        ctx.strokeStyle = '#e2e8f0';
        ctx.lineWidth = 0.5;
        for (let i = 0; i <= 10; i++) {
            const x = (i / 10) * width;
            const y = (i / 10) * height;
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, height);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(width, y);
            ctx.stroke();
        }

        // Draw branches
        coords.forEach((branch, idx) => {
            const { x, y } = project(branch.lat, branch.lng);
            const isHovered = hoveredBranch === idx;
            const isSelected = selectedBranch?.branch_code === branch.branch_code;

            ctx.beginPath();
            ctx.arc(x, y, isHovered || isSelected ? 8 : 6, 0, 2 * Math.PI);
            ctx.fillStyle = isSelected ? '#f59e0b' : isHovered ? '#3b82f6' : '#254aa0';
            ctx.fill();
            ctx.strokeStyle = 'white';
            ctx.lineWidth = 2;
            ctx.stroke();
        });

        canvas.coords = coords.map(c => ({ ...c, ...project(c.lat, c.lng) }));

    }, [branches, hoveredBranch, selectedBranch]);

    const handleCanvasClick = (e) => {
        const canvas = canvasRef.current;
        if (!canvas || !canvas.coords) return;

        const rect = canvas.getBoundingClientRect();
        // Account for canvas scaling
        const scaleX = 800 / rect.width;
        const scaleY = 500 / rect.height;
        const clickX = (e.clientX - rect.left) * scaleX;
        const clickY = (e.clientY - rect.top) * scaleY;

        const clicked = canvas.coords.find(c => {
            const dist = Math.sqrt((c.x - clickX) ** 2 + (c.y - clickY) ** 2);
            return dist < 10;
        });

        setSelectedBranch(clicked || null);
    };

    const handleCanvasMove = (e) => {
        const canvas = canvasRef.current;
        if (!canvas || !canvas.coords) return;

        const rect = canvas.getBoundingClientRect();
        // Account for canvas scaling (800x500 canvas scaled to fit container)
        const scaleX = 800 / rect.width;
        const scaleY = 500 / rect.height;
        const moveX = (e.clientX - rect.left) * scaleX;
        const moveY = (e.clientY - rect.top) * scaleY;

        // Store mouse position relative to canvas container
        setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });

        const hovered = canvas.coords.findIndex(c => {
            const dist = Math.sqrt((c.x - moveX) ** 2 + (c.y - moveY) ** 2);
            return dist < 10;
        });

        setHoveredBranch(hovered >= 0 ? hovered : null);
        canvas.style.cursor = hovered >= 0 ? 'pointer' : 'default';
    };

    return (
        <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-4">
                <MapPin className="text-blue-600" size={24} />
                <div>
                    <h3 className="text-xl font-bold text-gray-900">Branch Network Map</h3>
                    <p className="text-sm text-gray-600">{regionName} - {branches?.length || 0} Branches</p>
                </div>
            </div>

            <div className="relative">
                <canvas
                    ref={canvasRef}
                    width={800}
                    height={500}
                    onClick={handleCanvasClick}
                    onMouseMove={handleCanvasMove}
                    onMouseLeave={() => setHoveredBranch(null)}
                    className="w-full border border-gray-200 rounded-lg"
                    style={{ maxHeight: '500px' }}
                />

                {selectedBranch && (
                    <div className="absolute top-4 right-4 bg-white rounded-lg shadow-xl p-4 border-l-4 border-orange-500 max-w-xs">
                        <button
                            onClick={() => setSelectedBranch(null)}
                            className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                        >
                            ×
                        </button>
                        <h4 className="font-bold text-gray-900 mb-2">{selectedBranch.branch_name}</h4>
                        <div className="text-sm text-gray-600 space-y-1">
                            <p><span className="font-medium">Code:</span> {selectedBranch.branch_code}</p>
                            <p><span className="font-medium">Type:</span> {selectedBranch.type || 'General Branch'}</p>
                            <p><span className="font-medium">Category:</span> {selectedBranch.category || 'N/A'}</p>
                            {selectedBranch.district && (
                                <p><span className="font-medium">District:</span> {selectedBranch.district}</p>
                            )}
                        </div>
                    </div>
                )}

                {hoveredBranch !== null && !selectedBranch && branches[hoveredBranch] && (
                    <div
                        className="absolute bg-gray-900 text-white px-3 py-2 rounded-lg shadow-lg text-sm font-medium pointer-events-none whitespace-nowrap"
                        style={{
                            left: `${mousePos.x}px`,
                            top: `${mousePos.y - 40}px`,
                            transform: 'translateX(-50%)',
                            zIndex: 1000
                        }}
                    >
                        {branches[hoveredBranch].branch_name}
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-gray-900"></div>
                    </div>
                )}
            </div>

            <div className="mt-4 flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                    <span>Branch Location</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                    <span>Selected</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-8 h-3 bg-orange-100 border border-orange-500"></div>
                    <span>Region Districts</span>
                </div>
            </div>
        </div>
    );
};

export default BranchMap;
