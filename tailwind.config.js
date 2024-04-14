const AWS_S3_URL = "https://summoner-gg.s3.us-east-2.amazonaws.com";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'summoners-rift': `url(${AWS_S3_URL}/general/summoners-rift.webp)`,
        'summoners-rift-mobile': `url(${AWS_S3_URL}/general/summoners-rift-mobile.webp)`,
        'ionia': `url(${AWS_S3_URL}/general/ionia.jpg)`,
      }
    },
    screens: {
      'mobile': '300px',
      'laptop': '800px',
      'desktop': '1200px'
    }
  },
  plugins: [],
}