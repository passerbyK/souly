import Calendar from "./_compoments/Calendar";
import Diary from "./_compoments/Diary";

function PersonalPage() {
  return (
    <>
      <div className="relative flex h-full w-full bg-body">
        <div className="flex w-3/4 flex-wrap overflow-y-auto px-8 py-6">
          <Diary />
          <Diary />
          <Diary />
          <Diary />
          <Diary />
        </div>
        <div className="mx-6 my-6 w-1/4 flex-col rounded-2xl bg-header py-2 pt-4 text-xl font-bold text-[#998D73]">
          <div className="flex h-[8%] items-center justify-center rounded-2xl">
            2023/12/6 (Wed.)
          </div>
          <div className="m-4 flex h-[12%] items-center justify-center rounded-2xl bg-[#D8D2C7]">
            Complete: 3/21 days
          </div>
          <div className="mx-4 flex h-[70%] justify-center rounded-2xl bg-[#B7AD97] p-1 text-base text-[black]">
            <Calendar />
          </div>
        </div>
      </div>
    </>
  );
}

export default PersonalPage;
