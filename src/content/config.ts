import { defineCollection } from 'astro:content'

const postCollection = defineCollection({});

export const collections = {
  'posts': postCollection,
};