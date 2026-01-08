import { init, i } from '@instantdb/admin';

// InstantDB App ID
const APP_ID = 'f5649d62-563a-4ab4-a1fa-fa6d4947ff0e';

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

// Server-side admin instance (for API routes)
export function getAdminDB() {
  const adminToken = process.env.INSTANTDB_ADMIN_TOKEN;
  if (!adminToken) {
    throw new Error('INSTANTDB_ADMIN_TOKEN environment variable is not set');
  }
  return init({
    appId: APP_ID,
    adminToken,
    schema,
  });
}

export { APP_ID };

