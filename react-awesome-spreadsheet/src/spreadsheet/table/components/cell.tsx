import React, { createElement, useEffect, useState, useRef } from "react"

export const GridCell = (
  {
    children, 
    className, 
    onSelect, 
    onCellFocus, 
    onFocusLeave,
    onDrag,
    onHover,
    onMouseUp,
    isFocused, 
    id,
    hasCellValue,
    cellStyle,
  }: 
  {
    children?      : React.ReactNode, 
    className?     : object | any, 
    onSelect       : Function, 
    onCellFocus    : Function, 
    onFocusLeave   : Function,
    onDrag         : Function,
    onHover        : Function,
    onMouseUp      : Function,
    isFocused      : boolean, 
    id             : string,
    hasCellValue   : boolean,
    cellStyle      : {
      isSelected     : boolean,
      isHighlighted  : boolean,
      isLastCellItem : boolean,
      isSingleRow    : boolean
    },
    
  }) => {

  const el: any = useRef<any>()
  const hasValue = () => {
    return el.current?.innerText
  }

  const isCellHighligted = () => {
    return cellStyle?.isHighlighted ? 'isHighLighted' : ''
  }

  return(
    createElement(
      'td', 
      {
        ref: el,
        id: id,
        contentEditable: isFocused,
        suppressContentEditableWarning: isFocused,
        className: `${isFocused || hasValue() || hasCellValue ? 'isFocused' : ''} ${!cellStyle.isSelected ? isCellHighligted() : 'isCurrent'} ${className ?? ''} ${isFocused ? 'focusedOutline' : ''}`,
        style: {...className},
        
        onDoubleClick : ()  => onCellFocus(true),
        onMouseDown   : ()  => onSelect(),
        onMouseMove   : ()  => onDrag(),
        onMouseOver   : ()  => onHover(),
        onMouseUp     : ()  => onMouseUp(),
        onBlur        : ()  => onCellFocus(false),
        onBlurCapture : ()  => onFocusLeave(),
        onContextMenu : (e) => e.preventDefault() 
      }, 
      children
    )
  )
}