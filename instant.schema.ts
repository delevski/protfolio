import { i } from '@instantdb/core';

const _schema = i.schema({
  entities: {
    aiNews: i.entity({
      title: i.string(),
      summary: i.string(),
      content: i.string(),
      date: i.string(),
      sourceUrl: i.string(),
      imageUrl: i.string(),
      category: i.string(),
      tags: i.json<string[]>(),
      createdAt: i.number(),
    }),
  },
});

// This helps Typescript infer the schema type
type _AppSchema = typeof _schema;
interface AppSchema extends _AppSchema {}
const schema: AppSchema = _schema;

export type { AppSchema };
export default schema;

