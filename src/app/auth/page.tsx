import { getServerAuthSession } from "@/server/auth";
import Image from "next/image";
import { LoginButton, LogoutButton } from "./Buttons";

export default async function Login() {
  const session = await getServerAuthSession();
  return (
    <div className="flex flex-col justify-center rounded-3xl bg-[#0E212E] p-20 md:p-36">
      <div className="flex flex-col items-center justify-center">
        <Image
          src={session?.user?.image ?? "/ChatterImage.png"}
          width={140}
          height={140}
          alt={session?.user?.name ?? "Chatter"}
          className="rounded-full"
        />
        <h1 className="px-5 py-10 text-center text-3xl font-semibold text-white md:text-5xl">
          {session?.user?.name ?? "Chatter"}
        </h1>
      </div>
      <div className="flex flex-col items-center justify-center pt-10 md:pt-20">
        {session ? <LogoutButton /> : <LoginButton />}
      </div>
    </div>
  );
}
