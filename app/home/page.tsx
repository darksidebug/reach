'use client'

import { Metadata } from 'next'
import dynamic from 'next/dynamic'

import { TableContextProvider } from '@/app/context/provider/tableContextProvider'
import ReactAwesomeSpreadSheet from '@/react-awesome-spreadsheets/src/spreadsheet'
import ReactAwesomeSpreadSheetGrid from '@/react-awesome-spreadsheets/src/spreadsheet/table'

const TestCaseTableDefault = dynamic(() => import('@/app/components/table-template/default'))

export const metadata: Metadata = {
  title: 'Reach - Home',
}

// add format cell menu


export default function Home() {
  const value: any = []
  const log = (param: any) => {
    console.log('asdfds ===>>', param)
    value.push({
      column: {
        id: 1,
        value: param
      }
    })
    console.log('asdfds', value)
  }

  const props = {
    enableColumnCheckbox: true,
    data: {
      headers: ['Test Case ID', 'Function', 'Role', 'Page URL', 'Scenario', 'Steps', 'Expectation', 'Result', 'Remarks'],
      headerStyle: 'py-[15px] text-center font-semibold bg-slate-200/50',
      rows: value,
    //   columnStyle: {
    //     font: ''
    //   }
    }
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

      {/* comment this if you want the old UI to display */}
      <ReactAwesomeSpreadSheet>
        <ReactAwesomeSpreadSheetGrid 
          {...props}
          onContentChange={(param: any) => log(param)}
        />
      </ReactAwesomeSpreadSheet>
    </div>
  )
}
