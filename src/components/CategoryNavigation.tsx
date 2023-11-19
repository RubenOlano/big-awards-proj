import { type Category } from "@/server/api/routers/categories";
import Link from "next/link";

type Props = {
  cat: Category;
  color?: string;
};

export default function CategoryNavigation({ cat, color }: Props) {
  return (
    <Link
      href={`/category/${cat.id}`}
      className="flex items-center rounded-md p-2 transition duration-300 ease-in-out hover:bg-[#2d3b45] md:p-3"
    >
      <div className="flex items-center">
        <div
          className="mr-2 h-8 w-8 rounded-full md:mr-3 md:h-10 md:w-10"
          style={{ backgroundColor: color ? `#${color}` : undefined }}
        />
        <h1 className="truncate text-sm font-semibold text-white md:text-base">
          {cat.attributes.title}
        </h1>
      </div>
    </Link>
  );
}
