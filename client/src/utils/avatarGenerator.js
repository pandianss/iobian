/**
 * Generate a local SVG avatar with initials
 * Replaces ui-avatars.com CDN dependency for closed network deployment
 */
export const generateAvatarSVG = (name) => {
    if (!name) name = 'User';

    // Extract initials (first letter of first two words)
    const initials = name
        .split(' ')
        .slice(0, 2)
        .map(word => word[0])
        .join('')
        .toUpperCase();

    // Generate a consistent color based on name
    const colors = [
        '#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981',
        '#06b6d4', '#6366f1', '#f43f5e', '#14b8a6', '#a855f7'
    ];

    let hash = 0;
    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const color = colors[Math.abs(hash) % colors.length];

    // Create SVG data URL
    const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100">
      <rect width="100" height="100" fill="${color}"/>
      <text x="50" y="50" font-family="Arial, sans-serif" font-size="40" font-weight="bold" 
            fill="white" text-anchor="middle" dominant-baseline="central">
        ${initials}
      </text>
    </svg>
  `.trim();

    return `data:image/svg+xml;base64,${btoa(svg)}`;
};
