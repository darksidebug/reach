export default function addColumnTool() {
  return (
    <div className='flex gap-1 ml-3 w-[120px] py-0.5 border-r border-slate-200'>
      <button className='relative pl-4 h-5 w-6 bg-slate-100 border border-slate-300 rounded-sm after:absolute after:w-[2px] after:h-2 after:bg-slate-700 after:left-[4px] after:top-[5px] after:rounded-sm cursor-pointer'>
        <svg className='absolute bottom-[3.5px] left-[8px] h-3' xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path fill='currentColor' d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></svg>
      </button>
      <button className='flex items-center justify-center relative pl-4 h-5 w-6 bg-slate-100 border border-slate-300 rounded-sm cursor-pointer'>
        <svg className='absolute top-[3px] left-[6px] h-3' xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path fill='currentColor' d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"/></svg>
      </button>
      <button className='flex items-center justify-center relative pl-4 h-5 w-6 bg-slate-100 border border-slate-300 rounded-sm cursor-pointer'>
        <svg className='absolute top-[3px] left-[6px] h-3' xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path fill='currentColor' d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></svg>
      </button>
      <button className='relative pl-4 h-5 w-6 bg-slate-100 border border-slate-300 rounded-sm after:absolute after:w-[2px] after:h-2 after:bg-slate-700 after:right-[4px] after:top-[5px] after:rounded-sm cursor-pointer'>
        <svg className='absolute bottom-[3.5px] left-[4px] h-3' xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path fill='currentColor' d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"/></svg>
      </button>
    </div>
  )
}