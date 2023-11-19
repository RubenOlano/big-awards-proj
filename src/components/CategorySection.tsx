import { type Group } from "@/server/api/routers/categories";
import CategoryNavigation from "./CategoryNavigation";

type Props = {
  category: Group;
};

export default function CategorySection({ category }: Props) {
  return (
    <div className="m-5 flex flex-col rounded-3xl bg-[#394A55] p-4 shadow-md">
      <h1 className="mb-4 text-3xl font-bold text-white">
        {category.attributes.title}
      </h1>
      <div className="space-y-2">
        {category.attributes.categories.data.map((cat) => (
          <CategoryNavigation
            cat={cat}
            key={cat.id}
            color={category.attributes.color}
          />
        ))}
      </div>
    </div>
  );
}
