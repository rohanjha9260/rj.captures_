const fs = require('fs');
const dotenv = require('dotenv');

// Load environment variables from .env.local
const envConfig = dotenv.parse(fs.readFileSync('.env.local'));
const apiKey = envConfig.VITE_GROQ_API_KEY;

async function checkGroq() {
    try {
        const response = await fetch('https://api.groq.com/openai/v1/models', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${apiKey}`
            }
        });
        const data = await response.json();
        console.log("Models:", data.data.map(m => m.id));
        
        // Let's test the specific model
        const chatRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: 'openai/gpt-oss-120b',
                messages: [{role: 'user', content: 'hello'}]
            })
        });
        const chatData = await chatRes.json();
        console.log("Chat Response:", chatData);

    } catch (e) {
        console.error("Error:", e);
    }
}

checkGroq();
