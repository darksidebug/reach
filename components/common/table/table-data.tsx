import React, { useEffect, useState } from "react";

import { VerticalMenu } from "@/components/common/vertical-menu";
import { ColumnMenu } from "@/components/common/column-menu";

import { useTableContext } from "@/context/table-context";

export function tableData(
  {text, item}: 
  {
    text: String, 
    item: {
      index: number,
      row: number,
      totalRows: number
      hasCellIcon: Boolean,
      hasRowMenu: Boolean,
      hasColumnMenu: Boolean
    }
  }
) {

  const [isFocused, setFocused] = useState(false)
  const [isHovered, setHovered] = useState(false)

  const {
    isRowColumnMenuToggled,
    columnItemSelected,
    handleRowColumnItemSelect,
    handleRowColumnMouseLeave,
    isRowColumnMenuIconVisible,
    handleRowColumnItemSelectOnMouseOver,
    tableRowSelected,
    handleHeaderItemSelect,
    isHeaderMenuToggled,
    handleColumnTypeSelection,
    handleRowColumnSelection,
    tableData
  } = useTableContext()


  return(
    <td
      id={"table" + item?.index }
      className={'relative min-w-[80px] w-auto p-[2px] border-r border-t border-slate-300 last:border-r-0 text-xs text-left text-slate-700'}
      onMouseOver={() => {
        setHovered(true),
        handleHeaderItemSelect(-1)
        handleColumnTypeSelection(1)
      }}
      onMouseLeave={() => {
        if(isRowColumnMenuToggled) return
        setHovered(false)
      }}
    >
      <div 
        id={'cell-' + item?.index}
        contentEditable={isFocused}
        className={'relative z-0 w-auto py-[7px] px-2 text-xs ' + (isFocused ? ' outline-2 outline-sky-300' : 'whitespace-pre-line')}
        onMouseDown={(e) => {
          if(isRowColumnMenuToggled) return
          setFocused(true)
          handleRowColumnItemSelectOnMouseOver()
          handleRowColumnSelection(item?.index, item?.row)
        }}
        onBlur={() => {
          setFocused(false)
          handleRowColumnSelection(-1, -1)
        }}
        onFocus={() => handleRowColumnSelection(item?.index, item?.row)}
        onKeyUp={(e) => {
          const textContent = (e?.target as HTMLDivElement)?.innerText?.replace(/&nbsp;/g, '').trimStart()
          tableData[item.row].columnData[item.index].cellValue = textContent
        }}
        suppressContentEditableWarning={true}
      >
        {(() => {
          if(!text) return <>&nbsp;</>
          return text
        })()}
      </div>
      {
        !isFocused && isHovered
        ? (
            <div 
              className={"absolute top-0.5 right-0 px-3 py-3.5 bg-transparent"}
              onMouseOver={() => {
                if(isHeaderMenuToggled) return
                handleRowColumnItemSelect(item?.index, item?.row)
                handleHeaderItemSelect(-1)
              }}
              onMouseLeave={handleRowColumnMouseLeave}
            >
              {(() => {
                if(item?.hasCellIcon && item?.index === columnItemSelected && tableRowSelected === item?.row && isRowColumnMenuIconVisible){
                  return (
                    <div 
                      className={'absolute top-1 right-1 font-normal text-slate-70 cursor-pointer'}
                    >
                      <VerticalMenu
                        type={2}
                      >
                        {(() => {
                          if(isRowColumnMenuToggled){
                            return <ColumnMenu 
                                      isColumnConvertable={true}
                                      hasMoveColumnMenu={false}
                                      hasSortMenu={false}
                                      hasRowMenu={item?.hasRowMenu} 
                                      hasColumnMenu={item?.hasColumnMenu}
                                      colIndex={item?.index} 
                                      row={item?.row}
                                      totalRows={item?.totalRows}
                                    />
                          }
                        })()}
                      </VerticalMenu>
                    </div>
                  )
                }
              })()}
            </div>
          )
        : null
      }
      <div className={(isRowColumnMenuToggled ? 'block' : 'hidden') + " content-[''] h-full w-full absolute top-0 right-0 z-0 bg-transparent"}/>
    </td>
  )
}

export const TableData = React.memo(tableData)

