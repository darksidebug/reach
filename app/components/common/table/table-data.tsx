import React, { useEffect, useState, KeyboardEvent, FormEvent, useRef } from "react";

import { VerticalMenu } from "@/app/components/common/vertical-menu";
import { ColumnMenu } from "@/app/components/common/column-menu";

import { useTableContext } from "@/app/context/table-context";

import { TableDataProps } from "@/types/table-data";

export function tableData(this: any, {data, item}: TableDataProps) {

  const divElementRef = useRef<HTMLDivElement | null>(null)
  const [event, setEvent] = useState<KeyboardEvent<HTMLDivElement> | any>()
  const keyboardKeys = ['Control', 'Alt', 'Shift', 'CapsLock', 'Backspace', 'Delete', 'Insert', 'Meta', 'AudioVolumeUp', 'AudioVolumeDown' , 'AudioVolumeMute', 'ArrowUp', 'ArrowDown', 'ArrowRight', 'ArrowLeft', '\/']

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
    handleCellValueUpdate,
    // isFocused,
    handleColumnFocused
  } = useTableContext()

  const [columnSelected, setColumnSelected] = useState(columnItemSelected)
  const [rowSelected, setRowSelected] = useState(tableRowSelected)

  const handleMouseDown = () => {
    if(isRowColumnMenuToggled) return
    setFocused(true);
    handleRowColumnItemSelectOnMouseOver();
    handleRowColumnSelection(item?.index, item?.row);
    if(divElementRef.current?.innerText === '&nbsp;') {
      divElementRef.current?.innerText?.replace(/&nbsp;/g, '');
    }
  }

  const handleDivElementOnBlur = () => {
    setFocused(false);
    handleRowColumnSelection((item.index + 1), (item?.row + 1));
    let cellValue = divElementRef.current?.innerText?.trimStart()
    tableData[item.row].columnData[item.row] = cellValue
    // handleCellValueUpdate({row: item?.row, index: item?.index, value: cellValue});
  }

  const handleDivElementOnKeydown = (e: FormEvent<HTMLDivElement>) => {
    // console.log(e)
    // if(e.key == '\\' || e.key === 'Enter') e.preventDefault()
    let cellValue = divElementRef.current?.innerText?.trimStart()
    tableData[item.row].columnData[item.row] = cellValue
    // handleCellValueUpdate({row: item?.row, index: item?.index, value: cellValue});
  }

  const handleTableDataOnMouseOver = () => {
    setHovered(true)
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

  const isColumnCellFocused = () => {
    return isFocused && columnItemSelected === item?.index && tableRowSelected === item?.row
  }

  const handleSetCursorPosition = (e: KeyboardEvent<HTMLDivElement>) => {
    
    if(!e?.target) return
    const targetElement = e.target;
    // if(e.key === 'Enter'){
    //   targetElement.innerHTML = targetElement.innerText += '\n'
    // }
    const setpos = document.createRange();
    const set = window.getSelection();

    //@ts-ignore
    if(!targetElement?.childNodes || !targetElement?.innerText?.length || e.key === 'Enter') return
    //@ts-ignore
    setpos.setStart(targetElement?.childNodes[0], targetElement?.innerText?.length);
    setpos.collapse(true); // @ts-ignore
    set.removeAllRanges(); // @ts-ignore
    set.addRange(setpos); // @ts-ignore
    targetElement.focus();
  }

  // useEffect(() => {
  //   // handleSetCursorPosition(event)
  //   if(columnSelected === item?.index && rowSelected === item?.row){
  //     setFocused(true)
  //   }

  //   // console.log(isFocused, columnSelected, rowSelected)
  // }, [isFocused])

  return(
    <td
      // tabIndex={((item?.row + 3) + (item?.index + 1))}
      id={"table" + item?.index }
      className={'relative min-w-[80px] w-auto p-[2px] border border-slate-300 last:border-r-0 text-xs text-left text-slate-700 cursor-text'}
      onMouseOver={handleTableDataOnMouseOver}
      onMouseLeave={handleTableDataOnMouseLeave}
    >
      <div 
        // tabIndex={(item?.index + 3)}
        ref={divElementRef}
        id={'cell-' + item?.index}
        autoFocus={isFocused}
        contentEditable={isFocused}
        className={'relative z-0 w-auto py-[7px] px-2 text-xs ' + (isFocused || columnItemSelected === item?.index && tableRowSelected === item?.row ? ' outline-2 outline-sky-300' : 'whitespace-pre-line')}
        onMouseDown={handleMouseDown}
        onBlur={() => {
          // handleColumnFocused(false)
          handleDivElementOnBlur()
          // handleRowColumnItemSelect((item?.row + 1), (item?.index + 1))
        }}
        onFocus={() => {
          const text = divElementRef.current?.innerHTML
          if(text?.includes('&nbsp;')){
            // console.log('asdf')
            setFocused(true)
            text.replaceAll('&nbsp;', '')
          }
          handleRowColumnSelection(item?.index, item?.row)
        }}
        onKeyDown={(e) => {
          // console.log(e)
          // if(e.altKey && e.key === 'Enter'){
          //   console.log()
          // }
          if(e.key === 'Tab') {
            // console.log(columnItemSelected, tableRowSelected)
            // handleRowColumnItemSelect((item?.row + 1), (item?.index + 1))
            handleDivElementOnBlur()
            setFocused(false)

            e.preventDefault()
          }

          // handleDivElementOnKeydown(e)
        }}
        onInput={(e) => {
          handleDivElementOnKeydown(e)
        }}
        // onInput={() => {}}
        // value={data?.text}
        suppressContentEditableWarning={true}
        // dangerouslySetInnerHTML={{ __html: this.state.htmlcontent}}
      >
        {(() => {
          if(!data?.text) return <>&nbsp;</>
          return <>{data?.text}</>
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

