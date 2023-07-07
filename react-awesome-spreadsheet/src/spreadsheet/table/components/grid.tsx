import App from "next/app";
import { JSX, createElement } from "react";

class TableGrid extends App {
  constructor(props: any) {
    super(props)
    this.state = {} 
  }

  render(): JSX.Element {
    return(
      createElement(
        'table', {className: 'table'},
        this.props.children
      )
    )
  }
}

export default TableGrid;