import { NextRequest, NextResponse } from 'next/server';
import { getAdminDB } from '@/lib/instant-admin';
import { id } from '@instantdb/admin';

// Validate the incoming payload
function validatePayload(data: unknown): { valid: boolean; error?: string } {
  if (!data || typeof data !== 'object') {
    return { valid: false, error: 'Invalid payload: expected an object' };
  }

  const payload = data as Record<string, unknown>;
  
  const requiredFields = ['title', 'summary', 'content', 'date', 'sourceUrl', 'category'];
  for (const field of requiredFields) {
    if (!payload[field] || typeof payload[field] !== 'string') {
      return { valid: false, error: `Missing or invalid required field: ${field}` };
    }
  }

  // Validate date format (YYYY-MM-DD)
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(payload.date as string)) {
    return { valid: false, error: 'Invalid date format. Expected YYYY-MM-DD' };
  }

  // Validate tags if present
  if (payload.tags !== undefined) {
    if (!Array.isArray(payload.tags)) {
      return { valid: false, error: 'Tags must be an array' };
    }
    for (const tag of payload.tags) {
      if (typeof tag !== 'string') {
        return { valid: false, error: 'All tags must be strings' };
      }
    }
  }

  // Validate imageUrl if present
  if (payload.imageUrl !== undefined && typeof payload.imageUrl !== 'string') {
    return { valid: false, error: 'imageUrl must be a string' };
  }

  return { valid: true };
}

export async function POST(request: NextRequest) {
  try {
    // Check API key authentication
    const apiKey = request.headers.get('X-API-Key');
    const expectedApiKey = process.env.AI_NEWS_API_KEY;

    if (!expectedApiKey) {
      console.error('AI_NEWS_API_KEY environment variable is not set');
      return NextResponse.json(
        { success: false, error: 'Server configuration error' },
        { status: 500 }
      );
    }

    if (!apiKey || apiKey !== expectedApiKey) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized: Invalid or missing API key' },
        { status: 401 }
      );
    }

    // Parse the request body
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, error: 'Invalid JSON in request body' },
        { status: 400 }
      );
    }

    // Validate the payload
    const validation = validatePayload(body);
    if (!validation.valid) {
      return NextResponse.json(
        { success: false, error: validation.error },
        { status: 400 }
      );
    }

    const payload = body as {
      title: string;
      summary: string;
      content: string;
      date: string;
      sourceUrl: string;
      imageUrl?: string;
      category: string;
      tags?: string[];
    };

    // Get the admin database instance
    const adminDB = getAdminDB();

    // Generate a unique ID for the record
    const recordId = id();

    // Create the AI news record
    const aiNewsRecord = {
      id: recordId,
      title: payload.title,
      summary: payload.summary,
      content: payload.content,
      date: payload.date,
      sourceUrl: payload.sourceUrl,
      imageUrl: payload.imageUrl || '',
      category: payload.category,
      tags: payload.tags || [],
      createdAt: Date.now(),
    };

    // Insert the record into InstantDB
    await adminDB.transact(
      adminDB.tx.aiNews[recordId].update(aiNewsRecord)
    );

    return NextResponse.json(
      { success: true, id: recordId },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating AI news record:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Handle other HTTP methods
export async function GET() {
  return NextResponse.json(
    { success: false, error: 'Method not allowed. Use POST to create records.' },
    { status: 405 }
  );
}

