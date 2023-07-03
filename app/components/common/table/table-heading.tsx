import dynamic from "next/dynamic";
import React from 'react'

import { VerticalMenu } from "@/app/components/common/vertical-menu";
import { ColumnMenu } from "@/app/components/common/column-menu";

import { useTableContext } from "@/app/context/table-context";

import { TableHeadingProps } from "@/types/table-heading";

export function tableHeading({header, item}: TableHeadingProps) {

  const { 
    isHeaderMenuToggled,
    isHeaderMenuIconVisible,
    headerItemSelected,
    handleHeaderItemSelect,
    handleHeaderMouseLeave,
    isRowColumnMenuToggled,
    handleColumnTypeSelection
  } = useTableContext()

  const handleTableHeadingOnMouseHover = () => {
    if(isRowColumnMenuToggled) return
    handleHeaderItemSelect(item?.index)
  }

  return(
    <th
      className='relative p-1 min-w-[100px] w-auto border-r border-slate-300 last:border-r-0 text-xs text-center font-semibold text-slate-700' 
      onMouseOver={() => handleColumnTypeSelection(0)}
    >
      {header}
      {/* <div 
        className={"absolute top-0.5 right-0 px-3 py-3.5 bg-transparent"}
        onMouseOver={handleTableHeadingOnMouseHover}
        onMouseLeave={() => handleHeaderMouseLeave()}
      >
        {(() => {
          if(item?.hasCellIcon && item?.index === headerItemSelected && isHeaderMenuIconVisible){
            return(
              <div className='absolute top-1 right-1 font-normal text-slate-70'>
                <VerticalMenu
                  type={1}
                >
                  {(() => {
                    if(isHeaderMenuToggled){
                      return <ColumnMenu 
                                isColumnConvertable={false}
                                hasMoveColumnMenu={true}
                                hasSortMenu={true}
                                hasRowMenu={item?.hasRowMenu} 
                                hasColumnMenu={item?.hasColumnMenu}
                                colIndex={item?.index} 
                                row={0} 
                                totalRows={0} 
                              />
                    }
                  })()}
                </VerticalMenu>
              </div>
            )
          }
        })()}
      </div> */}
    </th>
  )
}

export const TableHeading = React.memo(tableHeading)