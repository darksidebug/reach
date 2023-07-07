import React, { createElement } from "react"

export const GridColumnHeader = ({children, event, isSelected}: {children?: React.ReactNode, event?: {}, isSelected?: boolean}) => {
  return(
    createElement(
      'th', 
      {
        className: `${isSelected ? 'isSelected' : ''}`,
        ...event
      }, 
      children
    )
  )
}