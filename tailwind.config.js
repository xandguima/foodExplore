
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        Dark100:'#000405',
        Dark200:'#00070A',
        Dark300:'#000204',
        Dark400:'#000A0F',
        Dark500:'#000C12',
        Dark600:'#00111A',
        Dark700:'#001119',
        Dark800:'#0D161B',
        Dark900: '#0D1D25',
        Dark1000:'#192227',
       
        Light300:'#E1E1E6',
        Light400:'#C4c4cc',
        Light500:'#7C7C8A',
        Light600:'#76797B',
        Light700:'#4D585E',

        Tomato100:'#750310',
        Tomato200:'#92000E',
        Tomato300:'#AB222E',

        Cake200:'#82F3FF',

        LightGradient:'#091E26',
        DarkGradient: '#00131C',
       
      },
      screens: {
        'xs': '450px',
        // => @media (min-width: 400px) { ... }
        'sm': '640px',
        // => @media (min-width: 640px) { ... }
  
        'md': '768px',
        // => @media (min-width: 768px) { ... }
  
        'lg': '1024px',
        // => @media (min-width: 1024px) { ... }
  
        'xl': '1280px',
        // => @media (min-width: 1280px) { ... }
  
        '2xl': '1536px',
        // => @media (min-width: 1536px) { ... }
        
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
      }
    
    },
  },
  plugins: [],
}

