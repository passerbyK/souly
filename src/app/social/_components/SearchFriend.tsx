import { RiSearchLine } from "react-icons/ri";

// import { redirect } from "next/navigation";
import { Input } from "@/components/ui/input";

// import { auth } from "@/lib/auth";
// import { revalidatePath } from "next/cache";
// import { publicEnv } from "@/lib/env/public";

// import { getChat } from "./actions";

// import AskCreateDialog from "./AskCreateDialog";

export default async function Search() {
  // const session = await auth();
  // if (!session || !session?.user?.id) {
  //   redirect(publicEnv.NEXT_PUBLIC_BASE_URL);
  // }
  // const userId = session.user.id;

  return (
    <div className="flex w-full pl-2 pt-2">
      <form
        action={async (e) => {
          "use server";
          const searchUser = e.get("searchUser");
          if (!searchUser) return;
          if (typeof searchUser !== "string") return;
          // const result = await getChat(userId, searchUser);
          // console.log(result);
          // if (!result) {
          // TODO:: open <AskCreateDialog /> --> create or not, open CreateDialog if yes, close and redirect if no!!!
          //  redirect(`${publicEnv.NEXT_PUBLIC_BASE_URL}/docs`);
          //}
          // console.log(result + "   2");
          /// redirect(`${publicEnv.NEXT_PUBLIC_BASE_URL}/docs/${result}`);
        }}
        className="flex flex-row gap-4"
      >
        <div className="w-5/6 text-lg">
          <Input placeholder="Who are you looking for?" name="searchUser" />
        </div>
        <button type="submit" className="pr-2">
          <RiSearchLine size={32} />
        </button>
      </form>
    </div>
  );
}
