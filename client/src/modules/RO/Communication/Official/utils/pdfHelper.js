
/**
 * Helper to generate PDFs using jsPDF with improved asset handling.
 * 
 * Key Features:
 * 1. Clones the target DOM element.
 * 2. Rasterizes SVG images (standard img tags with .svg src) to PNG to avoid jsPDF rendering issues.
 * 3. Uses jsPDF.html() for text-selectable output.
 */

export const generatePDF = async (elementId, fileName) => {
    try {
        // Dynamically import to keep bundle small (used for rasterizing header/images)
        const { default: html2canvas } = await import('html2canvas');

        const originalElement = document.getElementById(elementId);
        if (!originalElement) {
            console.error(`Element not found: ${elementId}`);
            return;
        }

        // 1. Clone the element to manipulate it visually without affecting UI
        const clone = originalElement.cloneNode(true);

        // Remove ID to avoid picking up @media screen #printable-content styles (borders, margins)
        clone.removeAttribute('id');

        // Apply shared print class for styling
        clone.classList.add('pdf-export-mode');

        // Ensure clone is visible and has defined width for canvas
        // off-screen or fixed so it doesn't mess up the view, but is capturable.
        clone.style.position = 'fixed';
        clone.style.left = '0'; // Move back to visible area (hidden by z-index) to ensure capture
        clone.style.top = '0';
        clone.style.zIndex = '-9999';
        clone.style.visibility = 'visible';

        // Remove manual styling - RELY ON CSS (.pdf-export-mode)

        // Remove aggressive image overrides that break specific sizing (e.g. Logo)
        // Only ensure they don't overflow
        clone.querySelectorAll('img').forEach(img => {
            img.style.maxWidth = '100%';
        });

        // Rasterize Header to support Hindi (which doesn't render in jsPDF text mode without fonts)
        const header = clone.querySelector('.print-header');
        if (header) {
            // We need to temporarily append clone to body to rasterize it, 
            // but we'll specific rasterize just the header.
            // Actually html2canvas needs the element to be in DOM or cloned from DOM.
            // We can rasterize the ORIGINAL header to avoid style hacks on the clone?
            // No, let's use the clone's header after appending clone? 
            // Yes, append clone first, then rasterize parts, then doc.html.
        }

        document.body.appendChild(clone);

        // 2b. Rasterize Header (Fix for Hindi)
        if (header) {
            try {
                const canvas = await html2canvas(header, {
                    scale: 2,
                    backgroundColor: '#ffffff'
                });
                const imgData = canvas.toDataURL('image/png');
                const img = document.createElement('img');
                img.src = imgData;
                img.style.width = '100%';
                img.style.display = 'block';

                // Clear header text/content and replace with image
                header.innerHTML = '';
                header.appendChild(img);
            } catch (e) {
                console.warn("Failed to rasterize header", e);
            }
        }

        // 2. Rasterize Images (specifically SVGs)
        // jsPDF's .html() renderer often garbles SVGs or fails to render them.
        // We replace them with canvas-generated PNGs.
        const images = clone.querySelectorAll('img');
        const processingPromises = Array.from(images).map(img => {
            return new Promise((resolve) => {
                if (img.complete) {
                    processImage(img, resolve);
                } else {
                    img.onload = () => processImage(img, resolve);
                    img.onerror = resolve; // Skip on error
                }
            });
        });

        await Promise.all(processingPromises);

        // 3. Generate PDF
        // Dynamically import to keep bundle small
        const { jsPDF } = await import('jspdf');

        // USE PIXELS (px) - Strict 1:1 mapping with CSS
        // A4 at 96 DPI = 794px x 1123px
        const pdfWidth = 794;
        const pdfHeight = 1123;

        const doc = new jsPDF({
            unit: 'px',
            format: [pdfWidth, pdfHeight],
            orientation: 'portrait',
            hotfixes: ['px_scaling'] // Try to fix HiDPI issues if supported
        });

        // Use .html() worker
        await doc.html(clone, {
            callback: function (doc) {
                doc.save(fileName);
                document.body.removeChild(clone); // Cleanup
            },
            x: 0,
            y: 0,
            width: pdfWidth,
            windowWidth: pdfWidth,
            autoPaging: 'text',
            html2canvas: {
                scale: 1,
                useCORS: true,
                logging: true,
                letterRendering: true
            }
        });

    } catch (error) {
        console.error("PDF Generation Failed", error);
        alert("Failed to export PDF. Please checks logs.");
    }
};

const processImage = (img, resolve) => {
    try {
        // If it's an SVG or we just want to be safe, rasterize it
        // Check extension or just do it for all to be safe?
        // Let's do it for all to ensure exact visual fidelity.

        const canvas = document.createElement('canvas');
        canvas.width = img.width || img.naturalWidth;
        canvas.height = img.height || img.naturalHeight;

        // Skip 0-size images
        if (canvas.width === 0 || canvas.height === 0) {
            resolve();
            return;
        }

        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        // Replace src
        img.src = canvas.toDataURL('image/png');
        resolve();
    } catch (e) {
        console.warn("Could not rasterize image for PDF", e);
        resolve();
    }
};
