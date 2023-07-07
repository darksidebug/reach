import React, {useEffect, useState} from 'react';

import { TableData } from '@/app/components/common/table/table-data';
import { TableHeading } from '@/app/components/common/table/table-heading';

import { columnHeader } from "@/utils/template/column-header"

import { useTableContext } from '@/app/context/table-context';
import { TableCell } from '../common/table/table-cell';

import TableClass from '@/utils/classes/table';

export function table() {
  const { tableData } = useTableContext()
  const table = new TableClass()

  const [headers, setHeaders] = useState<string[]>(table.header)
  
  return(
    <table className='w-full'>
      <thead className='bg-slate-200/80'>
        <tr>
          <th 
            className='w-[20px] border-r border-slate-300 bg-slate-200'
          />
          { 
            table.enableCheckboxAfterRowNumbering 
            ? (
                <th 
                  className='w-[40px] border-r border-slate-300'
                >
                  <input type="checkbox" name="" id="" />
                </th>
              )
            : null
          }
          
          {
            headers.map((item: any, index: number) => {
              return (
                <TableHeading 
                  key={item + index} 
                  header={item}
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
        <tr key={'row-' + 0} className='font-semibold'>
          <td className='px-[5px] h-full min-w-[20px] max-w-[30px] bg-slate-100 border-r border-t border-slate-300 text-[10px] font-bold text-center cursor-pointer'>
            {(1)}
          </td>
          {
            table.enableCheckboxAfterRowNumbering 
            ? (
                <th 
                  className='px-3.5 h-full w-[40px] border-r border-t border-slate-300'
                >
                  <input type="checkbox" name="" id="" />
                </th>
              )
            : null
          }
          {
          headers.map((item: any, index: number) => {
            return(
              <TableData 
                key={'row-' + 0 + '-cell-' + index} 
                data={{id: 0, text: columnHeader[index]?.header ?? ''}}
                item={{
                  index: index,
                  row: 0,
                  totalRows: tableData?.length,
                  hasCellIcon: true,
                  hasRowMenu: true,
                  hasColumnMenu: false
                }}
              />
            )
          })
        }
        </tr>
        
        {
          tableData.map((rowItem: any, row: number) => {
            return(
              <tr key={'row-' + rowItem?.id + 1}>
                <td className='px-[5px] h-full min-w-[20px] max-w-[30px] bg-slate-100 border-r border-t border-slate-300 text-[10px] font-bold text-center cursor-pointer'>
                  {(row + 2)}
                </td>
                {
                  table.enableCheckboxAfterRowNumbering 
                  ? (
                      <th 
                        className='px-3.5 h-full w-[40px] border-r border-t border-slate-300'
                      >
                        <input type="checkbox" name="" id="" />
                      </th>
                    )
                  : null
                }

                {//
                  headers.map((item: any, index: number) => {
                    return(
                      <TableData 
                        key={'row-' + rowItem?.id + 1 + '-cell-' + index} 
                        data={{id: rowItem?.id + 1, text: ''}}
                        item={{
                          index: index,
                          row: row,
                          totalRows: headers?.length,
                          hasCellIcon: true,
                          hasRowMenu: true,
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