import { NextRequest, NextResponse } from 'next/server';
import { getAdminDB } from '@/lib/instant-admin';
import { id } from '@instantdb/admin';

type NewsPayload = {
  title: string;
  summary: string;
  content: string;
  date: string;
  sourceUrl: string;
  imageUrl?: string;
  category: string;
  tags?: string[];
};

// Validate a single news item
function validateNewsItem(data: unknown, index?: number): { valid: boolean; error?: string } {
  const prefix = index !== undefined ? `Item ${index + 1}: ` : '';
  
  if (!data || typeof data !== 'object') {
    return { valid: false, error: `${prefix}Invalid payload: expected an object` };
  }

  const payload = data as Record<string, unknown>;
  
  const requiredFields = ['title', 'summary', 'content', 'date', 'sourceUrl', 'category'];
  for (const field of requiredFields) {
    if (!payload[field] || typeof payload[field] !== 'string') {
      return { valid: false, error: `${prefix}Missing or invalid required field: ${field}` };
    }
  }

  // Validate date format (YYYY-MM-DD)
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(payload.date as string)) {
    return { valid: false, error: `${prefix}Invalid date format. Expected YYYY-MM-DD` };
  }

  // Validate tags if present
  if (payload.tags !== undefined) {
    if (!Array.isArray(payload.tags)) {
      return { valid: false, error: `${prefix}Tags must be an array` };
    }
    for (const tag of payload.tags) {
      if (typeof tag !== 'string') {
        return { valid: false, error: `${prefix}All tags must be strings` };
      }
    }
  }

  // Validate imageUrl if present (must be a valid URL or empty)
  if (payload.imageUrl !== undefined && payload.imageUrl !== null && payload.imageUrl !== '') {
    if (typeof payload.imageUrl !== 'string') {
      return { valid: false, error: `${prefix}imageUrl must be a string` };
    }
    // Check if it's a valid URL (starts with http:// or https://)
    const imageUrl = payload.imageUrl as string;
    if (!imageUrl.startsWith('http://') && !imageUrl.startsWith('https://')) {
      // Not a valid URL - we'll just ignore it (set to empty string later)
    }
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

    // Check if body is an array or single object
    const isArray = Array.isArray(body);
    const items: unknown[] = isArray ? body : [body];

    if (items.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Empty array provided' },
        { status: 400 }
      );
    }

    // Validate all items first
    for (let i = 0; i < items.length; i++) {
      const validation = validateNewsItem(items[i], isArray ? i : undefined);
      if (!validation.valid) {
        return NextResponse.json(
          { success: false, error: validation.error },
          { status: 400 }
        );
      }
    }

    // Get the admin database instance
    const adminDB = getAdminDB();

    // Create records for all items
    const createdIds: string[] = [];
    const transactions: ReturnType<typeof adminDB.tx.aiNews[string]['update']>[] = [];

    for (const item of items) {
      const payload = item as NewsPayload;
      const recordId = id();
      
      // Only keep imageUrl if it's a valid URL
      let imageUrl = '';
      if (payload.imageUrl && 
          (payload.imageUrl.startsWith('http://') || payload.imageUrl.startsWith('https://'))) {
        imageUrl = payload.imageUrl;
      }

      const aiNewsRecord = {
        id: recordId,
        title: payload.title,
        summary: payload.summary,
        content: payload.content,
        date: payload.date,
        sourceUrl: payload.sourceUrl,
        imageUrl: imageUrl,
        category: payload.category,
        tags: payload.tags || [],
        createdAt: Date.now(),
      };

      transactions.push(adminDB.tx.aiNews[recordId].update(aiNewsRecord));
      createdIds.push(recordId);
    }

    // Execute all transactions at once
    await adminDB.transact(...transactions);

    // Return response based on whether it was array or single item
    if (isArray) {
      return NextResponse.json(
        { 
          success: true, 
          message: `Successfully created ${createdIds.length} news items`,
          ids: createdIds 
        },
        { status: 201 }
      );
    } else {
      return NextResponse.json(
        { success: true, id: createdIds[0] },
        { status: 201 }
      );
    }
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
