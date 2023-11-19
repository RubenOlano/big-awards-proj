"use client";
import { type Category } from "@/server/api/routers/categories";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  cat: Category;
  disabled: boolean;
};

export default function NominationForm({ cat, disabled }: Props) {
  const [formData, setFormData] = useState({
    nominee: "",
    reasoning: "",
  });
  const router = useRouter();
  const { mutate } = api.categories.nominate.useMutation({
    onSuccess: () => router.refresh(),
  });

  return (
    <div
      className={`h-full max-w-lg space-y-8 rounded-3xl bg-[#0E212E] p-6 shadow-xl transition-opacity duration-500 md:mx-auto ${
        disabled ? "opacity-50" : "opacity-100"
      }`}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          mutate({
            case: formData.reasoning,
            categoryId: cat.id.toString(),
            nominee: formData.nominee,
            catName: cat.attributes.title,
          });
        }}
      >
        <div className="text-center text-white">
          <h1 className="mb-4 text-4xl font-extrabold md:text-5xl">
            {cat.attributes.title}
          </h1>
          <p className="text-lg font-medium md:text-2xl">
            {cat.attributes.description}
          </p>
        </div>
        <div className="flex flex-col space-y-6">
          <input
            className="rounded-xl bg-[#394A55] p-4 text-lg text-white placeholder-gray-400 focus:border-transparent focus:ring-2 focus:ring-blue-500"
            type="text"
            placeholder="Nominee"
            onChange={(e) =>
              setFormData({ ...formData, nominee: e.target.value })
            }
            required
            disabled={disabled}
          />
          <textarea
            className="rounded-xl bg-[#394A55] p-4 text-lg text-white placeholder-gray-400 focus:border-transparent focus:ring-2 focus:ring-blue-500"
            placeholder="Your reasoning..."
            onChange={(e) =>
              setFormData({ ...formData, reasoning: e.target.value })
            }
            required
            disabled={disabled}
          />
        </div>
        <button
          className="mt-5 w-full rounded-xl bg-blue-600 py-3 text-xl font-semibold text-white transition duration-300 ease-in-out hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-600"
          disabled={!formData.nominee || !formData.reasoning || disabled}
        >
          {disabled ? "Cannot Resubmit" : "Submit"}
        </button>
      </form>
    </div>
  );
}
