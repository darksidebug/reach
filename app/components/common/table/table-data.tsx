import React, { useEffect, useState, MouseEvent, KeyboardEvent } from "react";

import { VerticalMenu } from "@/app/components/common/vertical-menu";
import { ColumnMenu } from "@/app/components/common/column-menu";

import { useTableContext } from "@/app/context/table-context";

import { TableDataProps } from "@/types/table-data";

export function tableData({data, item, columnKey}: TableDataProps) {

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
    tableData,
    handleCellValueUpdate
  } = useTableContext()

  const handleMouseDown = (e: MouseEvent<HTMLDivElement, Event>) => {
    if(isRowColumnMenuToggled) return
    setFocused(true);
    handleRowColumnItemSelectOnMouseOver();
    handleRowColumnSelection(item?.index, item?.row);
    if((e?.target as HTMLDivElement)?.innerText === '&nbsp;') {
      (e?.target as HTMLDivElement)?.innerText?.replace(/&nbsp;/g, '');
    }
  }

  const handleDivElementOnBlur = () => {
    setFocused(false);
    handleRowColumnSelection(-1, -1);
  }

  const handleDivElementOnKeyup = (e: KeyboardEvent<HTMLDivElement>) => {
    const textContent = (e?.target as HTMLDivElement);
    handleCellValueUpdate({row: item?.row, index: item?.index, value: textContent?.innerText?.trimStart()});
  }

  const handleTableDataOnMouseOver = () => {
    setHovered(true),
    handleHeaderItemSelect(-1)
    handleColumnTypeSelection(1)
  }

  const handleTableDataOnMouseLeave = () => {
    if(isRowColumnMenuToggled) return
    setHovered(false)
  }

  const handleDivIconWrapperOnMouseOver = () => {
    if(isHeaderMenuToggled) return
    handleRowColumnItemSelect(item?.index, item?.row)
    handleHeaderItemSelect(-1)
  }

  const handleIconVisiblity = () => {
    return item?.hasCellIcon && 
           item?.index === columnItemSelected && 
           tableRowSelected === item?.row && 
           isRowColumnMenuIconVisible
  }

  return(
    <td
      key={columnKey}
      id={"table" + item?.index }
      className={'relative min-w-[80px] w-auto p-[2px] border-r border-t border-slate-300 last:border-r-0 text-xs text-left text-slate-700 cursor-text'}
      onMouseOver={handleTableDataOnMouseOver}
      onMouseLeave={handleTableDataOnMouseLeave}
    >
      <div 
        id={'cell-' + item?.index}
        autoFocus={isFocused}
        contentEditable={isFocused}
        className={'relative z-0 w-auto py-[7px] px-2 text-xs ' + (isFocused ? ' outline-2 outline-sky-300' : 'whitespace-pre-line')}
        onMouseDown={(e) => handleMouseDown(e)}
        onBlur={handleDivElementOnBlur}
        onFocus={() => handleRowColumnSelection(item?.index, item?.row)}
        onKeyUp={(e) => handleDivElementOnKeyup(e)}
        suppressContentEditableWarning={true}
      >
        {(() => {
          if(!data?.text) return <>&nbsp;</>
          return data?.text
        })()}
      </div>
      {
        !isFocused && isHovered
        ? (
            <div 
              className={"absolute top-0.5 right-0 px-3 py-3.5 bg-transparent"}
              onMouseOver={handleDivIconWrapperOnMouseOver}
              onMouseLeave={handleRowColumnMouseLeave}
            >
              {(() => {
                if(handleIconVisiblity()){
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

