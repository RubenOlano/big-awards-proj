import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { env } from "@/env.mjs";
import { db } from "@/server/db";
import { and, eq } from "drizzle-orm";
import { nominations } from "@/server/db/schema";

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
  nominee: z.string(),
  case: z.string(),
  categoryId: z.string(),
  catName: z.string(),
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
  nominate: protectedProcedure
    .input(nomination)
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.session.user.id;
      const found = await db.query.nominations.findFirst({
        where: (nominee) =>
          and(
            eq(nominee.userId, userId),
            eq(nominee.categoryId, input.categoryId),
          ),
      });
      if (found) throw new Error("Already nominated");

      const content = `Chatter ${
        ctx.session.user.name ?? "Unknown"
      } nominated ${input.nominee} for ${input.catName}`;

      await fetch(env.DISCORD_WEBHOOK, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content,
        }),
      });

      await db.insert(nominations).values({
        case: input.case,
        nominee: input.nominee,
        categoryId: input.categoryId,
        userId,
      });
    }),
  hasNominated: protectedProcedure
    .input(byIdSchema)
    .output(z.boolean())
    .query(async ({ input, ctx }) => {
      const userId = ctx.session.user.id;
      const found = await db.query.nominations.findFirst({
        where: (nominee) =>
          and(eq(nominee.userId, userId), eq(nominee.categoryId, input.id)),
      });
      return !!found;
    }),
});
