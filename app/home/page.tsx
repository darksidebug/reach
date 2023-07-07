'use client'

import { Metadata } from 'next'
import dynamic from 'next/dynamic'

import { TableContextProvider } from '@/app/context/provider/tableContextProvider'
import ReactAwesomeSpreadsheet from '@/react-awesome-spreadsheet/src'
import ReactSpreadSheetGridView from '@/react-awesome-spreadsheet/src/view'

const TestCaseTableDefault = dynamic(() => import('@/app/components/table-template/default'))

export const metadata: Metadata = {
  title: 'Reach - Home',
}

// add format cell menu


export default function Home() {
  let columns: any = [],
        rows: any = []

  

  const props = {
    enableColumnCheckbox: true,
    data: {
      headers: ['Test Case ID', 'Function', 'Role', 'Page URL', 'Scenario', 'Steps', 'Expectation', 'Result', 'Remarks'],
      headerStyle: {
        paddingTop: '15px',
        paddingBottom: '15px' ,
        fontWeight: '600'
      },
      rows: rows,
    //   columnStyle: {
    //     font: ''
    //   }
    }
  }

  const log = (param: any) => {
    columns = []

    if(props?.data?.rows?.length === 0){
      columns.push({...param?.column})
      rows.push({
        id: param?.rowIndex,
        columns: [...columns]
      })
      console.log('asdfds', rows)
      return
    }

    rows.filter((row: any) => {
      if(row?.id === param?.rowIndex){
        if(row?.columns[param?.columnIndex]){
          row.columns[param?.columnIndex] = param?.column
        } else{
          row.columns.splice(param?.columnIndex, 0, {...param?.column})
        }
      } else{
        rows.push({
          id: param?.rowIndex,
          columns: [{...param?.column}]
        })
      }
    })
    console.log('asdfds', rows)
  }

  return (
    <div className='p-6 h-[100vh] w-full bg-slate-50'>
      {
        /* uncomment this for old UI design and functionality 
        * this part is experimental
        */
      }
      
      {/* <TableContextProvider>
        <TestCaseTableDefault />
      </TableContextProvider> */}

      <ReactAwesomeSpreadsheet>
        <ReactSpreadSheetGridView 
          data={props.data}
          onCellContentUpdate={(param: any) => log(param)}
        />
      </ReactAwesomeSpreadsheet>
    </div>
  )
}
