export default function importTool() {
  return(
    <div className='flex gap-1 w-[36px] py-0.5 mr-3 border-r-0 border-slate-200'>
      <button 
        className='flex items-center justify-center h-5 w-6 bg-slate-100 border border-slate-300 rounded-sm cursor-pointer'
        onClick={() => {}}
      >
        <svg className='h-3' xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><path fill='currentColor' d="M64 464c-8.8 0-16-7.2-16-16V64c0-8.8 7.2-16 16-16H224v80c0 17.7 14.3 32 32 32h80V448c0 8.8-7.2 16-16 16H64zM64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V154.5c0-17-6.7-33.3-18.7-45.3L274.7 18.7C262.7 6.7 246.5 0 229.5 0H64zm56 256c-13.3 0-24 10.7-24 24s10.7 24 24 24H264c13.3 0 24-10.7 24-24s-10.7-24-24-24H120zm0 96c-13.3 0-24 10.7-24 24s10.7 24 24 24H264c13.3 0 24-10.7 24-24s-10.7-24-24-24H120z"/></svg>
      </button>
    </div>
  )
}