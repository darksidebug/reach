'use client'

import React, { useEffect, useState, MouseEvent } from 'react'

import { columnMenu } from "@/utils/static/column-menu"

import { useTableContext } from '@/app/context/table-context'

import { ColumnMenuProps } from '@/types/column-menu'

export function menu(
  {
    isColumnConvertable,
    hasMoveColumnMenu,
    hasSortMenu,
    hasRowMenu, 
    hasColumnMenu,
    colIndex, 
    row, 
    totalRows
  }: ColumnMenuProps
) {
  const [selectedItem, setSelectedItem] = useState(-1)
  const [isItemToggled, setItemToggled] = useState(false)

  const handleItemSelection = (index: number) => {
    setSelectedItem(index)
  }

  const handleToggleItem = (index: number) => {
    if(index !== selectedItem) return setItemToggled(true)
    setItemToggled(!isItemToggled)
  }

  const isSelected = (index: number) => {
    return selectedItem === index
  }

  const handleDivElementMenuOnMouseDown = (e: MouseEvent<HTMLDivElement, Event>, index: number) => {
    if(selectedItem !== index) handleItemSelection(index)
    handleToggleItem(index)
    e.stopPropagation()
  }

  return(
    <div 
      contentEditable={false}
      className={'absolute '+ (row > (totalRows - 6) && row > 7 ? 'bottom-6 ' : 'top-6 ' ) + (colIndex < 2 ? 'left-0' : 'right-0') +' z-30 py-2 px-4 min-w-[200px] w-auto text-xs text-left bg-white border border-slate-300 rounded-[3px] shadow-md cursor-default'}
    >
      <div className='relative'>
        {
          columnMenu.map((item: any, index: number) => {
            if(index === 0) item.append = hasMoveColumnMenu
            if(index === 4) item.append = hasRowMenu
            if(index === 3) item.append = hasColumnMenu
            if(index === (columnMenu?.length - 2)) item.append = hasSortMenu
            if(index === (columnMenu?.length - 1)) item.append = isColumnConvertable
            
            if(item.append){
              return(
                <div className='relative' key={item?.text}>
                  <div 
                    className='relative flex items-center justify-between py-[8px] cursor-pointer group'
                    onMouseDown={(e) => handleDivElementMenuOnMouseDown(e, index)}
                  >
                    <span className={'block  ' + (!isSelected(index) ? 'group-hover:text-sky-500 group-hover:font-semibold' : 'text-slate-700') + (isSelected(index) && isItemToggled ? ' font-semibold' : '') }>{ item?.text }</span>
                    {
                      ((() => {
                        if(item?.hasIcon){
                          return <item.icon className={ item?.iconClass + ' -rotate-90' } />
                        }
                      })())
                    }
                  </div>
                  {
                    (() => {
                      if(item?.hasSubMenu && selectedItem === index && isItemToggled){
                        return <item.component />
                      }
                    })()
                  }
                </div>
              )
            }
          })
        }
      </div>
    </div>
  )
}

export const ColumnMenu = React.memo(menu)