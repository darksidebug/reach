import { useRef, useState, useLayoutEffect, useEffect } from "react";

const textArea = ({textValue}: {textValue: any}) => {
  const ref = useRef<HTMLTextAreaElement>();
  const [value, setValue] = useState('');
  useEffect(() => {
    console.log(textValue)
    setValue(textValue)
  }, [])

  // This only tracks the auto-sized height so we can tell if the user has manually resized
  const autoHeight = useRef();

  useLayoutEffect(() => {
    if (!ref.current) {
      return;
    }

    if (
      autoHeight.current !== undefined && //@ts-ignore
      ref.current.style.height !== autoHeight.current
    ) {
      // don't auto size if the user has manually changed the height
      return;
    }
    //@ts-ignore
    ref.current.style.height = "auto";//@ts-ignore
    ref.current.style.overflow = "hidden";//@ts-ignore
    ref.current.style.resize = 'none';//@ts-ignore
    ref.current.style.minWidth = '100%';//@ts-ignore
    const next = `${ref.current.scrollHeight}px`;//@ts-ignore
    ref.current.style.height = next;//@ts-ignore
    autoHeight.current = next;//@ts-ignore
    ref.current.style.overflow = "auto";
  }, [value, ref, autoHeight]);


  return (
    <textarea
      // ref={ref}
      style={{
        resize: 'vertical',
        minHeight: '1em',
      }}
      value={value}
      className="border-none resize-none"
      onChange={event => setValue(event.target.value)}
    />
  );
}

export const TextArea = textArea