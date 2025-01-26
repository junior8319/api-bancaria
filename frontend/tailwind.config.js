module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Garante que inclui todos os arquivos em src
    "./public/index.html",      // Inclui também o HTML
  ],
  theme: {
    extend: {
      colors: {
        'custom-background': '#102269',
        'custom-text': '#f5f5f5',
      },
    },
  },
  plugins: [],
};
