export const THEME = {
  colors: {
    primary: {
      red: '#CE1126',    // Ghana Red
      yellow: '#FFD700', // Ghana Yellow
      green: '#006B3F'   // Ghana Green
    }
  },
  components: {
    button: {
      base: [
        "inline-flex items-center justify-center",
        "rounded-md text-sm font-medium",
        "transition-colors focus-visible:outline-none",
        "focus-visible:ring-2 focus-visible:ring-offset-2",
        "disabled:pointer-events-none disabled:opacity-50"
      ].join(" ")
    }
  }
} as const;