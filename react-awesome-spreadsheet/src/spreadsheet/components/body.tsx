import React, { createElement } from 'react'

export const GridBody = ({children}: {children: React.ReactNode}) =>{
  return(
    createElement(
      'tbody', {}, children
    )
  )
}