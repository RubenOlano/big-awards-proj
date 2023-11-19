import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { env } from "@/env.mjs";

const categoryOutput = z.object({
  id: z.number(),
  attributes: z.object({
    title: z.string(),
    description: z.string().nullable(),
    type: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
    publishedAt: z.string(),
  }),
});

export type Category = z.infer<typeof categoryOutput>;

const groupOutput = z.object({
  id: z.number(),
  attributes: z.object({
    title: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
    publishedAt: z.string(),
    color: z.string(),
    categories: z.object({
      data: categoryOutput.array(),
    }),
  }),
});

export type Group = z.infer<typeof groupOutput>;

const byIdSchema = z.object({
  id: z.string(),
});

const nomination = z.object({
  id: z.string(),
});

export const catRouter = createTRPCRouter({
  getGroups: publicProcedure.output(groupOutput.array()).query(async () => {
    const res = await fetch(env.API_URL + "/api/category-groups?populate=*", {
      headers: {
        Authorization: "Bearer " + env.API_TOKEN,
      },
    });
    const { data } = (await res.json()) as unknown as { data: unknown };
    const parsed = groupOutput.array().parse(data);
    return parsed;
  }),
  getCatById: publicProcedure
    .input(byIdSchema)
    .output(categoryOutput)
    .query(async ({ input }) => {
      const res = await fetch(env.API_URL + "/api/categories/" + input.id, {
        headers: {
          Authorization: "Bearer " + env.API_TOKEN,
        },
      });
      const { data } = (await res.json()) as unknown as { data: unknown };
      const parsed = categoryOutput.parse(data);
      return parsed;
    }),
  // nominate: publicProcedure.input
});
