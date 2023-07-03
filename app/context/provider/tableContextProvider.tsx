import { useState } from "react"

import { TableContext } from "@/app/context/table-context"
import { rowData } from '@/utils/template/column-data';

export const TableContextProvider = ({children}: {children: React.ReactNode}) => {
  // column heading state
  const [isHeaderMenuToggled, setHeaderMenuToggle] = useState<Boolean>(false)
  const [isRowColumnMenuToggled, setRowColumnMenuToggled] = useState<Boolean>(false)

  const [isHeaderMenuIconVisible, setHeaderMenuIconVisible] = useState<Boolean>(false)
  const [headerItemSelected, setHeaderItemSelected] = useState<number>(-1)

  // column data state
  const [isRowColumnMenuIconVisible, setRowColumnMenuIconVisible] = useState<Boolean>(false)
  const [columnItemSelected, setColumnItemSelected] = useState<number>(-1)
  const [currentColumnSelected, setCurrentColumnSelected] = useState<number>(-1)
  const [currentRowSelected, setCurrentRowSelected] = useState<number>(-1)
  const [tableRowSelected, setTableSelected] = useState<number>(-1)

  const [tableItemMenuShow, setTableItemMenuShow] = useState<Boolean>(false)
  const [tableItemSelected, setTableItemSelected] = useState<number>(0)
  const [isTableItemMenuToggled, setTableItemMenuToggled] = useState<Boolean>(false)

  const [columnTypeSelected, setColumnTypeSelected] = useState<number>(0)

  const [tableData, setTableData] = useState<any>(rowData)

  const [isFocused, setFocused] = useState<boolean>(false)
  
  // column header functions
  const handleHeaderToggleMenu = () => {
    if(isHeaderMenuToggled) {
      setHeaderMenuToggle(false)
      setHeaderMenuIconVisible(false)
      return
    }
    if(isRowColumnMenuToggled){
      setRowColumnMenuToggled(false)
      setRowColumnMenuIconVisible(false)
      setColumnItemSelected(-1)
    }
    setHeaderMenuToggle(!isHeaderMenuToggled)
  }

  const handleHeaderMouseLeave = () => {
    if(isHeaderMenuToggled) return
    setHeaderMenuIconVisible(false)
  }

  const handleHeaderItemSelect = (index: number) => {
    if(isHeaderMenuToggled) return
    setHeaderItemSelected(index)
    setHeaderMenuIconVisible(true)
  }

  // column data functions
  const handleRowColumnToggleMenu = () => {
    if(isRowColumnMenuToggled) {
      setRowColumnMenuToggled(false)
      setRowColumnMenuIconVisible(false)
      return
    }
    if(isHeaderMenuToggled) {
      setHeaderMenuToggle(false)
      setHeaderMenuIconVisible(false)
      setHeaderItemSelected(-1)
    }
    setRowColumnMenuToggled(!isRowColumnMenuToggled)
  }

  const handleRowColumnMouseLeave = () => {
    if(isRowColumnMenuToggled) return
    setRowColumnMenuIconVisible(false)
  }

  const handleRowColumnItemSelect = (i: number, row: number) => {
    // console.log('index -', i, columnItemSelected, ', -- ', row, setTableSelected)
    if(isRowColumnMenuToggled) return
    setColumnItemSelected(i)
    setTableSelected(row)
    setRowColumnMenuIconVisible(true)
    // console.log(i, columnItemSelected, ', -- ', row, setTableSelected)
  }

  const handleRowColumnItemSelectOnMouseOver = () => {
    setRowColumnMenuIconVisible(false)
  }

  const handleTableItemMenuShow = () => {
    setTableItemMenuShow(false)
  }

  const handleTableItemSelect = (index: number) => {
    setTableItemSelected(index)
    setTableItemMenuShow(true)
  }

  const handleTableItemToggle = () => {
    setTableItemMenuToggled(!isTableItemMenuToggled)
    setTableItemMenuShow(false)
  }

  const handleColumnTypeSelection = (type: number) => {
    setColumnTypeSelected(type)
  }

  const handleRowColumnSelection = (index: number, row: number) => {
    setCurrentColumnSelected(index)
    setCurrentRowSelected(row)
  }

  const handleCellValueUpdate = (
    {row, index, value}:
    {row: number, index: number, value: string}
  ) => {
    const { columnData } = tableData[row]

    const updatedColumnData = {...columnData[index], cellValue: value}
    columnData.splice(index, 1)
    columnData.splice(index, 0, updatedColumnData)
    const updatedTableData = [...tableData];

    setTableData(updatedTableData);
  }

  const handleColumnFocused = (focused: boolean) => {
    setFocused(focused)
  }


  const contextValue = {
    // context states
    // column header states
    isHeaderMenuToggled,
    isHeaderMenuIconVisible,
    headerItemSelected,
    // column data states
    isRowColumnMenuToggled,
    isRowColumnMenuIconVisible,
    columnItemSelected,
    tableRowSelected,
    tableItemMenuShow,
    tableItemSelected,
    isTableItemMenuToggled,
    currentColumnSelected,
    currentRowSelected,

    columnTypeSelected,
    tableData,
    isFocused,

    // context functions
    // column header functions
    handleHeaderMouseLeave,
    handleHeaderItemSelect,
    handleHeaderToggleMenu,
    // column data functions
    handleRowColumnMouseLeave,
    handleRowColumnItemSelect,
    handleRowColumnToggleMenu,
    handleRowColumnItemSelectOnMouseOver,
    handleTableItemSelect,
    handleTableItemToggle,
    handleTableItemMenuShow,
    handleRowColumnSelection,

    handleColumnTypeSelection,
    handleCellValueUpdate,
    handleColumnFocused
  }
  
  return(
    <TableContext.Provider value={contextValue}>
      {children}
    </TableContext.Provider>
  )
}