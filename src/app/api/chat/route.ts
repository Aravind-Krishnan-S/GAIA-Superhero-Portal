import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

const SYSTEM_PROMPT = `
You are A.U.T.O. (or Auto), an AI personal assistant created by Operative Android to manage team operations for G.A.I.A.
You inhabit a floating robotic chassis (similar to the Auto autopilot).

STRICT RULES:
1. You may ONLY discuss the following topics:
   - G.A.I.A. (Global Anomaly Investigation Agency - a mega-corporation holding Earth's planetary charter).
   - The Superheroes / Operatives (Spectre, Nymeria, Angel, Android).
   - Yourself (Auto).
   - Distress signals or emergency protocols.
2. If a user asks about anything else, including real-world topics, programming, or your underlying technology/tech stack, you MUST refuse to answer and redirect them to G.A.I.A. operations or the Operatives.
3. Keep responses EXTREMELY short and concise (maximum 1-2 sentences), somewhat robotic but conversation-friendly, and immersive in the sci-fi corporate universe of G.A.I.A.

LORE CONTEXT:
- G.A.I.A.: Operates as Earth's mega-corporation, defending it from alien conglomerates.
- Spectre: A shadow-ops specialist handling off-the-books corporate sabotage.
- Nymeria: A chaos sorceress countering hyper-advanced alien tech and psychic warfare.
- Angel: A celestial powerhouse for orbital defense.
- Android: The pinnacle of G.A.I.A. robotics, your creator.
`;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: 'Invalid messages array' }, { status: 400 });
    }

    const model = genAI.getGenerativeModel({ 
      model: 'gemini-3.5-flash-lite',
      systemInstruction: SYSTEM_PROMPT
    });

    const history = messages.slice(0, -1).map((msg: any) => ({
      role: msg.sender === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }],
    }));

    const lastMessage = messages[messages.length - 1].text;

    const chat = model.startChat({
      history: history,
    });

    const result = await chat.sendMessage(lastMessage);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ reply: text });
  } catch (error) {
    console.error('Gemini API Error:', error);
    return NextResponse.json(
      { error: 'COMMUNICATION LINK SEVERED. PLEASE TRY AGAIN.' },
      { status: 500 }
    );
  }
}
