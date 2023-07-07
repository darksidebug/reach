import { nanoid } from "@reduxjs/toolkit";
import React, { JSX, Component, RefObject } from "react";

interface IStateProps{
  data                  : IDataPropeties,
  useCustomHeader?      : boolean,
  customHeader?         : Array<object | any>,
  useColumnNumbering?   : boolean,
  enableColumnCheckbox? : boolean,
  useCustomMinRowLimit? : boolean,
  customMinimumRowLimit?: number,
  onContentChange       : Function
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
  currentRowSelected   : IRows[],
  rowIndex             : number,
  columnIndex          : number,
  isHighlighting       : boolean,
  isCopying            : boolean,
  isMouseUp            : boolean,
  isEditable           : boolean,
  value                : any,
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
  private divElementRef: React.RefObject<HTMLDivElement> | undefined;
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
      currentRowSelected   : [],
      rowIndex             : 0,
      columnIndex          : 0,
      isHighlighting       : false,
      isCopying            : false,
      isMouseUp            : true,
      isEditable           : false,
      value                : null,
    }
  }

  componentDidMount(): void {
    this.handleOnPressEnter()
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

  handleContentChange = (param: any) => {
    console.log('====>>>', param)
    this.props.onContentChange(param)
  }

  handleOnPressEnter = () => {
    
    document.addEventListener('keydown', (e) => {
      
      if(!this.state.isEditable){
        const rows = this.state.rowsSelected
        let columnIndex = this.state.columnIndex,
            rowIndex = this.state.rowIndex

        let defaultSelection: IRows[] = [{ row: -1, column: [] }]

        if(e.key === 'Alt') return e.preventDefault()

        if(rows?.length > 1) {

          if (e.key === 'Enter') {
            
            rowIndex++
            if(rows?.length === rowIndex){

              rowIndex = 0
              columnIndex++
            }
            
            if(rows[rowIndex].column?.length === columnIndex){
              columnIndex = 0
            }
          }

          if(e.key === 'Tab') {

            columnIndex++
            if(rows[rowIndex].column?.length === columnIndex){
              columnIndex = 0
              rowIndex++
            }

            if(rows?.length === rowIndex){
              rowIndex = 0
            }
          }

          defaultSelection[0].row = rows[rowIndex]?.row
          defaultSelection[0].column = [rows[rowIndex]?.column[columnIndex]]

          this.handleSetCommonState(defaultSelection, rowIndex, columnIndex)

          e.preventDefault()
          return
        }

        if(this.state.rowsSelected?.length === 1){

          const currentRow = rows[0].row
          const currentColumn = rows[0].column

          if (e.key === 'Enter') {
            
            if(currentColumn?.length === 1){

              defaultSelection[0].row = (currentRow + 1)
              defaultSelection[0].column = [currentColumn[0]]
            }

            if(currentColumn?.length > 1){

              columnIndex++
              this.handleColumnSelection(
                columnIndex, currentColumn, e, 
                defaultSelection, currentRow, rowIndex
              )
              e.preventDefault();
              return
            }
          }

          if(e.key === 'Tab') {
            
            if(currentColumn?.length === 1){

              defaultSelection[0].row = currentRow
              defaultSelection[0].column = [(currentColumn[0] + 1)]
            }

            if(currentColumn?.length > 1){

              columnIndex++
              this.handleColumnSelection(
                columnIndex, currentColumn, e, 
                defaultSelection, currentRow, rowIndex
              )
              return
            }
          }

          this.handlEditableStateOnDoubleClick({isEditable: false})
          this.handleSetRowsAndColumns({rowsSelected: defaultSelection})
          this.handleSetCurrentRowsAndColumns({currentRowSelected: defaultSelection})
          this.handleSetCommonState(defaultSelection, rowIndex, columnIndex)

          e.preventDefault();
          return
        }

        this.handleArrowPress(e, defaultSelection, rows)
      }
    });
  }

  handleColumnSelection = (
    columnIndex: number, currentColumn: Array<number>, e: globalThis.KeyboardEvent,
    defaultSelection: IRows[], currentRow: number, rowIndex: number
  ) => {

    columnIndex = ((currentColumn?.length) === columnIndex) ? 0 : columnIndex

    defaultSelection[0].row = currentRow
    defaultSelection[0].column = [currentColumn[columnIndex]]

    this.handleSetCommonState(defaultSelection, rowIndex, columnIndex)

    e.preventDefault();
  }

  handleSetCommonState = (defaultSelection: IRows[], rowIndex: number, columnIndex: number) => {
    this.handleSetCurrentRowsAndColumns({currentRowSelected: defaultSelection})
    this.handleIndexState({rowIndex: rowIndex, columnIndex: columnIndex})
  }

  handleArrowPress = (e: globalThis.KeyboardEvent, defaultSelection: IRows[], rows: IRows[]) => {
    const currentRow = rows[0].row
    const currentColumn = rows[0].column

    if(e.key === 'ArrowLeft') {
      defaultSelection[0].row = currentRow
      defaultSelection[0].column = [(currentColumn[0] - 1)]
    }

    if(e.key === 'ArrowUp') {
      defaultSelection[0].row = (currentRow - 1)
      defaultSelection[0].column = [(currentColumn[0])]
    }

    if(e.key === 'ArrowRight') {
      defaultSelection[0].row = currentRow
      defaultSelection[0].column = [(currentColumn[0] + 1)]
    }

    if(e.key === 'ArrowDown') {
      defaultSelection[0].row = (currentRow + 1)
      defaultSelection[0].column = [(currentColumn[0])]
    }

    this.handleSetRowsAndColumns({rowsSelected: defaultSelection})
    this.handleSetCurrentRowsAndColumns({currentRowSelected: defaultSelection})
    e.preventDefault()
    return
  }

  handleMouseDown = (row: number, column: number) => {
    let columns: Array<number> = [],
        rows: IRows[] = [];

    columns.push(column)
    rows.push({ row: row, column: columns })

    this.handleSetRowsAndColumns({
      rowsSelected: rows
    })

    this.handleSetCurrentRowsAndColumns({
      currentRowSelected: rows
    })
  }

  handleRowCheck = (row: number) => {
    const rows: IRows[] = this.state.rowsSelected
    let isAlreadyInserted = false
    for(let i = 0; i < rows?.length; i++){
      if(rows[i].row === row){
        isAlreadyInserted = true
      }
    }
    return isAlreadyInserted
  }

  handleMouseHover = (row: number, column: number) => {
    const rows: IRows[] = this.state.rowsSelected
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
      console.log('df==>')
      
    }

    this.handleSetRowsAndColumns({
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
    const rows: IRows[] = this.state.currentRowSelected
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

  handleSetCurrentRowsAndColumns = (state: { currentRowSelected: IRows[]}) => {
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

  handlEditableStateOnDoubleClick = (state: {isEditable: boolean}) => {
    this.setState({...state})
  }

  handleIndexState = (state: {rowIndex: number, columnIndex: number}) => {
    this.setState({...state})
  }

  handleCopyOnMouseDown = () => {
    const rows: IRows[] = this.state.rowsSelected

    this.handleSetRowsAndColumns({
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
                className={'relative min-w-[80px] w-auto '+ (!data?.headers?.length ? 'py-[3px]' : '') +' px-[2px] border border-slate-300 last:border-r-0 text-xs text-left text-slate-700 cursor-text ' + (data?.headers[index] ? data.headerStyle : '')}
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
    const ref: RefObject<HTMLDivElement> = React.createRef();

    // if(this.state.isEditable){
    //   this.divElementRef = ref
    // }

    const { 
      header, data, isEditable,
      isHighlighting, rowsSelected
    } = this.state
    
    const handleCellMouseDown = (index: number) => {
      this.handleSetRowsAndColumns({rowsSelected: []})
      this.handleDragging({isDragging: false})
      this.handleMouseState({isMouseUp: false})
      this.handleSelecting({isSelecting: true})
      this.handleMouseDown(row, index)
      this.handleIndexState({rowIndex: 0, columnIndex: 0})
    }
    
    const hasColumnData = () => {
      return data?.column && data?.column?.length
    }

    // const removeNBSPInnerText = (e: Event) => {
      
    //   if(e.target?.innerText.includes('&nbsp;')){
    //     e.target?.innerText.replace('&nbsp;', '')
    //     e.target?.innerText.trimStart()
    //     console.log(e)
    //   }
    // }

    return(
      <>
        {
          header.map((key: string, index: number) => {
            return (
              <td 
                key={'cell-' + key + '-' + this.getColumnKeyNumber(index)}
                id={'cell-' + key + '-' + this.getColumnKeyNumber(index) }
                className={'relative z-[0] min-w-[80px] w-auto '+ (this.isColumnSelected(row, index) && !isEditable ? ' border-[1.5px] border-sky-300 bg-sky-50/60' : 'border border-slate-300') + (this.isFirstItem(row, index) ? ' border-[2.5px] border-sky-400 ' : '') +' last:border-r-0 text-xs text-left text-slate-700 cursor-default ' + (hasColumnData() ? data?.columnStyle : '') + (this.isColumnSelected(row, index) && isEditable ? ' bg-sky-100 border-2 border-sky-300/70' : '') }
                
                onMouseDown={() => {
                  if(isHighlighting || isEditable) return
                  handleCellMouseDown(index)
                }}
                onContextMenu={(e) => {
                  e.preventDefault()
                }}
                onMouseMove={() => {
                  if(this.state.isSelecting){
                    this.handleDragging({isDragging: true})
                    this.handlEditableStateOnDoubleClick({isEditable: false})
                  }
                }}
                onMouseOver={() => {
                  if(this.state.isMouseUp) return
                  if(this.state.isDragging){
                    this.handleMouseHover(row, index)
                  }
                }}
                onMouseUp={() => {
                  this.handleSelecting({isSelecting: false})
                  this.handleDragging({isDragging: false})
                }}
              > 
                { 
                  this.isLastItem(row, index) && !this.state.isMouseUp && !isEditable
                  ? <div 
                      contentEditable={false}
                      className="absolute -bottom-1 -right-1 z-[1] h-2 w-2 rounded-full border border-sky-500 bg-sky-500 hover:cursor-crosshair"
                      onMouseOver={() => {
                        this.handleHighlighting({isHighlighting: true})
                      }}
                      onMouseLeave={() => {
                        this.handleHighlighting({isHighlighting: false})
                        this.handleCopying({isCopying: false})
                      }}
                      onMouseDown={(e) => {
                        this.handleSetRowsAndColumns(this.getRowsAndColumsInitialState())
                        this.handleSelecting({isSelecting: true})
                        this.handleCopyOnMouseDown()
                        e.preventDefault()
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
                <div
                  ref={ref}
                  key={'cell-' + key + '-' + this.getColumnKeyNumber(index) + '-editor'}
                  contentEditable={isEditable}
                  className={'py-[6px] px-[2px] w-full ' + (this.isColumnSelected(row, index) && isEditable ? 'bg-white border-[2px] border-sky-400 outline-none rounded-sm focus:cursor-text ' : '') + (this.isColumnSelected(row, index) ? 'py-[4px]' : '') + (!isEditable || this.isColumnSelected(row, index) ? ' select-none' : '')}
                  suppressContentEditableWarning={true}
                  onBlur={(e) => {
                    console.log(this.divElementRef?.current)
                    this.handleContentChange((e.target as HTMLDivElement).innerText.replace('&nbsp;', '').trimStart())
                    this.handlEditableStateOnDoubleClick({isEditable: false})
                  }}
                  onMouseDown={() => {
                    if(!this.isColumnSelected(row, index)){
                      this.handlEditableStateOnDoubleClick({isEditable: false})
                      handleCellMouseDown(index)
                    }
                  }}
                  onDoubleClick={() => {
                    this.handlEditableStateOnDoubleClick({isEditable: true})
                  }}
                >
                  {(() => {
                    if(!isEditable || !ref?.current?.innerText.trimStart()) return <>&nbsp;</>
                    return <>{this.state.value}</>
                  })()}
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