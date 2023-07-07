import App from "next/app";
import { createElement } from "react";

class Wrapper extends App {
  constructor(props: any) {
    super(props)
    this.state = {}
  }

  render(): JSX.Element {
    const children: React.ReactNode = this.props.children

    return createElement(
      'div',
      {
        // className: 'min-w-[960px] text-slate-700 bg-white border border-slate-300 rounded'
      },
      children
    );
  }
}

export default Wrapper;