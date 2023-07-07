import App from 'next/app'

import Wrapper from './spreadsheet/wrapper'

class NextAwesomeSpreadsheet extends App {
  constructor(props: any) {
    super(props)
    this.state = {}
  }

  render(): JSX.Element {
    return (
      <Wrapper>
        {this.props.children}
      </Wrapper>
    )
  }
}

export default NextAwesomeSpreadsheet