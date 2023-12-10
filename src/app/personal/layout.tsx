import Header from "./_compoments/Header";

type Props = {
  children: React.ReactNode;
};

function PersonalLayout({ children }: Props) {
  return (
    <main className="h-screen min-h-screen w-full">
      <div className="h-1/6 w-full">
        <Header />
      </div>
      <div className="h-5/6 w-full">{children}</div>
    </main>
  );
}

export default PersonalLayout;
