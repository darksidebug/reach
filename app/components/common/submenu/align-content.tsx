import { useTableContext } from "@/app/context/table-context"
import { rowData } from '@/utils/template/column-data';

export default function alignContentMenus() {
  const { 
    columnItemSelected, 
    tableRowSelected,
    headerItemSelected,
    columnTypeSelected 
  } = useTableContext()

  const getXPosition = () => {
    if(columnTypeSelected === 0) return (headerItemSelected + 1) >= (rowData[0]?.columnData?.length - 3)
    return (columnItemSelected + 1) >= (rowData[0]?.columnData?.length - 3)
  }

  const getYPosition = () => {
    return tableRowSelected >= (rowData?.length - 5)
  }
  return(
    <div className={"absolute "+ (getYPosition() ? ((tableRowSelected + 1) === rowData?.length ? "-top-[80px]" : "-top-[50px]") : "-top-[38px]") +" "+ (getXPosition() ? "-left-[209px]" : '-right-[209px]') +" min-w-[180px] w-auto bg-white border border-slate-300 shadow-md rounded text-slate-600 after:content-[''] after:absolute "+ (getYPosition() ? ((tableRowSelected + 1) === rowData?.length ? "after:bottom-[70px]" : "after:top-[58px]") : "after:top-[45px]") +" "+ (getXPosition() ? "after:-right-[7.5px] after:-rotate-[135deg]" : "after:-left-[7.5px] after:rotate-45") +" after:h-[15px] after:w-[15px] after:bg-white after:border-l after:border-b after:border-slate-300  after:rounded-[1px]"}> 
      <div className='pl-[22px] pt-4 pb-5 pr-6 space-y-[14px] text-slate-800'>
        <span className="font-semibold">Align options:</span>
        <div className='block relative ml-3 pl-4 cursor-pointer hover:font-semibold'>
          <svg className='absolute bottom-[3px] left-[2px] h-2.5' xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path fill='currentColor' d="M288 64c0 17.7-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32H256c17.7 0 32 14.3 32 32zm0 256c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H256c17.7 0 32 14.3 32 32zM0 192c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 448c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"/></svg>
          <span className='ml-2'>Text align left</span>
        </div>
        <div className='block relative ml-3 pl-4 cursor-pointer hover:font-semibold'>
          <svg className='absolute top-[3px] left-0 h-2.5' xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path fill='currentColor' d="M448 64c0-17.7-14.3-32-32-32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32zm0 256c0-17.7-14.3-32-32-32H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H416c17.7 0 32-14.3 32-32zM0 192c0 17.7 14.3 32 32 32H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H32c-17.7 0-32 14.3-32 32zM448 448c0-17.7-14.3-32-32-32H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H416c17.7 0 32-14.3 32-32z"/></svg>
          <span className='ml-2'>Text align evenly</span>
        </div>
        <div className='block relative ml-3 pl-4 cursor-pointer hover:font-semibold'>
          <svg className='absolute top-[3px] left-0 h-2.5' xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path fill='currentColor' d="M352 64c0-17.7-14.3-32-32-32H128c-17.7 0-32 14.3-32 32s14.3 32 32 32H320c17.7 0 32-14.3 32-32zm96 128c0-17.7-14.3-32-32-32H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H416c17.7 0 32-14.3 32-32zM0 448c0 17.7 14.3 32 32 32H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H32c-17.7 0-32 14.3-32 32zM352 320c0-17.7-14.3-32-32-32H128c-17.7 0-32 14.3-32 32s14.3 32 32 32H320c17.7 0 32-14.3 32-32z"/></svg>
          <span className='ml-2'>Text align center</span>
        </div>
        <div className='block relative ml-3 pl-4 cursor-pointer hover:font-semibold'>
          <svg className='absolute bottom-[3px] left-[2px] h-2.5' xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path fill='currentColor' d="M448 64c0 17.7-14.3 32-32 32H192c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32zm0 256c0 17.7-14.3 32-32 32H192c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32zM0 192c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 448c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"/></svg>
          <span className='ml-2'>Text align left</span>
        </div>
      </div>
    </div>
  )
}