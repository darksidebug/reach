import React, { createElement } from 'react'

export const GridHeader = ({children}: {children: React.ReactNode}) =>{
  return(
    createElement(
      'thead',
      { },
      children
    )
  )
}