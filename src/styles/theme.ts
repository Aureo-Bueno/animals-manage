export const theme = {
  colors: {
    background: '#f6f4ef',
    text: '#1c1a17',
    primary: '#2f4f4f',
    accent: '#d2691e',
    surface: '#ffffff',
    border: '#e2ded4',
  },
  radii: {
    sm: '6px',
    md: '10px',
    lg: '16px',
  },
  spacing: (factor: number) => `${factor * 8}px`,
  shadow: {
    sm: '0 1px 2px rgba(0, 0, 0, 0.08)',
    md: '0 6px 16px rgba(0, 0, 0, 0.12)',
  },
} as const;
