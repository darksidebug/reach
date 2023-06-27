import React from 'react';

import { TableData } from '@/components/common/table/table-data';
import { TableHeading } from '@/components/common/table/table-heading';

import { columnHeader } from "@/utils/template/column-header"

import { useTableContext } from '@/context/table-context';

export function table() {
  const { tableData } = useTableContext()
  return(
    <table className='w-full'>
      <thead className='bg-slate-200/80'>
        <tr>
          <th 
            className='w-[20px] border-r border-slate-300'
          ></th>
          <th 
            className='w-[40px] border-r border-slate-300'
          >
            <input type="checkbox" name="" id="" />
          </th>
          {
            columnHeader.map((item: any, index: number) => {
              return (
                <TableHeading 
                  key={item?.header + index} 
                  header={item?.header}
                  item={{
                    index: index,
                    hasCellIcon: item?.hasIcon,
                    hasRowMenu: item?.hasRowMenu,
                    hasColumnMenu: true
                  }}
                />
              )
            })
          }
        </tr>
      </thead>
      <tbody>
        {
          tableData.map((rowItem: any, row: number) => {
            return(
              <tr key={rowItem?.id}>
                <td className='px-[5px] h-full min-w-[20px] max-w-[30px] bg-slate-100 border-r border-t border-slate-300 text-[10px] font-bold text-center cursor-pointer'>
                  {(row + 1)}
                </td>
                <td className='px-3.5 h-full w-[40px] border-r border-t border-slate-300'>
                  <input type="checkbox" name="" id="" />
                </td>
                {
                  rowItem?.columnData.map((item: any, index: number) => {
                    return(
                      <TableData 
                        key={item?.cellValue + index} 
                        text={item?.cellValue}
                        item={{
                          index: index,
                          row: row,
                          totalRows: tableData?.length,
                          hasCellIcon: item?.hasIcon,
                          hasRowMenu: item?.hasRowMenu,
                          hasColumnMenu: false
                        }}
                      />
                    )
                  })
                }
              </tr>
            )
          })
        }
      </tbody>
    </table>
  )
}

export const Table = React.memo(table)