import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId, useCdn } from "./env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn,
});

export async function fetchSanityData<T>(query: string, fallback: T, tags: string[] = []): Promise<T> {
  try {
    const data = await client.fetch<T>(query, {}, { next: { tags } });
    if (!data || (Array.isArray(data) && data.length === 0)) {
      return fallback;
    }
    return data;
  } catch (error) {
    console.warn("Sanity fetch warning (using fallback data):", error);
    return fallback;
  }
}
