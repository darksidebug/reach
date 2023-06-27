'use-client'

import React from 'react'

import { useTableContext } from "@/context/table-context"

export function verticalMenu(
  {children, type}: 
  {children: React.ReactNode, type: Number}
) {

  const { 
    isHeaderMenuToggled, 
    isRowColumnMenuToggled,
    handleHeaderToggleMenu,
    handleRowColumnToggleMenu,
    handleTableItemToggle,
    isTableItemMenuToggled,
  } = useTableContext()

  return(
    <div 
      contentEditable={false}
      className="relative z-10 w-4 h-5"
    >
      <button 
        className='relative w-4 h-5 bg-slate-200 hover:bg-slate-100 border border-slate-300 rounded-[3px] cursor-pointer'
        onClick={(e) => {
          if(type === 1) return handleHeaderToggleMenu()
          if(type === 2) return handleRowColumnToggleMenu()
          if(type === 3) return handleTableItemToggle()
          e.stopPropagation()
        }}
        // onBlur={(e) => {
        //   if(type === 1) return handleHeaderToggleMenu()
        //   if(type === 2) return handleRowColumnToggleMenu()
        //   if(type === 3) return handleTableItemToggle()
        //   e.stopPropagation()
        // }}
      >
        <div className='inline-block h-auto py-1 px-1.5 space-y-[1.5px]'>
        {
          [1, 2, 3].map((item) => {
            return (
              <div key={item} className='min-h-[2.5px] h-[2.5px] min-w-[2.5px] w-[2.5px] rounded-full bg-slate-600' />
            )
          })
        }
        </div>
      </button>
      {(() => {
        if(isHeaderMenuToggled || isRowColumnMenuToggled || isTableItemMenuToggled){
          return children
        }
      })()}
    </div>
  )
}

export const VerticalMenu = React.memo(verticalMenu)