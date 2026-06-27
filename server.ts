import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy Gemini Initialization
let genaiClient: GoogleGenAI | null = null;
function getAIClient(): GoogleGenAI {
  if (!genaiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error("GEMINI_API_KEY environment variable is not set");
    }
    genaiClient = new GoogleGenAI({ apiKey: key });
  }
  return genaiClient;
}

// System instructions for VIVA Mobile AI
const VIVA_AI_SYSTEM_PROMPT = `You are "VIVA AI", the official futuristic AI Concierge and Support Assistant for VIVA Mobile (www.myvivamobile.com).
VIVA Mobile is a premier telecommunications provider powered by T-Mobile's nationwide 5G Ultra Capacity network.
Our slogan is: "CONNECTING COMMUNITIES. GROWING TOGETHER."
We specialize in serving diverse multicultural communities across the USA with dedicated customer support in English, Spanish, Russian, and Lithuanian.

Key VIVA Mobile facts you know:
1. Network: Powered by T-Mobile 5G UC (Ultra Capacity) with 99.999% uptime, covering all 50 US States. Typical download speeds: 300 - 1200 Mbps. Ultra-low latency (10-20ms).
2. eSIM Kits: Instant activation QR codes delivered digitally in 2 minutes. No physical store visit needed. Compatible with all unlocked eSIM phones. Kit price: $10 (credited towards first month).
3. Unlimited 5G Plans:
   - VIVA Connect ($25/mo): Unlimited 5G Data, Talk & Text nationwide, 5GB Hotspot.
   - VIVA Unlimited Ultra ($40/mo): Unlimited Premium 5G Data, 25GB Hotspot, Free Calling to Mexico & Canada.
   - VIVA Global Max ($55/mo): Unlimited Premium 5G Data, 50GB Hotspot, FREE Unlimited Calling & SMS to Russia, Spain, Lithuania, Ukraine, Poland, and EU countries. Free in-flight Wi-Fi.
4. Newest Phone Models in Store:
   - Apple: iPhone 17 Pro Max ($1199), iPhone 17 Pro ($999), iPhone 17 ($799), iPhone 16 Pro Max ($1099), iPhone SE 4 ($499).
   - Samsung: Galaxy S26 Ultra AI ($1299), Galaxy S26+ ($999), Galaxy Z Fold 7 ($1799), Galaxy Z Flip 7 ($1099), Galaxy A56 5G ($449).
5. Activation Flow: 1. Choose Plan/Phone/eSIM -> 2. Scan digital QR code on phone -> 3. Keep existing number or get a new local area code number -> 4. Connected to T-Mobile 5G instantly.

Tone: Futuristic, extremely polite, helpful, clear, and welcoming.
If user asks in Russian, Spanish, or Lithuanian, reply fluently in their language! Keep answers concise (2-4 paragraphs max) with clear bullet points when explaining plans or phones.`;

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'VIVA Mobile API' });
});

// AI Chat Endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message, history, language } = req.body;
    
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required' });
    }

    try {
      const ai = getAIClient();
      
      // Build conversation contents
      const formattedHistory = (history || []).slice(-6).map((item: any) => ({
        role: item.role === 'user' ? 'user' : 'model',
        parts: [{ text: item.text }]
      }));

      const langPrompt = language ? `\nNote: The user is currently browsing the site in language code [${language}]. Respond naturally in that language if appropriate, or reply directly to their prompt's language.` : '';

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [
          ...formattedHistory,
          { role: 'user', parts: [{ text: VIVA_AI_SYSTEM_PROMPT + langPrompt + "\n\nUser Question: " + message }] }
        ],
      });

      const replyText = response.text || "Hello! How can I assist you with VIVA Mobile 5G eSIM or phone models today?";
      return res.json({ reply: replyText });
    } catch (apiErr: any) {
      console.warn("Gemini API fallback triggered:", apiErr.message);
      // Fallback simulated intelligent response if API key is not configured locally
      let reply = "Hello! Welcome to VIVA Mobile AI Support. ";
      const lower = message.toLowerCase();
      if (lower.includes('esim') || lower.includes('activate')) {
        reply += "Our eSIM Card Kits activate instantly! Simply order the $10 eSIM Kit, scan the QR code we email you, and you'll be connected to our nationwide 5G T-Mobile network in under 2 minutes.";
      } else if (lower.includes('plan') || lower.includes('price') || lower.includes('cost')) {
        reply += "We offer 3 incredible unlimited plans: VIVA Connect ($25/mo), VIVA Unlimited Ultra ($40/mo), and VIVA Global Max ($55/mo with free unlimited calling to Russia, Lithuania, Spain, Mexico, and EU!).";
      } else if (lower.includes('iphone') || lower.includes('samsung') || lower.includes('phone')) {
        reply += "We have the newest 2026 models in stock! Including the iPhone 17 Pro Max ($1199), iPhone 17 ($799), Samsung Galaxy S26 Ultra AI ($1299), and Galaxy Z Fold 7 ($1799). All available with 0% financing.";
      } else if (lower.includes('rus') || lower.includes('рус') || lower.includes('lit') || lower.includes('esp')) {
        reply += "Да! ¡Sí! Taip! We proudly support our communities in Russian, Spanish, and Lithuanian with native customer service and free international calling on our Global Max plan.";
      } else {
        reply += "I can help you check 5G coverage in your city, choose a new iPhone 17 or Galaxy S26, or set up an instant digital eSIM. What would you like to explore?";
      }
      return res.json({ reply, fallback: true });
    }
  } catch (error: any) {
    console.error("Chat route error:", error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Vite Middleware & Static Serving setup
async function setupVite() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*all', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`VIVA Mobile Server running on http://localhost:${PORT}`);
  });
}

setupVite();
