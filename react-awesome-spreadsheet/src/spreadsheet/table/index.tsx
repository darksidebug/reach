import React, { Component, JSX, createElement } from "react";

import '@/next-awesome-spreadsheet/assets/css/grid.css'

import TableGrid from "./components/grid";
import { GridHeader } from "./components/header";
import { GridRow } from "./components/row";
import { GridColumnHeader } from "./components/column";
import { CellCheckbox } from "./components/cellCheckbox";

import { IClassGridState, IStateGridProps, IRowsSelected } from "@/react-awesome-spreadsheet/types";
import { GridBody } from "./components/body";
import { GridCell } from "./components/cell";

class ReactSpreadSheetGrid extends Component<IStateGridProps, IClassGridState> {

  constructor(props: any) {
    super(props)
    this.state = {
      header             : ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 
                              'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
      rowsSelected       : [],
      currentRowSelected : {id: '', row: -1, column: -1},
      currentRow         : -1,
      currentColumn      : -1,
      isCellFocused      : false,
      minimumRowLimit    : 21,
      isSelecting        : false,
      isDragging         : false,
      isHighlighting     : false,
      isCopying          : false,
      columnCounter      : 0,
      rowCounter         : 0
    }
  }

  componentDidMount(): void {
    
    document.addEventListener('keydown', (e) => {

      const td = document.getElementById(this.state.currentRowSelected?.id)

      if(e.key === 'Alt') {
        this.handleColumnContentOnBlur(this.state.currentRowSelected?.id)
        return e.preventDefault()
      }
      
      if(e.key.includes('Tab') || e.key.includes('Enter') || e.key.includes('Arrow')) {

        this.handleColumnContentOnBlur(this.state.currentRowSelected?.id)

        if(e.key === 'Tab' || e.key === 'ArrowRight'){
          if(this.state.isCellFocused) this.handleSetCellContentUpdate()
          this.handleRowSelectOnLeftRight(1, 1, e.key)
          e.preventDefault()
        }

        if(
          (e.altKey && e.key === 'Enter') || 
          (e.key === 'Enter' && !this.state.isCellFocused) || 
          (e.key === 'Enter' && this.state.isCellFocused && !td?.innerText) ||
          (e.key === 'ArrowDown')
        ){
          if(this.state.isCellFocused) this.handleSetCellContentUpdate()
          this.handleRowSelectedOnUpDown(1, 0, e.key)
        }

        if(e.key === 'ArrowLeft'){
          if(this.state.isCellFocused) this.handleSetCellContentUpdate()
          this.handleRowSelectOnLeftRight(-1, -1, e.key)
        }

        if(e.key === 'ArrowUp'){
          if(this.state.isCellFocused) this.handleSetCellContentUpdate()
          this.handleRowSelectedOnUpDown(-1, 0, e.key)
        }
      }
    })
  }

  handleColumnContentOnFocus = (id: string) => {
    let td = document.getElementById(id)

    if(td){
      if(!td.innerText) return

      td.innerText += '\n\n'
    }
  }

  handleColumnContentOnBlur = (id: string) => {
    let td = document.getElementById(id)

    if(td){

      if(!td.innerText) return

      let textArray: Array<string> = []
      const innerText = td.innerText.split('\n\n')

      if(!innerText[(innerText?.length - 1)]) {

        innerText.splice((innerText?.length - 1), 1)
        const textContent = textArray.concat(innerText)
        td.innerText = textContent.toString().replaceAll(',', '')
      }
    }
  }

  handleSelectNextCell = (nextRow: number, nextColumn: number, key: string) => {

    const item   = this.state.header,
          row    = this.state.currentRow,
          column = this.state.currentColumn

    let elementId     = '',
        currentRow    = 0,
        currentColumn = 0

    if(
      ((column + nextColumn) < 0) || 
      ((column + nextColumn) === this.state.header?.length)
    ) return
    
    const leanBack = (key === 'ArrowDown' || key === 'Enter') ? 1 : -1,
          moveNext = (key === 'ArrowDown' || key === 'Enter') ? 0 : this.state.minimumRowLimit - 2

    if(((row + nextRow) === this.state.minimumRowLimit - 1) || ((row + nextRow) < 0)){

      elementId     = `td-${0}-${item[(column + leanBack)]}-${(column + leanBack)}`
      currentRow    = moveNext
      currentColumn = (column  + leanBack)

    } else {

      elementId     =  `td-${(row + nextRow)}-${item[(column + nextColumn)]}-${(column + nextColumn)}`
      currentRow    = (row + nextRow)
      currentColumn = (column  + nextColumn)
    }

    this.handleSetState({
      currentRowSelected: {
        id     : elementId,
        row    : currentRow,
        column : currentColumn
      },
      currentRow    : currentRow,
      currentColumn : currentColumn,
      rowsSelected  : [{ row: currentRow, column: [currentColumn] }],
      isCellFocused : false
    })
  }

  handleSetCurrentState = (id: string, row: number, column: number, columnCounter: number, rowCounter: number) => {
    this.handleSetState({
      currentRowSelected: {
        id     : id,
        row    : row,
        column : column
      },
      currentRow    : row,
      currentColumn : column,
      columnCounter : columnCounter,
      rowCounter    : rowCounter,
      isCellFocused : false
    })
  }

  handleRowSelectOnLeftRight = (nextRow: number, nextColumn: number, key: string) => {

    let { columnCounter, rowCounter } = this.state
    let row           = this.state.currentRow,
        rowsSelected  = this.state.rowsSelected,
        next_row      = 0,
        next_col      = 0,
        elementId     = ''
    const item       = this.state.header

    if(this.state.rowsSelected?.length === 1){

      let leanBack = (key === 'ArrowLeft' ? -1 : 1)

      if(rowsSelected[0]?.column?.length === 1) {
        return this.handleSelectNextCell(0, leanBack, key)
      }

      if(key === 'Tab'){
        columnCounter += nextColumn

        if(rowsSelected[0]?.column?.length === columnCounter){
          columnCounter = 0
        }

        elementId = `td-${(row)}-${item[(rowsSelected[0]?.column[columnCounter])]}-${(rowsSelected[0]?.column[columnCounter])}`
        next_row  = row
        next_col  = rowsSelected[0]?.column[columnCounter]
      } else{

        columnCounter = key === 'ArrowLeft' ? -1 : rowsSelected[0]?.column?.length
        elementId = `td-${(row)}-${item[(rowsSelected[0]?.column[(columnCounter - leanBack)])]}-${(rowsSelected[0]?.column[(columnCounter - leanBack)])}`

        next_row  = row
        next_col  = rowsSelected[0]?.column[columnCounter - leanBack]

        rowCounter    = 0
        columnCounter = 0

        this.handleSetState({rowsSelected: [{ row: next_row, column: [(next_col)] }]})
      }

    } else {

      if(key === 'Tab'){
        columnCounter += nextColumn
  
        if(rowsSelected[rowCounter]?.column?.length === columnCounter){
          columnCounter = 0
          rowCounter += nextRow
        }
  
        if(rowCounter === rowsSelected?.length){
          rowCounter = 0
        }
  
        elementId = `td-${(row)}-${item[(rowsSelected[rowCounter]?.column[columnCounter])]}-${(rowsSelected[rowCounter]?.column[columnCounter])}`
        next_row  = rowsSelected[rowCounter]?.row,
        next_col  = rowsSelected[rowCounter]?.column[columnCounter]
  
      } else {
  
        const rowEndIndex    = (rowsSelected?.length - 1),
              columnEndIndex = (rowsSelected[rowEndIndex]?.column?.length - 1)
  
        elementId = `td-${(row)}-${item[(rowsSelected[rowEndIndex]?.column[columnEndIndex])]}-${(rowsSelected[rowEndIndex]?.column[columnEndIndex])}`
        next_row = key === 'ArrowLeft' ? rowsSelected[0]?.row : rowsSelected[rowEndIndex]?.row,
        next_col = key === 'ArrowLeft' ? rowsSelected[0]?.column[0] : rowsSelected[rowEndIndex]?.column[columnEndIndex]
  
        rowCounter    = 0
        columnCounter = 0
  
        this.handleSetState({rowsSelected: [{ row: next_row, column: [(next_col)] }]})
      }
    }

    this.handleSetCurrentState(elementId, next_row, next_col, columnCounter, rowCounter)
  }

  handleRowSelectedOnUpDown = (nextRow: number, nextColumn: number, key: string) => {

    let { columnCounter, rowCounter } = this.state
    let row          = this.state.currentRow,
        column       = this.state.currentColumn,
        rowsSelected = this.state.rowsSelected,
        rows         = [],
        elementId    = '',
        next_row    = 0,
        next_column = 0
    const item       = this.state.header

    if(rowsSelected?.length === 1){

      if(rowsSelected[0]?.column?.length === 1) return this.handleSelectNextCell(nextRow, nextColumn, key)

      next_row      = (row + nextRow)
      next_column   = (column  + nextColumn)
      elementId     = `td-${next_row}-${item[next_column]}-${next_column}`
      columnCounter = 0
      rowCounter    = 0

      rows.push({ row: next_row, column: [next_column] })
      this.handleSetState({rowsSelected: rows})

    } else {
      rowCounter += 1
      if(rowsSelected?.length === rowCounter){
        rowCounter = 0
        columnCounter += 1
      }

      if(columnCounter === rowsSelected[rowCounter]?.column?.length){
        columnCounter = 0
      }

      console.log(rowCounter, columnCounter)
      next_row    = rowsSelected[rowCounter]?.row
      next_column = rowsSelected[rowCounter]?.column[columnCounter]
      elementId   = `td-${next_row}-${item[next_column]}-${next_column}`
    }

    this.handleSetCurrentState(elementId, next_row, next_column, columnCounter, rowCounter)
  }

  handleRowSelect = (param: any): void => {
    
    let columns: Array<number> = [],
        rows   : any           = [];

    columns.push(param?.column)
    rows.push({ row: param?.row, column: columns })

    this.handleSetState({
      rowsSelected       : rows,
      currentRowSelected : {...param}
    })
  }

  handleRowCheck = (row: number) => {
    const rows: IRowsSelected[] = this.state.rowsSelected
    let isAlreadyInserted = false
    for(let i = 0; i < rows?.length; i++){
      if(rows[i].row === row){
        isAlreadyInserted = true
      }
    }
    return isAlreadyInserted
  }

  handleMouseHover = (row: number, column: number) => {
    const rows: IRowsSelected[] = this.state.rowsSelected
    let columns: Array<number> = []

    if(this.handleRowCheck(row)){
      for(let i = rows.length; i != 0; i--){
        if(rows[(i - 1)]?.column){
          if(rows[i]?.column?.length !== rows[(i - 1)]?.column?.length){
            if(rows[(i - 1)]?.column.indexOf(column) === -1){
              rows[(i - 1)].column.push(column)
            }
          }
        }
      }
    }else{
      columns = [...rows[(rows?.length - 1)]?.column]
      rows.push({ row: row, column: columns })
      
    }

    this.handleSetState({
      rowsSelected: rows
    })
    console.log(this.state.rowsSelected)
  }

  handleCellUpdateOnFocusLeave = (el: string, row: number, index: number) => {
    const { header } = this.state,
          item = header[index],
          id   = `${el}-${row}-${item}-${index}`,
          td   = document.getElementById(id)

    if(td) this.handleCellContentUpdate(row, index, td?.innerText)
  }

  handleSetCellContentUpdate = () => {
    const { id, row, column } = this.state.currentRowSelected,
          td = document.getElementById(id)

    if(td) this.handleCellContentUpdate(row, column, td.innerText)
  }

  handleCellContentUpdate = (row: number, column: number, value: string) => {
    this.props.onCellContentUpdate({
      columnIndex : column,
      rowIndex    : row,
      column : {
        value  : value,
        styles : {}
      }
    })
  }

  handleSetState(state: {}): void {
    this.setState({...state})
  }

  render(): JSX.Element {

    const { 
      header, currentRowSelected, isCellFocused,
      isSelecting, isDragging, currentRow, currentColumn 
    } = this.state
    const { data } = this.props

    const getCellData = (row: number, column: number) => {
      
      if(data?.headers?.length){
        if(row === 0) return data?.headers[column]
        return getRowColumnData(row, column)
      }

      return getRowColumnData(row, column)
    }

    const getRowColumnData = (row: number, column: number) => {
      // @ts-ignore
      if(data?.rows[row]?.id === row) return data?.rows[row]?.columns[column]?.value
    }

    const getHeaderCellStyle = (row: number, column: number) => {
      if(data?.headers?.length){
        return row === 0 && data?.headers[column] ? data.headerStyle : null
      }
    }

    const getCellStyleSelection = (row: number, column: number) => {
      
    }

    const isGridCellSelected = (row: number, column: number) => {
      const rows: IRowsSelected[] = this.state.rowsSelected
      let isSelected = false
  
      if(!rows?.length) return isSelected
  
      rows.filter((item) => {
        if(item.row === row){
          if(item.column.indexOf(column) !== -1){
            isSelected = true
          }
        }
      })
  
      return isSelected
    }

    const getCellFocusedState = (row: number, column: number) => {
      return currentRowSelected?.row === row && currentRowSelected?.column === column
    }

    return (
      createElement(
        'div', {className: 'table--wrapper'},
        <TableGrid>
          <GridHeader>
            <GridRow>
              {(() => {
                return(
                  createElement(
                    'th', { key: 'th-0A' }
                  )
                )
              })()}
              <CellCheckbox 
                wrapper={'th'} 
                isVisible={!data?.headers?.length} 
              />
              {
                header.map((item: string, index: number) => {
                  return (
                    <GridColumnHeader 
                      key        = { 'th-' + item } 
                      isSelected = { currentColumn === index } 
                    >
                      { item }
                    </GridColumnHeader>
                  )
                })
              }
            </GridRow>
          </GridHeader>
          <GridBody>
            {
              header.map((item: string, row: number) => {
                if(row < 20){
                  return(
                    <GridRow key={'tr-' + item + '-' + row} className="p-2">
                      {(() => {
                        return(
                          createElement(
                            'td',
                            { className: `${currentRow === row ? 'isSelected' : ''}` },
                            row + 1
                          )
                        )
                      })()}
                      <CellCheckbox 
                        wrapper   = { 'td' } 
                        isVisible = { true } 
                      />
                      {
                        header.map((item: string, index: number) => {
                          return(
                            <GridCell 
                              key          = { 'td-' + item + '-' + index } 
                              id           = { `td-${row}-${item}-${index}` }
                              className    = { getHeaderCellStyle(row, index) }
                              cellStyle    = {{
                                isSelected     : getCellFocusedState(row, index),
                                isHighlighted  : isGridCellSelected(row, index),
                                isLastCellItem : false,
                                isSingleRow    : false
                              }}
                              
                              isFocused    = { isCellFocused && row === currentRow && index === currentColumn }
                              hasCellValue = { getCellData(row, index) }

                              onSelect = {() => {
                                this.handleRowSelect({
                                  id     : `td-${row}-${item}-${index}`,
                                  row    : row,
                                  column : index
                                })
                                this.handleSetState({
                                  currentRow    : row,
                                  currentColumn : index,
                                  rowCounter    : 0,
                                  columnCounter : 0,
                                  isSelecting   : true,
                                })
                              }}
                              onCellFocus  = {(value: boolean) => this.handleSetState({ isCellFocused: value })}
                              onFocusLeave = {() => {
                                this.handleCellUpdateOnFocusLeave('td', row, index)
                              }}
                              onDrag = {() => {
                                if(isSelecting){
                                  this.handleSetState({isDragging: true})
                                }
                              }}
                              onHover = {() => {
                                if(isDragging){
                                  this.handleMouseHover(row, index)
                                }
                              }}
                              onMouseUp = {() => this.handleSetState({ isDragging: false, isSelecting: false })}
                            >
                              { getCellData(row, index) }
                            </GridCell>
                          )
                        })
                      }
                    </GridRow>
                  )
                }
              })
            }
          </GridBody>
        </TableGrid>
      )
    )
  }
}

export default ReactSpreadSheetGrid;