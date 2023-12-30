import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { publicEnv } from "@/lib/env/public";

type Props = {
  children: React.ReactNode;
};

async function Painting({ children }: Props) {
  const session = await auth();
  if (!session) {
    redirect(publicEnv.NEXT_PUBLIC_BASE_URL);
  }

  return (
    // overflow-hidden for parent to hide scrollbar
    <main className="flex h-screen w-full flex-col justify-center overflow-y-scroll md:overflow-hidden">
      {/* overflow-y-scroll for child to show scrollbar */}
      <div className="h-1/6 w-full"></div>
      <div className="flex-rows h-5/6 w-full bg-brand_2 md:flex">
        {/* overflow-y-scroll for child to show scrollbar */}
        <div className="md:mt-30 w-full overflow-y-auto lg:mt-0">
          {children}
        </div>
      </div>
    </main>
  );
}

export default Painting;
