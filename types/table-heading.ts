export interface TableHeadingProps{
  header: String, 
  item: {
    index: number,
    hasCellIcon: Boolean,
    hasRowMenu: Boolean,
    hasColumnMenu: Boolean
  }
}