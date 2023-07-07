export interface IStateGridProps {
  data                   : IDataPropeties,
  useCustomHeader?       : boolean,
  customHeader?          : Array<object | any>,
  useColumnNumbering?    : boolean,
  enableColumnCheckbox?  : boolean,
  useCustomMinRowLimit?  : boolean,
  customMinimumRowLimit? : number,
  onCellContentUpdate    : Function
}

export interface IClassGridState {
  header             : Array<string>
  rowsSelected       : IRowsSelected[],
  currentRowSelected : ICurrentRow,
  currentRow         : number,
  currentColumn      : number,
  isCellFocused      : boolean,
  minimumRowLimit    : number,
  isSelecting        : boolean,
  isDragging         : boolean,
  isHighlighting     : boolean,
  isCopying          : boolean,
  columnCounter      : number,
  rowCounter         : number
}

export interface IDataPropeties{
  headers?     : Array<string>,
  headerStyle? : object,
  rows?        : IDataRowPropeties[],
}

export interface IDataRowPropeties{
  columns      : IDataColumnsPropeties[],
  columnStyle? : string
}

export interface IDataColumnsPropeties{
  id    : number,
  value : any
}

export interface IRowsSelected{
  row    : number,
  column : Array<number>
}

export interface  ICurrentRow{
  id     : string,
  row    : number,
  column : number
}