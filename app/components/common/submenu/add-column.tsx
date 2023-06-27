import { useTableContext } from "@/app/context/table-context"
import { columnHeader } from "@/utils/template/column-header"

export default function addColumnMenus() {

  const { headerItemSelected } = useTableContext()

  const getXPosition = () => {
    return (headerItemSelected + 1) >= (columnHeader?.length - 3)
  }
  
  return(
    <div className={"absolute -top-[5px] "+ (getXPosition() ? "-left-[210px]" : '-right-[210px]') +" min-w-[180px] w-auto bg-white border border-slate-300 shadow-md rounded text-slate-600 after:content-[''] after:absolute after:top-[12px] "+ (getXPosition() ? "after:-right-[7.5px] after:-rotate-[135deg]" : "after:-left-[7.5px] after:rotate-45") +" after:h-[15px] after:w-[15px] after:bg-white after:border-l after:border-b after:border-slate-300  after:rounded-[1px]"}> 
      <div className='pl-[22px] pt-4 pb-5 pr-6 space-y-[14px] text-slate-800'>
        <span className="font-semibold">Column options:</span>
        <div className='block relative ml-3 pl-4 after:absolute after:w-[1.5px] after:h-2 after:bg-slate-700 after:-left-[1px] after:top-[4px] after:rounded-sm cursor-pointer hover:font-semibold'>
          <svg className='absolute bottom-[3px] left-[2px] h-2.5' xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path fill='currentColor' d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></svg>
          <span className='ml-2'>at the beginning</span>
        </div>
        <div className='block relative ml-3 pl-4 cursor-pointer hover:font-semibold'>
          <svg className='absolute top-[3px] left-0 h-2.5' xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path fill='currentColor' d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"/></svg>
          <span className='ml-2'>to the right</span>
        </div>
        <div className='block relative ml-3 pl-4 cursor-pointer hover:font-semibold'>
          <svg className='absolute top-[3px] left-0 h-2.5' xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path fill='currentColor' d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></svg>
          <span className='ml-2'>to the left</span>
        </div>
        <div className='block relative ml-3 pl-4 after:absolute after:w-[1.5px] after:h-2 after:bg-slate-700 after:left-[10px] after:top-[4.5px] after:rounded-sm cursor-pointer hover:font-semibold'>
          <svg className='absolute top-[3px] left-0 h-2.5' xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path fill='currentColor' d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"/></svg>
          <span className='ml-2'>at the end</span>
        </div>
      </div>
    </div>
  )
}