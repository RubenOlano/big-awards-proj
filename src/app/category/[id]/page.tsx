import NominationForm from "@/components/NominationForm";
import NominationsCard from "@/components/NominationsCard";
import { api } from "@/trpc/server";

type Params = {
  params: { id: string };
};

export default async function Page({ params }: Params) {
  const category = await api.categories.getCatById.query({
    id: params.id,
  });
  const hasNominated = await api.categories.hasNominated.query({
    id: params.id,
  });
  return (
    <div className="mx-auto flex h-screen justify-center md:mx-20 md:h-5/6 md:space-x-20">
      <div
        className={`${!hasNominated ? "hidden" : "flex"} w-full justify-center`}
      >
        <NominationsCard />
      </div>
      <div
        className={`${
          hasNominated ? "hidden" : "flex"
        } h-5/6 w-full justify-center`}
      >
        <NominationForm cat={category} disabled={hasNominated} />
      </div>
    </div>
  );
}
