import FriendList from "./_components/FriendList";

type Props = {
  children: React.ReactNode;
};

function Social({ children }: Props) {
  return (
    // overflow-hidden for parent to hide scrollbar
    <main className="flex-rows fixed top-0 flex h-screen w-full overflow-hidden">
      {/* overflow-y-scroll for child to show scrollbar */}
      <nav className="flex w-1/5 flex-col overflow-y-scroll border-r" style={{ color: '#FFEFDC' }}>
        <FriendList />
      </nav>
      {/* overflow-y-scroll for child to show scrollbar */}
      <div className="w-4/5 overflow-y-scroll">{children}</div>
    </main>
  );
}

export default Social;
