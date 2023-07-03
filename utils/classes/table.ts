import {createElement} from 'react'

class Table{
  
  header = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
  minRowCount = 15
  minColumnCount = this.header?.length
  enableRowNumbering = false
  enableCheckboxAfterRowNumbering = false
  allowInsertNewColumn = false
  columnCountInserted = -1

  enableRowNumber() {
    this.enableRowNumbering = !this.enableRowNumbering
  }

  enableCheckboxAfterRowNumber() {
    this.enableCheckboxAfterRowNumbering = !this.enableCheckboxAfterRowNumber
  }

  insertNewColumn() {
    this.allowInsertNewColumn = true
  }

  setTableColumn() {
    if(this.allowInsertNewColumn){
      this.header.push(this.header[this.columnCountInserted] + this.header[this.columnCountInserted + 1])
    }
  }

  createRow() {
    // createElement
  }
  
}

export default Table