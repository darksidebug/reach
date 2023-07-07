import { createElement } from "react"

export const CellCheckbox = ({wrapper, isVisible}: {wrapper: string, isVisible: boolean}) => {
  return(
    createElement(
      wrapper, { },
      isVisible && createElement(
        'div', {className: 'input-checkbox--wrapper'},
        createElement(
          'input',
          { 
            type: 'checkbox',
            onChange: () => {}
          }
        )
      )
    )
  )
}