import { api } from "@/trpc/server";
import CategorySection from "./CategorySection";

export default async function NominationsCard() {
  const categories = await api.categories.getGroups.query();
  return (
    <div className="h-full w-5/6 space-y-5 rounded-3xl bg-[#0E212E] p-4 shadow-lg md:space-y-8 md:p-6 lg:p-8">
      <h1 className="text-center text-3xl font-bold text-white md:text-4xl lg:text-5xl">
        Nominations
      </h1>
      <div className="scrollbar-thin scrollbar-thumb-blue-500/70 scrollbar-track-blue-300/30 h-5/6 overflow-y-auto">
        {categories.map((cat) => (
          <CategorySection category={cat} key={cat.id} />
        ))}
      </div>
    </div>
  );
}
