export type tableContextType = {
  isHeaderMenuToggled: Boolean,
  isRowColumnMenuToggled: Boolean,
  isHeaderMenuIconVisible: Boolean,
  isRowColumnMenuIconVisible: Boolean,
  headerItemSelected: number,
  columnItemSelected: number,
  tableRowSelected: number,
  tableItemMenuShow: Boolean,
  tableItemSelected: number,
  isTableItemMenuToggled: Boolean,
  currentColumnSelected: number,
  currentRowSelected: number,

  columnTypeSelected: number,
  tableData: any

  handleHeaderMouseLeave: VoidFunction,
  handleRowColumnMouseLeave: VoidFunction,
  handleHeaderItemSelect: Function,
  handleRowColumnItemSelect: Function,
  handleHeaderToggleMenu: VoidFunction,
  handleRowColumnToggleMenu: VoidFunction,
  handleRowColumnItemSelectOnMouseOver: VoidFunction,
  handleTableItemSelect: Function,
  handleTableItemToggle: VoidFunction,
  handleTableItemMenuShow: VoidFunction,
  handleRowColumnSelection: Function,

  handleColumnTypeSelection: Function
}