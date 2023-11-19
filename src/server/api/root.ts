import { createTRPCRouter } from "@/server/api/trpc";
import { catRouter } from "./routers/categories";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  categories: catRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
