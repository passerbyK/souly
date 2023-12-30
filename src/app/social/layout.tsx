import FriendList from "./_components/FriendList";

type Props = {
  children: React.ReactNode;
};

async function Social({ children }: Props) {
  return (
    // overflow-hidden for parent to hide scrollbar
    <main className="flex h-screen w-full flex-col justify-center overflow-y-auto md:overflow-hidden">
      {/* overflow-y-scroll for child to show scrollbar */}
      <div className="h-1/6 w-full"></div>
      <div className="flex-rows h-5/6 bg-brand_2 lg:flex">
        <nav className="h-[280px] min-w-min flex-col justify-start overflow-y-auto border-r bg-nav lg:my-0 lg:h-full lg:w-1/5">
          <FriendList />
        </nav>
        {/* overflow-y-scroll for child to show scrollbar */}
        <div className="w-full overflow-y-auto lg:mt-0">{children}</div>
      </div>
    </main>
  );
}

export default Social;
