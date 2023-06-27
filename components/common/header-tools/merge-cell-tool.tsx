export default function mergeCellTool() {
  return(
    <div className="ml-3 w-[37px] py-0.5 border-r-none border-slate-200">
      <button className="flex items-center justify-center h-5 w-6 border border-slate-300 bg-slate-100 rounded-sm cursor-pointer">
        <div className="opacity-[0.95]">
          <div className="flex">
            <div className="p-[1.5px] border-l-[1.5px] border-b-[1.5px] border-t-[1.5px] border-slate-700 rounded-tl-sm"></div>
            <div className="p-[1.5px] border-[1.5px] border-slate-700"></div>
            <div className="p-[1.5px] border-r-[1.5px] border-b-[1.5px] border-t-[1.5px] border-slate-700 rounded-tr-sm"></div>
          </div>
          <div className="p-[1.5px] border-l-[1.5px] border-r-[1.5px] border-slate-700"></div>
          <div className="flex">
            <div className="p-[1.5px] border-l-[1.5px] border-b-[1.5px] border-t-[1.5px] border-slate-700 rounded-bl-sm"></div>
            <div className="p-[1.5px] border-[1.5px] border-slate-700"></div>
            <div className="p-[1.5px] border-r-[1.5px] border-b-[1.5px] border-t-[1.5px] border-slate-700 rounded-br-sm"></div>
          </div>
        </div>
      </button>
    </div>
  )
}