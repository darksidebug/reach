export default function saveTool() {
  return(
    <div className='flex gap-1 w-[36px] py-0.5 mr-3 border-r border-slate-200'>
      <button 
        className='flex items-center justify-center h-5 w-6 bg-slate-100 border border-slate-300 rounded-sm cursor-pointer'
        onClick={() => {}}
      >
        <svg className='h-3.5' xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path fill='currentColor' d="M48 96V416c0 8.8 7.2 16 16 16H384c8.8 0 16-7.2 16-16V170.5c0-4.2-1.7-8.3-4.7-11.3l33.9-33.9c12 12 18.7 28.3 18.7 45.3V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96C0 60.7 28.7 32 64 32H309.5c17 0 33.3 6.7 45.3 18.7l74.5 74.5-33.9 33.9L320.8 84.7c-.3-.3-.5-.5-.8-.8V184c0 13.3-10.7 24-24 24H104c-13.3 0-24-10.7-24-24V80H64c-8.8 0-16 7.2-16 16zm80-16v80H272V80H128zm32 240a64 64 0 1 1 128 0 64 64 0 1 1 -128 0z"/></svg>
      </button>
    </div>
  )
}