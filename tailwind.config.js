/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // AQUI É O SEGREDO DA ORGANIZAÇÃO
      colors: {
        brand: {
          primary: "#2563eb", // Azul Principal (Botões, Destaques)
          secondary: "#1e40af", // Azul Escuro (Hover, Textos fortes)
          background: "#f3f4f6", // Cinza clarinho (Fundo da tela)
          surface: "#ffffff", // Branco (Cards, Sidebar)
          text: "#1f2937", // Cinza escuro (Texto padrão)
          muted: "#9ca3af", // Cinza claro (Texto secundário)
        },
      },
      // Podemos criar tamanhos padrões também
      height: {
        header: "64px",
      },
    },
  },
  plugins: [],
};
