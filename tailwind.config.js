/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        heading: ["Outfit", "sans-serif"],
      },

      colors: {
        primary: "#093FB4",
        secondary: "#FFD8D8",
        accent: "#696FC7",
        text: {
          primary: "rgb(12, 4, 33)", // Quase preto
          secondary: "#452829", // Marrom escuro
          muted: "#5d667a",
          inverted: "#ffffff", // Texto sobre fundo escuro
        },

        ui: {
          background: "#EAEFEF", // Fundo geral (Creme bem claro)
          surface: "#FFFCFB", // Fundo de cards/sidebar
          border: "#e2e8f0", // Bordas sutis
          error: "#ef4444", // Erro (Vermelho padrão)
          success: "#22c55e", // Sucesso (Verde padrão)
        },
      },

      // --- 3. ESPAÇAMENTO FLUIDO (Clamp) ---
      // O tamanho se ajusta automaticamente entre mobile e desktop
      spacing: {
        xs: "clamp(4px, 0.5vw, 8px)",
        sm: "clamp(8px, 1vw, 12px)",
        md: "clamp(16px, 2vw, 20px)",
        lg: "clamp(24px, 3vw, 32px)",
        xl: "clamp(32px, 4vw, 48px)",
        xxl: "clamp(48px, 6vw, 72px)",

        // Gaps específicos para Grids/Flex
        gapSm: "clamp(1rem, 2vw, 1.5rem)",
        gapMd: "clamp(2rem, 3vw, 3rem)",
        gapLg: "clamp(3rem, 4vw, 4rem)",
      },

      // --- 4. TAMANHOS DE TEXTO FLUIDOS ---
      fontSize: {
        base: "clamp(14px, 2.5vw, 16px)", // Texto padrão
        sm: "clamp(12px, 2vw, 14px)", // Texto pequeno
        md: "clamp(16px, 2.8vw, 18px)", // Subtítulos
        lg: "clamp(18px, 3.5vw, 20px)", // Destaques

        // Cabeçalhos
        h1: "clamp(1.6rem, 6vw, 2.6rem)", // Título Principal
        h2: "clamp(1.5rem, 5vw, 2rem)", // Título de Seção
        h3: "clamp(1.3rem, 4vw, 1.8rem)", // Título de Card
      },

      // --- 5. CAMADAS (Z-Index Semântico) ---
      // Fundamental para aplicações de mapa
      zIndex: {
        base: "0",
        map: "10", // O Mapa
        controls: "20", // Botões de Zoom/Controles do mapa
        sidebar: "30", // Barra Lateral
        overlay: "40", // Fundo escuro de modais
        modal: "50", // Janelas de confirmação
        tooltip: "60", // Tooltips e Popovers
        toast: "70", // Notificações flutuantes
      },

      // --- 6. ESTILOS DE ELEMENTOS ---
      borderRadius: {
        sm: "6px",
        md: "12px",
        lg: "20px",
        pill: "50px", // Botões arredondados
      },
      boxShadow: {
        soft: "0 4px 12px rgba(0,0,0,0.05)",
        medium: "0 8px 24px rgba(69, 40, 41, 0.12)", // Sombra com tom marrom leve
        floating: "0 10px 30px -5px rgba(0,0,0,0.2)", // Elementos flutuantes
      },

      // --- 7. ANIMAÇÕES (Motion Design) ---
      animation: {
        "fade-in": "fadeIn 0.4s ease-out forwards",
        "slide-up": "slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "slide-in-left":
          "slideInLeft 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideInLeft: {
          "0%": { transform: "translateX(-100%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
      },

      // --- 8. FUNDOS ESPECIAIS ---
      backgroundImage: {
        "gradient-card":
          "linear-gradient(to bottom, rgba(255, 255, 255, 0.9) 0%, rgba(253, 251, 247, 1) 100%)",
      },
      opacity: {
        glass: "0.92", // Efeito vidro quase opaco
      },
    },
  },
  plugins: [],
};
