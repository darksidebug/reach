import { JSX, Component, useState, useEffect } from "react";

import '@/react-awesome-spreadsheets/src/css/index.css'

interface IStateProps{
  data                  : IDataPropeties,
  useCustomHeader?      : boolean,
  customHeader?         : Array<object | any>,
  useColumnNumbering?   : boolean,
  enableColumnCheckbox? : boolean,
  useCustomMinRowLimit? : boolean,
  customMinimumRowLimit?: number
}

interface IRows{
  row: number,
  column: Array<number>
}

interface IClassState{
  header               : Array<string>
  minimumRowLimit      : number,
  data                 : IDataPropeties | any,
  useCustomHeader      : boolean,
  customHeader         : Array<object | any>,
  useColumnNumbering   : boolean,
  enableColumnCheckbox : boolean,
  useCustomMinRowLimit : boolean,
  customMinimumRowLimit: number,
  isSelecting          : boolean,
  isDragging           : boolean,
  rowsSelected         : IRows[],
  isHighlighting       : boolean,
  isCopying            : boolean,
  isMouseUp            : boolean
}

interface IDataPropeties{
  headers      : Array<string>,
  headerStyle? : string,
  rows?        : IDataRowPropeties[],
}

interface IDataRowPropeties{
  columns      : IDataColumnsPropeties[],
  columnStyle? : string
}

interface IDataColumnsPropeties{
  id   : number,
  value: any
}

class ReactAwesomeSpreadSheetGrid extends Component<IStateProps, IClassState> {
  constructor(props: IStateProps) {
    super(props)
    this.state = {
      header               : ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 
                              'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
      minimumRowLimit      : 15,
      data                 : props?.data ? props?.data : {},
      useCustomHeader      : props?.useCustomHeader ?? false,
      customHeader         : props?.useCustomHeader && props?.customHeader ? [...props?.customHeader] : [],
      useColumnNumbering   : props?.useColumnNumbering ?? true,
      enableColumnCheckbox : props?.enableColumnCheckbox ?? true,
      useCustomMinRowLimit : props?.useCustomMinRowLimit ?? false,
      customMinimumRowLimit: props?.customMinimumRowLimit ?? 0,
      isSelecting          : false,
      isDragging           : false,
      rowsSelected         : [],
      isHighlighting       : false,
      isCopying            : false,
      isMouseUp            : true
    }
  }

  getRowsAndColumsInitialState = () => {
    return {
      rowsSelected: []
    }
  }

  getSelectionInitialState = () => {
    return {
      isSelecting: false,
      isDragging: false
    }
  }

  handleMouseDown = (row: number, column: number) => {
    let columns: Array<number> = [],
        rows: IRows[] = [];

    // const checkRows = this.state.rowsSelected

    // if(checkRows?.length){
    //   console.log('a')
    //   checkRows.filter((item) => {
    //     if(item.column.indexOf(column)){
    //       this.handleSetRowsAndColumns({
    //         // @ts-ignore
    //         rowsSelected: []
    //       })

    //       columns.push(column)
    //       rows.push({row: row, column: columns})
    //     } else{
    //       console.log('e')
    //       columns.push(column)
    //       rows.push({ row: row, column: columns })
    //     }
    //   })
    // }else{
    //   console.log('b')
    //   columns.push(column)
    //   rows.push({ row: row, column: columns })
    // }

    columns.push(column)
      rows.push({ row: row, column: columns })

    this.handleSetRowsAndColumns({
      // @ts-ignore
      rowsSelected: rows
    })
  }

  handleMouseEnter = (row: number, column: number) => {
    const rows: IRows[] = this.state.rowsSelected

    rows.filter((item) => {
      if(item.row === row){
        item.column.push(column)
      } else{
        rows.push({ row: row, column: [...item.column] })
      }
    })

    this.handleSetRowsAndColumns({
      // @ts-ignore
      rowsSelected: rows
    })
  }

  isLastItem = (row: number, column: number) => {
    const rows: IRows[] = this.state.rowsSelected
    let isLastItemInArray = false

    if(!rows?.length) return isLastItemInArray

    const lastRowIndex = (rows?.length - 1)
    if(rows[lastRowIndex]?.row === row){
      const lastColumnIndex = (rows[lastRowIndex]?.column.length - 1)
      if(rows[lastRowIndex]?.column[lastColumnIndex] === column){
        isLastItemInArray = true
      }
    }

    return isLastItemInArray
  }

  isFirstItem = (row: number, column: number) => {
    const rows: IRows[] = this.state.rowsSelected
    let isFirstItemInArray = false

    if(!rows?.length) return isFirstItemInArray

    if(rows[0]?.row === row){
      if(rows[0]?.column[0] === column){
        isFirstItemInArray = true
      }
    }

    return isFirstItemInArray
  }

  handleSelecting = (state: {isSelecting: boolean}) => {
    this.setState({...state})
  }

  handleSetRowsAndColumns = (state: { rowsSelected: IRows[]}) => {
    this.setState({...state})
  }

  handleHighlighting = (state: {isHighlighting: boolean}) => {
    this.setState({...state})
  }

  handleCopying = (state: {isCopying: boolean}) => {
    this.setState({...state})
  }

  handleMouseState = (state: {isMouseUp: boolean}) => {
    this.setState({...state})
  }

  handleCopyOnMouseDown = () => {
    const rows: IRows[] = this.state.rowsSelected

    this.handleSetRowsAndColumns({
      // @ts-ignore
      rowsSelected: rows
    })
  }

  isColumnSelected = (row: number, column: number) => {
    const rows: IRows[] = this.state.rowsSelected
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

  handleDragging = (state: {isDragging: boolean}) => {
    this.setState({...state})
  }

  getColumnKeyNumber = (index: number) => {
    const { useColumnNumbering, enableColumnCheckbox } = this.state

    if(useColumnNumbering || enableColumnCheckbox) return (index + 1)
    if(useColumnNumbering && enableColumnCheckbox) return (index + 2)
    return index
  }

  render(): JSX.Element {
    const { 
      useColumnNumbering, enableColumnCheckbox,
      useCustomHeader
    } = this.state

    return(
      <div className='min-w-[960px] max-h-[600px] overflow-auto'>
        <table className='w-full mb-[1px]'>
          <thead className='bg-slate-200/80'>
            <tr>
              { useColumnNumbering ? this.renderHeaderWhenColumnNumberEnable() : null}
              { enableColumnCheckbox ? this.renderHeaderWhenColumnCheckboxEnable() : null}
              {
                !useCustomHeader 
                ? this.renderColumnHeader()
                : this.renderCustomColumnHeader()
              }
            </tr>
          </thead>
          <tbody>
            { this.renderColumnRows() }
          </tbody>
        </table>
      </div>
    )
  }

  renderHeaderWhenColumnNumberEnable(): JSX.Element {
    return (
      <th 
        className={'max-w-[100px] border-r border-slate-300 bg-slate-200 select-non'}
      />
    )
  }

  renderHeaderWhenColumnCheckboxEnable(): JSX.Element {
    const { data } = this.state

    return (
      <th 
        className={(!data?.headers?.length ? 'px-3.5' : '') + ' py-[5px]  border-r border-slate-300'}
      >
        { !data?.headers?.length && <div className="flex justify-center items-center">
            <input className="m-0" type="checkbox" name="" id="" />
          </div>
        }
      </th>
    )
  }

  renderColumnHeader(): JSX.Element {
    const { header } = this.state

    return (
      <>
        {
          header.map((title: string, index: number) => {
            return (
              <th 
                key={'th-' + title + '-' + this. getColumnKeyNumber(index)}
                className='relative p-1 min-w-[100px] w-auto border-r border-slate-300 last:border-r-0 text-xs text-center font-semibold text-slate-700' 
              >
                { title }
              </th>
            )
          })
        }
      </>
    )
  }

  renderCustomColumnHeader(): JSX.Element {
    const { customHeader } = this.state

    return (
      <>
        {
          customHeader.map((title: string, index: number) => {
            return (
              <th 
                key={'th-' + title + '-' + this. getColumnKeyNumber(index)}
                className='relative p-1 min-w-[100px] w-auto border-r border-slate-300 last:border-r-0 text-xs text-center font-semibold text-slate-700' 
              >
                { title }
              </th>
            )
          })
        }
      </>
    )
  }

  renderCellNumbering(key: string, index: number): JSX.Element {
    return (
      <td 
        key={'cell-' + key + '-' + this.getColumnKeyNumber(index)}
        id={'cell-' + key + '-' + this.getColumnKeyNumber(index) }
        className='px-2 h-full bg-slate-100 border-t border-r border-b border-slate-300 text-[10px] font-bold text-center cursor-pointer select-none'
      >
        {( index + 1 )}
      </td>
    )
  }

  renderCellCheckbox(key: string, index: number): JSX.Element {
    return (
      <td 
        key={'cell-' + key + '-' + this.getColumnKeyNumber(index)}
        id={'cell-' + key + '-' + this.getColumnKeyNumber(index) }
        className={'bg-slate-100 border-slate-300 text-[10px] font-bold text-center cursor-pointer'}
      >
        <div className="flex justify-center items-center px-3">
          <input className="m-0" type="checkbox" name="" id="" />
        </div>
      </td>
    )
  }

  renderColumnRows(): JSX.Element {
    const { 
      minimumRowLimit, useColumnNumbering, 
      useCustomHeader, enableColumnCheckbox,
      header, data
  } = this.state

    return(
      <>
        <tr
          key={'row-' + '1A' + '-' + 1}
          className="border-t border-b border-slate-300"
        >
          { useColumnNumbering ? this.renderCellNumbering('1A', 0) : null }
          { enableColumnCheckbox ? this.renderCellCheckbox('2A', 0) : null }
          { !useCustomHeader 
            ? this.renderColumnCellHeading() 
            : this.renderCustomColumnCellHeading()
          }
        </tr>
        {
          header.map((key: string, index: number) => {
            if(index < (minimumRowLimit - (data?.headers?.length ? 1 : 0))){
              return (
                <tr
                  key={'row-' + key + '-' + (index + 2)}
                  className="border-t border-b border-slate-300"
                >
                  { useColumnNumbering ? this.renderCellNumbering('1A', data?.headers?.length ? (index + 1) : index) : null }
                  { enableColumnCheckbox ? this.renderCellCheckbox('2A', data?.headers?.length ? (index + 1) : index) : null }
                  { this.renderColumnCells(index) }
                </tr>
              )
            }
          })
        }
      </>
    )
  }

  renderColumnCellHeading(): JSX.Element {
    const { header, data } = this.state

    return(
      <>
        {
          header.map((key: string, index: number) => {
            return (
              <td
                key={'cell-' + key + '-' + this.getColumnKeyNumber(index)}
                id={'cell-' + key + '-' + this.getColumnKeyNumber(index) }
                className={'relative min-w-[80px] w-auto py-[3px] px-[2px] border border-slate-300 last:border-r-0 text-xs text-left text-slate-700 cursor-text ' + (data?.headers[index] ? data.headerStyle : '')}
              >
                { data?.headers[index] ?? '' }
              </td>
            )
          })
        }
      </>
    )
  }

  renderCustomColumnCellHeading(): JSX.Element {
    const { customHeader, data } = this.state

    return(
      <>
        {
          customHeader.map((key: string, index: number) => {
            return (
              <td
                key={'cell-' + key + '-' + this.getColumnKeyNumber(index)}
                id={'cell-' + key + '-' + this.getColumnKeyNumber(index) }
                className={'relative min-w-[80px] w-auto py-[3px] px-[2px] border border-slate-300 last:border-r-0 text-xs text-left text-slate-700 cursor-text ' + (data?.headers[index] ? data.headerStyle : '')}
              >
                { data?.headers[index] ?? '' }
              </td>
            )
          })
        }
      </>
    )
  }

  renderColumnCells(row: number): JSX.Element {

    const { 
      header, data,
    } = this.state
    
    const hasColumnData = () => {
      return data?.column && data?.column?.length
    }

    let timer = 1000

    return(
      <>
        {
          header.map((key: string, index: number) => {
            return (
              <td
                key={'cell-' + key + '-' + this.getColumnKeyNumber(index)}
                id={'cell-' + key + '-' + this.getColumnKeyNumber(index) }
                className={'relative z-[0] min-w-[80px] '+ (hasColumnData() ? 'py-[3px]' : 'py-[14px]') +' w-auto py-[3px] px-[2px] '+ (this.isColumnSelected(row, index) ? ' border-[1.5px] border-sky-300 bg-sky-50/60' : 'border border-slate-300') + (this.isFirstItem(row, index) ? ' border-[2.5px] border-sky-400 ' : '') +' last:border-r-0 text-xs text-left text-slate-700 cursor-default ' + (hasColumnData() ? data?.columnStyle : '') }

                onMouseDown={() => {
                  if(this.state.isHighlighting) return

                  this.handleSetRowsAndColumns({rowsSelected: []})
                  this.handleDragging({isDragging: false})
                  this.handleMouseState({isMouseUp: false})
                  this.handleSelecting({isSelecting: true})
                  this.handleMouseDown(row, index)
                }}
                onContextMenu={(e) => {
                  this.handleDragging({isDragging: false})
                  e.preventDefault()
                }}
                onMouseMove={() => {
                  if(this.state.isSelecting){
                    this.handleDragging({isDragging: true})
                  }
                  // console.log(this.state.rowsSelected)
                }}
                onMouseOver={() => {
                  if(this.state.isMouseUp) return
                  if(this.state.isDragging && this.state.isSelecting){
                    this.handleMouseEnter(row, index)
                  }
                }}
                onMouseUp={() => {
                  this.handleSelecting({isSelecting: false})
                  this.handleDragging({isDragging: false})
                }}
                onBlur={() => {
                  this.handleSetRowsAndColumns(this.getRowsAndColumsInitialState())
                  this.handleSelecting({isSelecting: false})
                  this.handleDragging({isDragging: false})
                  this.handleMouseState({isMouseUp: true})
                }}
                onKeyUp={(e) => {
                  if(e.key === 'Tab'){
                    this.handleSetRowsAndColumns(this.getRowsAndColumsInitialState())
                    this.handleMouseDown(row + 1, index + 1)
                  }
                }}
              > 
                { 
                  this.isLastItem(row, index) && !this.state.isMouseUp
                  ? <div 
                      className="absolute -bottom-1 -right-1 z-[1] h-2 w-2 rounded-full border border-sky-500 bg-sky-500 hover:cursor-crosshair"
                      onMouseOver={() => {
                        this.handleHighlighting({isHighlighting: true})
                      }}
                      onMouseLeave={() => {
                        this.handleHighlighting({isHighlighting: false})
                        this.handleCopying({isCopying: false})
                      }}
                      onMouseDown={() => {
                        this.handleSetRowsAndColumns(this.getRowsAndColumsInitialState())
                        this.handleSelecting({isSelecting: true})
                        this.handleCopyOnMouseDown()
                      }}
                      onMouseMove={() => {
                        if(this.state.isHighlighting){
                          this.handleCopying({isCopying: true})
                        }
                      }}
                      onMouseUp={() => {
                        this.handleCopying({isCopying: false})
                        this.handleHighlighting({isHighlighting: false})
                      }}
                    />
                  : null
                }
                <div>
                  { '' }
                </div>
              </td>
            )
          })
        }
      </>
    )
  }

  

}

export default ReactAwesomeSpreadSheetGrid