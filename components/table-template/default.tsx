import dynamic from 'next/dynamic';
import { useState } from 'react';

import { VerticalMenu } from "@/components/common/vertical-menu";
import { Table } from '@/components/table-template/table';
import { rowData } from '@/utils/template/column-data';

const TextAlignTool = dynamic(() => import('@/components/common/header-tools/text-align-tool'));
const AddColumnTool = dynamic(() => import('@/components/common/header-tools/add-column-tool'));
const AddRowTool = dynamic(() => import('@/components/common/header-tools/add-row-tool'));
const SortContentTool = dynamic(() => import('@/components/common/header-tools/sort-tool'));
const SaveTool = dynamic(() => import('@/components/common/header-tools/save-tool'));
const ClipboardTool = dynamic(() => import('@/components/common/header-tools/clipboard-tool'));
const UndoRedoTool = dynamic(() => import('@/components/common/header-tools/undo-redo-tool'));
const FillColorTool = dynamic(() => import('@/components/common/header-tools/fill-color-tool'));
const DownloadTool = dynamic(() => import('@/components/common/header-tools/download-tool'));
const PrintTool = dynamic(() => import('@/components/common/header-tools/print-tool'));
const CopyToTableTool = dynamic(() => import('@/components/common/header-tools/copy-to-table-tool'));
const ImportTool = dynamic(() => import('@/components/common/header-tools/import-tool'));

import { useTableContext } from '@/context/table-context';

export default function testCaseTableDefault() {

  // TODO: 
  /*
  * multiple cell selection
  * merging cell based on content
  * do not show menu merge cells if there is no cells selected to be merged
  */

  const [isFocused, setFocused] = useState(false)

  const {
    tableItemSelected,
    isTableItemMenuToggled,
    handleTableItemSelect,
    tableItemMenuShow,
    handleTableItemMenuShow,
    isRowColumnMenuIconVisible,
    isHeaderMenuIconVisible,
    currentColumnSelected,
    currentRowSelected
  } = useTableContext()
  
  return(
    <div className='min-w-[calc(100vw-3rem)] text-slate-700 bg-white border border-slate-300 rounded overflow-hidden'>
      <div className='px-2.5'>
        <div className="flex items-center justify-between pt-1 pb-0.5 border-b-none border-slate-200">
          <div className='flex'>
            <TextAlignTool />
            <AddColumnTool />
            <AddRowTool />
            <SortContentTool />
          </div>
          <div className='flex items-center gap-1 pb-0.5 pt-1.5'>
            <button className='flex items-center px-3 py-1.5 text-[10px] text-white font-semibold border border-gray-600 bg-gray-500 rounded cursor-pointer'>
              Create ticket
            </button>
            <button className='flex items-center px-3 py-1.5 text-[10px] text-white font-semibold border border-sky-400 bg-sky-400 rounded cursor-pointer'>
              Generate Report
            </button>
          </div>
        </div>
      </div>
      <div className='px-2.5'>
        <div className='flex items-center justify-between w-full pt-0.5 pb-2 border-b border-slate-200'>
          <div className='flex items-center'>
            <SaveTool />
            <ClipboardTool />
            <CopyToTableTool />
            <UndoRedoTool />
            <FillColorTool />
            <DownloadTool />
            <PrintTool />
            <ImportTool />
          </div>
          <div className='flex items-center justify-end'>
            <div className='flex items-center mt-1'>
              <span className='w-[105px] text-[10px] font-semibold'>People with access: </span>
              <div className="flex items-center relative z-[1] min-w-[55px]">
                <div className='absolute left-0 z-[1] h-5 w-5 bg-slate-100 border-2 border-slate-300 rounded-full' />
                <div className='absolute left-[10px] z-[2] h-5 w-5 bg-slate-200 border-2 border-slate-300 rounded-full' />
                <div className='absolute left-[20px] z-[2] h-5 w-5 bg-slate-300 border-2 border-slate-400 rounded-full' />
                <div className='flex items-center justify-center absolute left-[30px] z-[2] h-5 w-5 bg-white border-2 border-slate-400 text-[9px] font-bold rounded-full cursor-default'>
                  <span className='mt-[1px]'>+3</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className='flex items-center justify-between py-1 border-b border-slate-300'>
        <div className='flex items-center p-2'>
          <div className='flex items-center gap-1.5 py-0.5 pr-3.5 border-r border-slate-300'>
            <button className='flex items-center w-[100px] py-1.5 px-2 bg-green-100 border border-green-300 text-[10px] font-semibold rounded cursor-pointer'>
              <div className='flex items-center justify-center h-3 w-3 mr-2 border-[1.5px] border-slate-600 rounded-full'>
                <svg className='h-2' xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path fill='currentColor' d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/></svg>
              </div>
              Create table
            </button>
            <button className='flex items-center w-[80px] py-1.5 px-2 bg-orange-100 border border-orange-200 text-[10px] font-semibold rounded cursor-pointer'>
              <div className='flex items-center justify-center h-3 w-3 mr-2 border-[1.5px] border-slate-600 rounded-full'>
                <svg className='h-2' xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path fill='currentColor' d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z"/></svg>
              </div>
              Remove
            </button>
            <button className='flex items-center w-[70px] py-1.5 px-2 bg-red-100 border border-red-200 text-[10px] font-semibold rounded cursor-pointer'>
              <div className='flex items-center justify-center h-3 w-3 mr-2 border-[1.5px] border-slate-600 rounded-full'>
                <svg className='h-2 ml-[1px]' xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path fill='currentColor' d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>
              </div>
              Delete
            </button>
          </div>
          <button className='flex items-center gap-2 ml-3 mr-1 py-1.5 pl-2 pr-2.5 text-[10px] border border-blue-500 text-blue-500 font-semibold rounded cursor-pointer'>
            <svg className='h-3 mb-[1px]' xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path fill='currentColor' d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg>
            Select all
          </button>
          <button className='flex items-center gap-2 mx-0.5 py-1.5 pl-2 pr-2.5 text-[10px] border border-green-600 text-green-600 font-semibold rounded cursor-pointer'>
            <svg className='h-3 mb-[1px]' xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><path fill='currentColor' d="M48 448V64c0-8.8 7.2-16 16-16H224v80c0 17.7 14.3 32 32 32h80V448c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16zM64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V154.5c0-17-6.7-33.3-18.7-45.3L274.7 18.7C262.7 6.7 246.5 0 229.5 0H64zm90.9 233.3c-8.1-10.5-23.2-12.3-33.7-4.2s-12.3 23.2-4.2 33.7L161.6 320l-44.5 57.3c-8.1 10.5-6.3 25.5 4.2 33.7s25.5 6.3 33.7-4.2L192 359.1l37.1 47.6c8.1 10.5 23.2 12.3 33.7 4.2s12.3-23.2 4.2-33.7L222.4 320l44.5-57.3c8.1-10.5 6.3-25.5-4.2-33.7s-25.5-6.3-33.7 4.2L192 280.9l-37.1-47.6z"/></svg>
            Excel export
          </button>
        </div>
        
        <div className='flex items-center justify-end gap-1 p-2.5 text-[10px] font-semibold'>
          <div className='flex items-center gap-1 py-1 px-2 mr-4 border border-slate-400 bg-white rounded'>
            <svg className='h-3' xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path fill='currentColor' d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/></svg>
            <input className='px-1 py-0.5 border-none outline-none' type="text" placeholder='Filter ...' />
          </div>
          <button className='flex items-center py-1.5 px-2 min-w-[97px] w-[97px] bg-indigo-50 border border-indigo-300 rounded cursor-pointer'>
            <svg className='h-[10px] mr-2' xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path fill='currentColor' d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/></svg>
            Collaborator
          </button>
          <button className='flex items-center py-1.5 px-2 min-w-[85px] w-[85px] bg-gray-100 border border-gray-400 rounded cursor-pointer'>
            <svg className='h-[10px] mr-2' xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 640 512"><path fill='currentColor' d="M579.8 267.7c56.5-56.5 56.5-148 0-204.5c-50-50-128.8-56.5-186.3-15.4l-1.6 1.1c-14.4 10.3-17.7 30.3-7.4 44.6s30.3 17.7 44.6 7.4l1.6-1.1c32.1-22.9 76-19.3 103.8 8.6c31.5 31.5 31.5 82.5 0 114L422.3 334.8c-31.5 31.5-82.5 31.5-114 0c-27.9-27.9-31.5-71.8-8.6-103.8l1.1-1.6c10.3-14.4 6.9-34.4-7.4-44.6s-34.4-6.9-44.6 7.4l-1.1 1.6C206.5 251.2 213 330 263 380c56.5 56.5 148 56.5 204.5 0L579.8 267.7zM60.2 244.3c-56.5 56.5-56.5 148 0 204.5c50 50 128.8 56.5 186.3 15.4l1.6-1.1c14.4-10.3 17.7-30.3 7.4-44.6s-30.3-17.7-44.6-7.4l-1.6 1.1c-32.1 22.9-76 19.3-103.8-8.6C74 372 74 321 105.5 289.5L217.7 177.2c31.5-31.5 82.5-31.5 114 0c27.9 27.9 31.5 71.8 8.6 103.9l-1.1 1.6c-10.3 14.4-6.9 34.4 7.4 44.6s34.4 6.9 44.6-7.4l1.1-1.6C433.5 260.8 427 182 377 132c-56.5-56.5-148-56.5-204.5 0L60.2 244.3z"/></svg>
            Copy link
          </button>
        </div>
      </div>
      <div className='min-w-[960px] max-h-[600px] overflow-auto'>
        {
          [1].map((index: number) => {
            return <Table key={index} />
          })
        }
      </div>
      <div className='h-9 border-t-0 border-slate-300 bg-white'>
        <div className="flex h-full bg-white">
          <div className='flex items-center justify-center h-9 w-[49px] bg-slate-200 border-r border-t border-slate-300'>
            <button>
              <svg className='h-3.5' xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path fill='currentColor' d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"/></svg>
            </button>
          </div>
          <div 
            className='relative p-[2px] bg-white border-r border-t border-slate-300'
            onMouseOver={() => {
              if(isRowColumnMenuIconVisible || isFocused || isHeaderMenuIconVisible) return
              handleTableItemSelect(0)
            }}
            onMouseLeave={() => {
              if(isTableItemMenuToggled) return
              handleTableItemMenuShow()
            }}
          >
            <div 
              contentEditable={true}
              className={'h-full min-w-[150px] py-2 px-1.5 text-xs font-semibold' + (isFocused && tableItemSelected === 0 ? ' outline-2 outline-sky-300' : '')}
              onMouseDown={() => {
                handleTableItemMenuShow()
                setFocused(true)
              }}
              onBlur={() => setFocused(false)}
              onKeyDown={(e) => {
                if(e.key === "Enter") return e.preventDefault()
              }}
              suppressContentEditableWarning={true}
            >
              Test Case Name
            </div>
            {(() => {
              if(tableItemMenuShow && tableItemSelected === 0 || isTableItemMenuToggled){
                return(
                    <div 
                      className='absolute top-1 right-1 font-normal text-slate-70'
                    >
                      <VerticalMenu
                        type={3}
                      >
                        <div className='absolute bottom-[23px]'>
                          <div className='flex items-center px-2 py-1.5 w-[120px] bg-white text-xs text-red-400 border border-slate-300 rounded shadow-sm cursor-pointer'>
                            <svg className='h-4 w-4 mr-2 p-[2px] bg-red-100 border border-red-200 rounded-full' xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><path fill='currentColor' d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>
                            Delete table
                          </div>
                        </div>
                      </VerticalMenu>
                    </div>
                  )
                }
            })()}
          </div>
          <div className='flex items-center justify-between w-full bg-slate-100 border-t border-slate-300'>
            <div className='flex items-center justify-center pr-1 py-1.5 text-sm text-slate-700'>
              <button className='border-r border-slate-300 mr-3 px-1 py-3 bg-slate-200'>
                <svg className='h-3' xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path fill='currentColor' d="M470.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 256 265.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160zm-352 160l160-160c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L210.7 256 73.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0z"/></svg>
              </button>
              <button className='flex items-center justify-center h-5 w-5 mr-3 bg-slate-50 hover:bg-slate-200 border border-slate-400 rounded-full cursor-pointer'>
                <svg className='h-3 w-3' xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path fill='currentColor' d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/></svg>
              </button>
            </div>
            <div className='flex items-center justify-end gap-3 pr-3 text-[10px] font-semibold'>
              <span className='mr-3'>Number of table(s): <span>{1}</span></span>
              <span className='mr-3'>Total rows: <span>{rowData?.length}</span></span>
              <span>Row: <span>{(currentRowSelected + 1)}</span></span>
              <span>Column: <span>{(currentColumnSelected + 1)}</span></span>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  )
}