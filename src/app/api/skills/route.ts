import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const skillsPath = path.join(process.cwd(), 'src', 'data', 'skills.json');
    const skillsData = JSON.parse(fs.readFileSync(skillsPath, 'utf8'));
    
    return NextResponse.json(skillsData);
  } catch (error) {
    console.error('Error reading skills data:', error);
    return NextResponse.json({ error: 'Failed to load skills data' }, { status: 500 });
  }
}
