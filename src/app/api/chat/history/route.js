import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('sessionId');

    if (!sessionId) {
      return NextResponse.json({ messages: [] });
    }

    // Find anonymous user by session
    const user = await prisma.user.findUnique({
      where: { email: `anonymous_${sessionId}@local` }
    });

    if (!user) {
      return NextResponse.json({ messages: [] });
    }

    // Fetch user's chat history from database
    const chatHistory = await prisma.chatMessage.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        createdAt: 'asc',
      },
      select: {
        id: true,
        role: true,
        content: true,
        createdAt: true,
      },
    });

    // Convert to format expected by the chatbot component
    const messages = chatHistory.map(msg => ({
      role: msg.role,
      content: msg.content,
    }));

    return NextResponse.json({ messages });

  } catch (error) {
    console.error('Error fetching chat history:', error);
    return NextResponse.json(
      { messages: [] },
      { status: 200 }
    );
  }
}
