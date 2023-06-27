export default function downloadTool() {
  return(
    <div className='flex gap-1 w-[36px] py-0.5 mr-3 border-r border-slate-200'>
      <button 
        className='flex items-center justify-center h-5 w-6 bg-slate-100 border border-slate-300 rounded-sm cursor-pointer'
        onClick={() => {}}
      >
        <svg className='h-3 w-3 rotate-90' xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path fill='currentColor' d="M352 96l64 0c17.7 0 32 14.3 32 32l0 256c0 17.7-14.3 32-32 32l-64 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l64 0c53 0 96-43 96-96l0-256c0-53-43-96-96-96l-64 0c-17.7 0-32 14.3-32 32s14.3 32 32 32zm-9.4 182.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L242.7 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l210.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128z"/></svg>
      </button>
    </div>
  )
}