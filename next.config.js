/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: 'http://localhost:8000/:path*',
      },
    ];
  },
  env: {
    REACT_APP_FIREBASE_API_KEY: 'AIzaSyAwpshWj7j892AJxrLMUuHY0ouiOm1t-Eo',
    REACT_APP_FIREBASE_AUTH_DOMAIN: 'unichat-7b228.firebaseapp.com',
    REACT_APP_FIREBASE_PROJECT_ID: 'unichat-7b228',
    REACT_APP_FIREBASE_STORAGE_BUCKET: 'unichat-7b228.appspot.com',
    REACT_APP_FIREBASE_MESSAGING_SENDER_ID: '929644114950',
    REACT_APP_FIREBASE_APP_ID: '1:929644114950:web:d8ed87deda14a44b607f87',
  },
};
