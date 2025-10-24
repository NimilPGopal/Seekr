# Seekr 
An AI-powered search engine integrating Google Programmable Search and Gemini AI for context-aware web and image results.

## 🛠 Tech Stack
- Frontend: HTML5, CSS3, JavaScript (ES6)
- Backend: Node.js + Express
- APIs: Google Programmable Search, Gemini AI

## 🚀 Run Locally
1. Clone the repo  
2. Run `npm install`  
3. Create a `.env` file with your API keys
    In the format:
      GEMINI_API_KEY= your_AI_API_Key
      GOOGLE_API_KEY= your_SearchEngine_API_Key
      SEARCH_CX=your_custom_search_engine_id_here
      GOOGLE_API_KEY_IMAGE=your_google_search_api_key_here
      IMAGE_CX=your_image_search_engine_id_here
      //Server Config
      ALLOWED_ORIGIN=http://127.0.0.1:5500
      PORT=portid

5. Run `node server.js`
