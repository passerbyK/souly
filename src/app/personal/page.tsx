import Diary from "./_compoments/Diary";
import Calendar from "./_compoments/Calendar";

function PersonalPage() {
  
    return (
      <>
      <div className="relative flex h-full w-full bg-body">
        <div className="flex flex-wrap w-3/4 py-2 pl-4 gap-3 overflow-y-auto">
          <Diary />
          <Diary />
          <Diary />
          <Diary />
        </div>
        <div className="flex-col w-1/4 mx-6 my-3 rounded-2xl bg-header pt-4 text-[#998D73] text-xl font-bold">
          <div className="flex items-center justify-center h-auto ">2023/12/6 (Wed.)</div>
          <div className="flex items-center justify-center h-1/6 m-4 rounded-2xl bg-[#D8D2C7]">Complete: 3/21 days</div>
          <div className=" h-2/3 m-4 rounded-2xl bg-[#B7AD97]">
            <div className="flex items-center justify-center text-black text-x2 font-bold pt-2">December</div>
            <div className="h-4/5 my-2 mx-4 bg-[#FFF1D4] rounded-2xl">
              <Calendar />
            </div>
          </div>
        </div>
      </div>
      </>
    );
  }
  
  export default PersonalPage;
  