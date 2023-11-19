"use client";
import { type Category } from "@/server/api/routers/categories";
import { api } from "@/trpc/server";
import { useState } from "react";

type Props = {
  cat: Category;
};
export default function NominationForm({ cat }: Props) {
  const [nominee, setNominee] = useState("");
  const [reasoning, setReasoning] = useState("");

  return (
    <div className="h-full w-1/2 space-y-5 rounded-3xl bg-[#0E212E] p-6 shadow-lg md:space-y-8 md:p-5">
      <div className="text-center text-white">
        <h1 className="p-2 text-4xl font-semibold">{cat.attributes.title}</h1>
        <p className="p-2 text-xl font-light">{cat.attributes.description}</p>
      </div>
      <div className="flex flex-col space-y-4">
        <input
          className="rounded-xl bg-[#394A55] p-2 text-white"
          type="text"
          placeholder="Nominee"
          onChange={(e) => setNominee(e.target.value)}
          required
        />
        <textarea
          className="rounded-xl bg-[#394A55] p-2 text-white"
          placeholder="Your case..."
          onChange={(e) => setReasoning(e.target.value)}
          required
        />
      </div>
    </div>
  );
}
