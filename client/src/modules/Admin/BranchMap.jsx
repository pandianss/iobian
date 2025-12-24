import React, { useEffect, useState, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, GeoJSON, Tooltip, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon in React-Leaflet
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const BranchMap = ({ branches }) => {
    // Default center (India)
    const defaultCenter = [20.5937, 78.9629];

    // State for District GeoJSON
    const [geoData, setGeoData] = useState(null);

    // 1. Identify active districts and their regions from branches
    const activeMap = useMemo(() => {
        const map = {}; // districtLowerCase -> { region_code, count }
        branches.forEach(b => {
            if (b.district) {
                const d = b.district.toLowerCase();
                if (!map[d]) map[d] = { region: b.region_code, count: 0, properName: b.district };
                map[d].count++;
            }
        });
        return map;
    }, [branches]);

    // 2. Fetch GeoJSON Data
    useEffect(() => {
        fetch('https://raw.githubusercontent.com/geohacker/india/master/district/india_district.geojson')
            .then(res => res.json())
            .then(data => {
                setGeoData(data);
            })
            .catch(err => console.error("Failed to load map data", err));
    }, []);

    // 3. Filter Features & Style
    const districtLayer = useMemo(() => {
        if (!geoData) return null;

        const features = geoData.features.filter(f => {
            const districtName = f.properties.NAME_2 || f.properties.district; // Common props
            return districtName && activeMap[districtName.toLowerCase()];
        });

        return {
            type: "FeatureCollection",
            features: features
        };
    }, [geoData, activeMap]);

    // Helper to get matching region for a feature
    const getRegionForFeature = (feature) => {
        const dName = feature.properties.NAME_2 || feature.properties.district;
        return activeMap[dName?.toLowerCase()]?.region || 'Unknown';
    };

    const onEachFeature = useCallback((feature, layer) => {
        const dName = feature.properties.NAME_2 || feature.properties.district;
        const info = activeMap[dName?.toLowerCase()];
        layer.bindTooltip(
            `<div>
                <strong>${dName}</strong><br/>
                Region: ${info?.region}<br/>
                Branches: ${info?.count}
            </div>`,
            { sticky: true }
        );
    }, [activeMap]);

    const style = useCallback((feature) => {
        // Color coding could be random or hashed based on Region
        // For now, a generic blue with opacity
        const region = getRegionForFeature(feature);
        // Simple hash for color
        const hash = region.split('').reduce((acc, char) => char.charCodeAt(0) + acc, 0);
        const hue = hash % 360;

        return {
            fillColor: `hsl(${hue}, 70%, 50%)`,
            weight: 1,
            opacity: 1,
            color: 'white', // Border color
            dashArray: '3',
            fillOpacity: 0.4
        };
    }, [activeMap]); // Depends on activeMap via getRegionForFeature (closure) or direct

    // Calculate Region Labels (Centroids of all districts in a region?)
    // This is complex without turf.js. We'll simplify:
    // Just show a Label Marker at the FIRST branch of that region or the Average Lat/Lng of branches in that region.

    // Group active branches by Region to find a center point for the label
    const regionCentroids = useMemo(() => {
        const groups = {};
        branches.forEach(b => {
            const lat = parseFloat(b.latitude);
            const lng = parseFloat(b.longitude);
            if (isNaN(lat) || isNaN(lng)) return;

            if (!groups[b.region_code]) groups[b.region_code] = { latSum: 0, lngSum: 0, count: 0 };
            groups[b.region_code].latSum += lat;
            groups[b.region_code].lngSum += lng;
            groups[b.region_code].count++;
        });

        return Object.keys(groups).map(r => ({
            region: r,
            lat: groups[r].latSum / groups[r].count,
            lng: groups[r].lngSum / groups[r].count
        }));
    }, [branches]);

    const validBranches = useMemo(() => branches.filter(b => {
        const lat = parseFloat(b.latitude);
        const lng = parseFloat(b.longitude);
        return !isNaN(lat) && !isNaN(lng);
    }), [branches]);

    // Component to auto-fit bounds
    const MapUpdater = ({ markers }) => {
        const map = useMap();

        useEffect(() => {
            if (markers.length > 0) {
                const bounds = L.latLngBounds(markers.map(b => [parseFloat(b.latitude), parseFloat(b.longitude)]));
                if (bounds.isValid()) {
                    map.fitBounds(bounds, { padding: [50, 50] });
                }
            }
        }, [markers, map]); // markers is memoized, so this is safe

        return null;
    };

    return (
        <div style={{ height: '600px', width: '100%', marginTop: '1rem', borderRadius: '8px', overflow: 'hidden', border: '1px solid #ccc', position: 'relative' }}>
            <MapContainer center={defaultCenter} zoom={5} scrollWheelZoom={true} style={{ height: '100%', width: '100%' }}>
                <TileLayer
                    attribution='&copy; OpenStreetMap'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <MapUpdater markers={validBranches} />

                {districtLayer && (
                    <GeoJSON
                        data={districtLayer}
                        style={style}
                        onEachFeature={onEachFeature}
                    />
                )}

                {/* Branch Markers */}
                {validBranches.map(b => (
                    <Marker key={b.branch_code} position={[parseFloat(b.latitude), parseFloat(b.longitude)]}>
                        <Popup>
                            <strong>{b.branch_name}</strong> <br />
                            SOL: {b.branch_code} <br />
                            Region: {b.region_code}
                        </Popup>
                    </Marker>
                ))}

                {/* Region Names Labels */}
                {regionCentroids.map(rc => (
                    <Marker
                        key={`region-${rc.region}`}
                        position={[rc.lat, rc.lng]}
                        icon={L.divIcon({
                            className: 'region-label-icon',
                            html: `<div style="background: white; padding: 2px 5px; border: 1px solid #333; border-radius: 4px; font-weight: bold; font-size: 10px; white-space: nowrap; transform: translate(-50%, -50%); box-shadow: 0 1px 2px rgba(0,0,0,0.2);">
                                     ${rc.region}
                                   </div>`,
                            iconSize: [0, 0] // Hide default sizing logic
                        })}
                    />
                ))}

            </MapContainer>
            {validBranches.length === 0 && (
                <div style={{ position: 'absolute', top: '10px', right: '10px', background: 'white', padding: '10px', borderRadius: '4px', zIndex: 1000 }}>
                    No valid coordinates found for markers.
                </div>
            )}
        </div>
    );
};

export default BranchMap;
