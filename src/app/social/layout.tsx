import Header from "../personal/_compoments/Header";

import FriendList from "./_components/FriendList";

type Props = {
  children: React.ReactNode;
};

function Social({ children }: Props) {
  return (
    // overflow-hidden for parent to hide scrollbar
    <main className="fixed top-0 flex h-screen w-full flex-col overflow-hidden">
      {/* overflow-y-scroll for child to show scrollbar */}
      <div className="h-1/6 w-full">
        <Header />
      </div>
      <div className="flex-rows flex h-5/6">
        <nav
          className="flex w-1/5 flex-col overflow-y-scroll border-r"
          style={{ color: "#FFEFDC" }}
        >
          <FriendList />
        </nav>
        {/* overflow-y-scroll for child to show scrollbar */}
        <div className="w-4/5 overflow-y-scroll">{children}</div>
      </div>
    </main>
  );
}

export default Social;
