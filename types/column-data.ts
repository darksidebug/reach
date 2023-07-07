export interface ColumnData{
  cellValue: string,
  isDraggable: boolean,
  isResizeable: boolean,
  canRowSpan: boolean,
  canColumnSpan: boolean,
  hasRowMenu: boolean,
  hasColumnMenu: boolean,
  hasColumnSort: boolean,
  hasIcon: boolean
}

export interface TableRowData{
  id: number,
  columnData: Array<ColumnData>
}

export interface RowData{
  rowData: Array<TableRowData>
}

export interface CellProps {
  isFocused: boolean,
  isHovered: boolean,
  isSelected: boolean,
  isIconVisible: boolean,
  isHighLighted: boolean,
  value: string | number | boolean,
  textAlign: string,
  type: {
    checkbox: boolean,
    switch: boolean,
    dropdown: boolean,
    dropdownMenus: {
      id: number,
      value: string
    },
  },
  format: string,
  cellIndex: number
}