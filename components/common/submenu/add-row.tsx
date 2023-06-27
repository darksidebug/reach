import { useTableContext } from "@/context/table-context"
import { rowData } from '@/utils/template/column-data';

export default function addRowMenus() {
  const { columnItemSelected, tableRowSelected } = useTableContext()

  const getXPosition = () => {
    return (columnItemSelected + 1) >= (rowData[0]?.columnData?.length - 3)
  }

  const getYPosition = () => {
    return tableRowSelected >= (rowData?.length - 6)
  }
  return(
    <div className={"absolute "+ (getYPosition() ? ((tableRowSelected + 1) === rowData?.length ? "-top-[115px]" : "-top-[80px]") : "-top-[38px]") +" "+ (getXPosition() ? "-left-[210px]" : '-right-[210px]') +" min-w-[180px] w-auto bg-white border border-slate-300 shadow-md rounded text-slate-600 after:content-[''] after:absolute "+ (getYPosition() ? ((tableRowSelected + 1) === rowData?.length ? "after:bottom-[33px]" : "after:top-[88px]") : "after:top-[45px]") +" "+ (getXPosition() ? "after:-right-[7.5px] after:-rotate-[135deg]" : "after:-left-[7.5px] after:rotate-45") +" after:h-[15px] after:w-[15px] after:bg-white after:border-l after:border-b after:border-slate-300  after:rounded-[1px]"}> 
      <div className='pl-[22px] pt-4 pb-5 pr-6 space-y-[14px] text-slate-800'>
        <span className="font-semibold">Row options:</span>
        <div className='block relative ml-3 pl-4 after:absolute after:w-[9px] after:h-[1.5px] after:bg-slate-700 after:-left-[1px] after:top-[1px] after:rounded-sm cursor-pointer hover:font-semibold'>
          <svg className='absolute bottom-[3px] left-0 h-2.5' xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path fill='currentColor' d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z"/></svg>
          <span className='ml-2'>at the beginning</span>
        </div>
        <div className='block relative ml-3 pl-4 cursor-pointer hover:font-semibold'>
          <svg className='absolute top-[3px] left-0 h-2.5' xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path fill='currentColor' d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z"/></svg>
          <span className='ml-2'>before</span>
        </div>
        <div className='block relative ml-3 pl-4 cursor-pointer hover:font-semibold'>
          <svg className='absolute top-[3px] left-0 h-2.5' xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path fill='currentColor' d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"/></svg>
          <span className='ml-2'>after</span>
        </div>
        <div className='block relative ml-3 pl-4 after:absolute after:w-[9px] after:h-[1px] after:bg-slate-700 after:-left-[1px] after:bottom-[3px] after:rounded-sm cursor-pointer hover:font-semibold'>
          <svg className='absolute top-[1px] left-0 h-2.5' xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path fill='currentColor' d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"/></svg>
          <span className='ml-2'>at the end</span>
        </div>
      </div>
    </div>
  )
}