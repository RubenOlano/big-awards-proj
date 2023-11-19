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
  return (
    <div className="mx-20 flex h-5/6 justify-between">
      <NominationsCard />
      <NominationForm cat={category} />
    </div>
  );
}
