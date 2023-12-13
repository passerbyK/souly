import Calendar from "./_compoments/Calendar";
import Diary from "./_compoments/Diary";

function PersonalPage() {
  return (
    <>
      <div className="relative flex h-full w-full bg-body">
        <div className="flex w-3/4 flex-wrap gap-3 overflow-y-auto py-2 pl-4">
          <Diary />
          <Diary />
          <Diary />
          <Diary />
        </div>
        <div className="mx-6 my-3 w-1/4 flex-col rounded-2xl bg-header pt-4 text-xl font-bold text-[#998D73]">
          <div className="flex h-auto items-center justify-center ">
            2023/12/6 (Wed.)
          </div>
          <div className="m-4 flex h-1/6 items-center justify-center rounded-2xl bg-[#D8D2C7]">
            Complete: 3/21 days
          </div>
          <div className=" m-4 h-2/3 p-1 rounded-2xl bg-[#B7AD97] text-[black] text-base">
            <Calendar />
          </div>
        </div>
      </div>
    </>
  );
}

export default PersonalPage;
