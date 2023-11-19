import { type Group } from "@/server/api/routers/categories";
import CategoryNavigation from "./CategoryNavigation";

type Props = {
  category: Group;
};

export default function CategorySection({ category }: Props) {
  return (
    <div className="m-3 flex flex-col rounded-3xl bg-[#394A55] p-3 shadow-md md:m-5 md:p-4">
      <h1 className="mb-3 text-2xl font-bold text-white md:mb-4 md:text-3xl">
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
