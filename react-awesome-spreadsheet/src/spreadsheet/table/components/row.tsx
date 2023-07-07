import React, { createElement } from "react"

export const GridRow = ({children, className}: {children: React.ReactNode, className?: string}) => {
  return(
    createElement(
      'tr',
      { className: className },
      children
    )
  )
}