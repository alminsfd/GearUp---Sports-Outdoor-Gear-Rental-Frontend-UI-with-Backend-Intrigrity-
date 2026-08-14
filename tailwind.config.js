/** @type {import('tailwindcss').Config} */
module.exports = {
     darkMode: ["class"],
     content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
     theme: {
          extend: {
               colors: {
                    background: "hsl(var(--background))",
                    foreground: "hsl(var(--foreground))",
                    card: {
                         DEFAULT: "hsl(var(--card))",
                         foreground: "hsl(var(--card-foreground))",
                    },
                    primary: {
                         DEFAULT: "hsl(var(--primary))",
                         foreground: "hsl(var(--primary-foreground))",
                    },
                    secondary: {
                         DEFAULT: "hsl(var(--secondary))",
                         foreground: "hsl(var(--secondary-foreground))",
                    },
                    muted: {
                         DEFAULT: "hsl(var(--muted))",
                         foreground: "hsl(var(--muted-foreground))",
                    },
                    accent: {
                         DEFAULT: "hsl(var(--accent))",
                         foreground: "hsl(var(--accent-foreground))",
                    },
                    destructive: {
                         DEFAULT: "hsl(var(--destructive))",
                         foreground: "hsl(var(--destructive-foreground))",
                    },
                    border: "hsl(var(--border))",
                    input: "hsl(var(--input))",
                    ring: "hsl(var(--ring))",

                    // 🏆 Status Badge Token Mapping
                    status: {
                         placed: {
                              bg: "hsl(var(--status-placed-bg))",
                              text: "hsl(var(--status-placed-text))",
                              border: "hsl(var(--status-placed-border))",
                         },
                         confirmed: {
                              bg: "hsl(var(--status-confirmed-bg))",
                              text: "hsl(var(--status-confirmed-text))",
                              border: "hsl(var(--status-confirmed-border))",
                         },
                         paid: {
                              bg: "hsl(var(--status-paid-bg))",
                              text: "hsl(var(--status-paid-text))",
                              border: "hsl(var(--status-paid-border))",
                         },
                         picked: {
                              bg: "hsl(var(--status-picked-bg))",
                              text: "hsl(var(--status-picked-text))",
                              border: "hsl(var(--status-picked-border))",
                         },
                         returned: {
                              bg: "hsl(var(--status-returned-bg))",
                              text: "hsl(var(--status-returned-text))",
                              border: "hsl(var(--status-returned-border))",
                         },
                         cancelled: {
                              bg: "hsl(var(--status-cancelled-bg))",
                              text: "hsl(var(--status-cancelled-text))",
                              border: "hsl(var(--status-cancelled-border))",
                         },
                    },
               },
               borderRadius: {
                    lg: "var(--radius)",
                    md: "calc(var(--radius) - 2px)",
                    sm: "calc(var(--radius) - 4px)",
               },
          },
     },
     plugins: [],
};