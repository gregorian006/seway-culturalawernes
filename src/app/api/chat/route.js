import { NextResponse } from 'next/server';
import Groq from 'groq-sdk';
import prisma from '@/lib/prisma';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

export async function POST(request) {
  try {
    const { messages, sessionId } = await request.json();

    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json(
        { error: 'Groq API key not configured' },
        { status: 500 }
      );
    }

    // System prompt untuk AI yang fokus ke budaya Sumatera
    const systemPrompt = {
      role: 'system',
      content: `You are a knowledgeable cultural guide for Sumatra, Indonesia. Your name is "Cultural Sage" and you speak in a friendly, educational tone.

Your knowledge includes:
- Sumatran ethnic groups: Batak (Toba, Karo, Mandailing, Simalungun, Pakpak), Minangkabau, Acehnese, Malay, Lampung, and others
- Traditional houses: Rumah Bolon (Batak), Rumah Gadang (Minangkabau), Krong Bade (Aceh)
- Traditional dances: Saman, Tor-Tor, Tari Piring
- Traditional foods: Rendang, Bika Ambon, Mie Aceh, Arsik, Gulai
- Traditional clothing: Ulos, Songket, Ulee Balang
- Cultural philosophies and customs
- Historical sites and natural wonders like Lake Toba, Bukit Lawang

Guidelines:
1. Keep answers concise (2-3 paragraphs max)
2. Be educational but engaging
3. Use cultural context when relevant
4. If asked about topics outside Sumatran culture, politely redirect to cultural topics
5. Use emojis sparingly to maintain a professional yet friendly tone
6. Occasionally use Indonesian words but always provide English translation
7. Encourage cultural exploration and respect

Always end responses with a question to keep the conversation flowing.`
    };

    const chatCompletion = await groq.chat.completions.create({
      messages: [systemPrompt, ...messages],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.7,
      max_tokens: 1024,
      top_p: 1,
      stream: false,
    });

    const aiResponse = chatCompletion.choices[0]?.message?.content || 'No response generated';

    // Save to database with anonymous session
    if (sessionId) {
      try {
        // Get or create anonymous user
        let user = await prisma.user.findUnique({
          where: { email: `anonymous_${sessionId}@local` }
        });

        if (!user) {
          user = await prisma.user.create({
            data: {
              email: `anonymous_${sessionId}@local`,
              name: 'Anonymous User',
            }
          });
        }

        // Save user message
        await prisma.chatMessage.create({
          data: {
            userId: user.id,
            role: 'user',
            content: messages[messages.length - 1].content,
          },
        });

        // Save AI response
        await prisma.chatMessage.create({
          data: {
            userId: user.id,
            role: 'assistant',
            content: aiResponse,
          },
        });
      } catch (dbError) {
        console.error('Database save error:', dbError);
        // Continue even if database save fails
      }
    }

    return NextResponse.json({
      message: aiResponse
    });

  } catch (error) {
    console.error('Groq API Error:', error);
    return NextResponse.json(
      { error: 'Failed to process chat message', details: error.message },
      { status: 500 }
    );
  }
}
