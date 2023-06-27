export interface TableDataProps {
  data: {
    id: number,
    text: string
  },
  item: {
    index: number,
    row: number,
    totalRows: number
    hasCellIcon: Boolean,
    hasRowMenu: Boolean,
    hasColumnMenu: Boolean
  }, 
  columnKey: any
}