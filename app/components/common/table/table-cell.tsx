import React from 'react';

import { CellProps } from '@/types/column-data';

const props = {
  isFocused: false,
  isHovered: false,
  isSelected: false,
  isIconVisible: false,
  isHighLighted: false,
  value: '' || 0 || false,
  textAlign: '',
  type: {
    checkbox: false,
    switch: false,
    dropdown: false,
    dropdownMenus: {
      id: -1,
      value: ''
    },
  },
  format: '',
  cellIndex: -1
}

const tableCell = ({
  isFocused = false,
  isHovered = false,
  isSelected = false,
  isIconVisible = false,
  isHighLighted = false,
  value = '' || 0 || false,
  textAlign = '',
  type = {
    checkbox: false,
    switch: false,
    dropdown: false,
    dropdownMenus: {
      id: -1,
      value: ''
    },
  },
  format = '',
  cellIndex = -1
}: CellProps) => {
  return(
    <td
      id={"table-data-" + props.cellIndex }
      className={'relative min-w-[80px] w-auto p-[2px] border border-slate-300 last:border-r-0 text-xs text-left text-slate-700 cursor-text'}
    >

    </td>
  )
}

export const TableCell = React.memo(tableCell)