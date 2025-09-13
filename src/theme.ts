// src/theme.ts
export const theme = {
  colors: {
    primary: "#3b82f6",
    secondary: "#10b981",
    danger: "#ef4444",
    surface: "#ffffff",
    background: "#f9fafb",
    text: {
      primary: "#111827",
      secondary: "#6b7280",
      inverse: "#ffffff",
    },
    border: "#e5e7eb",
  },
  spacing: (n: number) => n * 4, // spacing(2)=8px
  radius: {
    sm: 6,
    md: 10,
    lg: 16,
    full: 999,
  },
  font: {
    title: { fontSize: 20, fontWeight: 700, color: "#111827" },
    body: { fontSize: 16, color: "#111827" },
    caption: { fontSize: 12, color: "#6b7280" },
  },
};
