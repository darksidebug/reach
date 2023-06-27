

import { useTableContext } from "@/context/table-context"
import { rowData } from '@/utils/template/column-data';

export default function mergeCellMenus() {
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
    return tableRowSelected >= (rowData?.length - 6)
  }
  return(
    <div className={"absolute "+ (getYPosition() ? ((tableRowSelected + 1) === rowData?.length ? "-top-[108px]" : "-top-[50px]") : "-top-[25px]") +" "+ (getXPosition() ? "-left-[230px]" : '-right-[230px]') +" min-w-[180px] w-auto bg-white border border-slate-300 shadow-md rounded text-slate-600 after:content-[''] after:absolute "+ (getYPosition() ? ((tableRowSelected + 1) === rowData?.length ? "after:bottom-[93px]" : "after:top-[58px]") : "after:top-[32px]") +" "+ (getXPosition() ? "after:-right-[7.5px] after:-rotate-[135deg]" : "after:-left-[7.5px] after:rotate-45") +" after:h-[15px] after:w-[15px] after:bg-white after:border-l after:border-b after:border-slate-300  after:rounded-[1px]"}>              
      <div className='p-5 space-y-[14px] text-slate-800'>
        <span className="font-semibold">Merge options:</span>
        <div className='block relative pl-3 after:h-2 hover:font-semibold'>
          <div className="flex items-center gap-2">
            <input type="checkbox" name="" id="" />
            <span>to left by</span>
          </div>
        </div>
        <div className='block relative pl-3 hover:font-semibold'>
          <div className="flex items-center gap-2">
            <input type="checkbox" name="" id="" />
            <span>to right by</span>
          </div>
        </div>
        {
          (() => {
            if(headerItemSelected === -1){
              return(
                <>
                  <div className='block relative pl-3 hover:font-semibold'>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" name="" id="" />
                      <span>to top by</span>
                    </div>
                  </div>
                  <div className='block relative pl-3 hover:font-semibold'>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" name="" id="" />
                      <span>to bottom by</span>
                    </div>
                  </div>
                </>
              )
            }
          })()
        }
        <div className="flex items-center gap-2">
          <input className="py-2 px-2.5 w-[160px] bg-white border border-slate-400 focus:outline-2 focus:outline-sky-300 rounded" type="text" placeholder="Columns to merge eg: 1" />
        </div>
      </div>
    </div>
  )
}