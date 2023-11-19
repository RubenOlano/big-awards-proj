import { api } from "@/trpc/server";
import CategorySection from "./CategorySection";

export default async function NominationsCard() {
  const categories = await api.categories.getGroups.query();
  return (
    <div className="h-full space-y-5 rounded-3xl bg-[#0E212E] p-6 shadow-lg md:space-y-8 md:p-5">
      <h1 className="text-center text-4xl font-bold text-white md:text-4xl">
        Nominations
      </h1>
      <div className="scrollbar-thin scrollbar-thumb-blue-500/70 scrollbar-track-blue-300/30 md:h-5/6 md:overflow-y-scroll">
        {categories.map((cat) => (
          <CategorySection category={cat} key={cat.id} />
        ))}
      </div>
    </div>
  );
}
