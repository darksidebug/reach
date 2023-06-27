import dynamic from "next/dynamic";
import React from 'react'

import { VerticalMenu } from "@/components/common/vertical-menu";
import { ColumnMenu } from "@/components/common/column-menu";

import { useTableContext } from "@/context/table-context";

export function tableHeading(
  {header, item}: 
  {
    header: String, 
    item: {
      index: number,
      hasCellIcon: Boolean,
      hasRowMenu: Boolean,
      hasColumnMenu: Boolean
    }
  }
) {

  const { 
    isHeaderMenuToggled,
    isHeaderMenuIconVisible,
    headerItemSelected,
    handleHeaderItemSelect,
    handleHeaderMouseLeave,
    isRowColumnMenuToggled,
    handleColumnTypeSelection
  } = useTableContext()

  return(
    <th
      className='relative w-auto py-3 px-2 border-r border-slate-300 last:border-r-0 text-xs text-left font-semibold text-slate-700' 
      onMouseOver={() => handleColumnTypeSelection(0)}
    >
      {header}
      <div 
        className={"absolute top-0.5 right-0 px-3 py-3.5 bg-transparent"}
        onMouseOver={() => {
          if(isRowColumnMenuToggled) return
          handleHeaderItemSelect(item?.index)
        }}
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
      </div>
    </th>
  )
}

export const TableHeading = React.memo(tableHeading)