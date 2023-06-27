'use client'

import { Metadata } from 'next'
import dynamic from 'next/dynamic'

import { TableContextProvider } from '@/app/context/provider/tableContextProvider'

const TestCaseTableDefault = dynamic(() => import('@/app/components/table-template/default'))

export const metadata: Metadata = {
  title: 'Reach - Home',
}

export default function Home() {
  return (
    <div className='p-6 h-[100vh] w-full bg-slate-50'>
      <TableContextProvider>
        <TestCaseTableDefault />
      </TableContextProvider>
    </div>
  )
}
