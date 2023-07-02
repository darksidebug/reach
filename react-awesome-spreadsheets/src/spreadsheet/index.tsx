import App from 'next/app'
import React from 'react'

class ReactAwesomeSpreadSheet extends App {
  constructor (props: any) {
    super(props)
    this.state = {
      data: [],
      sheets: []
    }
  }

  componentDidMount(): void {
    // set the state
    // set context provider
  }

  render(): JSX.Element {

    const children: React.ReactNode = this.props.children

    return (
      <div
        className='min-w-[960px] text-slate-700 bg-white border border-slate-300 rounded'
      >
        { children }
      </div>
    )
  }
}

export default ReactAwesomeSpreadSheet