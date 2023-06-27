import { useContext, createContext, useMemo } from "react"

import { tableContextType } from "@/types/table"

const tableContextDefaultValues: tableContextType = {
  isHeaderMenuToggled: false,
  isRowColumnMenuToggled: false,
  isHeaderMenuIconVisible: false,
  isRowColumnMenuIconVisible: false,
  headerItemSelected: -1,
  columnItemSelected: -1,
  tableRowSelected: -1,
  tableItemMenuShow: false,
  tableItemSelected: -1,
  isTableItemMenuToggled: false,
  currentColumnSelected: 0,
  currentRowSelected: 0,

  columnTypeSelected: 0,
  tableData: [],

  handleHeaderMouseLeave: () => {},
  handleRowColumnMouseLeave: () => {},
  handleHeaderItemSelect: (index: number) => {},
  handleRowColumnItemSelect: (index: number, row: number) => {},
  handleHeaderToggleMenu: () => {},
  handleRowColumnToggleMenu: () => {},
  handleRowColumnItemSelectOnMouseOver: () => {},
  handleTableItemSelect: (index: number) => {},
  handleTableItemToggle: () => {},
  handleTableItemMenuShow: () => {},
  handleRowColumnSelection: () => {},

  handleColumnTypeSelection: (type: number) => {},
  handleCellValueUpdate: ({row, index, value}: {row: number, index: number, value: string}) => {}
};


export const TableContext = createContext<tableContextType>(tableContextDefaultValues)

export const useTableContext = () => {
  return useContext(TableContext)
}