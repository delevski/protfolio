import { init, i } from '@instantdb/react';

// InstantDB App ID
export const APP_ID = 'f5649d62-563a-4ab4-a1fa-fa6d4947ff0e';

// Define the schema using InstantDB's schema definition
const schema = i.schema({
  entities: {
    aiNews: i.entity({
      title: i.string(),
      summary: i.string(),
      content: i.string(),
      date: i.string(),
      sourceUrl: i.string(),
      imageUrl: i.string().optional(),
      category: i.string(),
      tags: i.json<string[]>(),
      createdAt: i.number(),
    }),
  },
});

// Define the schema type for type safety
interface AINews {
  id: string;
  title: string;
  summary: string;
  content: string;
  date: string;
  sourceUrl: string;
  imageUrl?: string;
  category: string;
  tags: string[];
  createdAt: number;
}

// Client-side InstantDB instance (for React components)
export const db = init({ appId: APP_ID, schema });

export type { AINews };

