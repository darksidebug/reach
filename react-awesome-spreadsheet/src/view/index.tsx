import React, { JSX, createElement } from 'react';

import { IRowsSelected } from "@/react-awesome-spreadsheet/types";

import ReactSpreadSheetGrid from '@/react-awesome-spreadsheet/src/spreadsheet';
import TableGrid from '../spreadsheet/components/table';
import { GridHeader } from '../spreadsheet/components/header';
import { GridRow } from '../spreadsheet/components/row';
import { GridColumnHeader } from '../spreadsheet/components/column';
import { CellCheckbox } from '../spreadsheet/components/cell-checkbox';
import { GridBody } from '../spreadsheet/components/body';
import { GridCell } from '../spreadsheet/components/cell';

class ReactSpreadSheetGridView extends ReactSpreadSheetGrid {
  
  render(): JSX.Element {

    const { 
      header, isCellFocused, isSelecting, 
      isDragging, currentRow, currentColumn 
    } = this.state

    const { data } = this.props

    return (
      createElement(
        'div', {className: 'table--wrapper'},
        <TableGrid>
          <GridHeader>
            <GridRow>
              {(() => {
                return(
                  createElement(
                    'th', { key: 'th-0A' }
                  )
                )
              })()}
              <CellCheckbox 
                wrapper={'th'} 
                isVisible={!data?.headers?.length} 
              />
              {
                header.map((item: string, index: number) => {
                  return (
                    <GridColumnHeader 
                      key        = { 'th-' + item } 
                      isSelected = { currentColumn === index } 
                    >
                      { item }
                    </GridColumnHeader>
                  )
                })
              }
            </GridRow>
          </GridHeader>
          <GridBody>
            {
              header.map((item: string, row: number) => {
                if(row < 20){
                  return(
                    <GridRow key={'tr-' + item + '-' + row} className="p-2">
                      {(() => {
                        return(
                          createElement(
                            'td',
                            { className: `${currentRow === row ? 'isSelected' : ''}` },
                            row + 1
                          )
                        )
                      })()}
                      <CellCheckbox 
                        wrapper   = { 'td' } 
                        isVisible = { true } 
                      />
                      {
                        header.map((item: string, index: number) => {
                          return(
                            <GridCell 
                              key          = { 'td-' + item + '-' + index } 
                              id           = { `td-${row}-${item}-${index}` }
                              className    = { this.handleGetHeaderCellStyle(row, index) }
                              cellStyle    = {{
                                isSelected     : this.handleGetCellFocusedState(row, index),
                                isHighlighted  : this.isGridCellSelected(row, index),
                                isLastCellItem : false,
                                isSingleRow    : false
                              }}
                              
                              isFocused    = { isCellFocused && row === currentRow && index === currentColumn }
                              hasCellValue = { this.handleGetCellData(row, index) }

                              onSelect = {() => {
                                this.handleRowSelect({
                                  id     : `td-${row}-${item}-${index}`,
                                  row    : row,
                                  column : index
                                })
                                this.handleSetState({
                                  currentRow    : row,
                                  currentColumn : index,
                                  rowCounter    : 0,
                                  columnCounter : 0,
                                  isSelecting   : true,
                                })
                              }}
                              onCellFocus  = {(value: boolean) => this.handleSetState({ isCellFocused: value })}
                              onFocusLeave = {() => {
                                this.handleCellUpdateOnFocusLeave('td', row, index)
                              }}
                              onDrag = {() => {
                                if(isSelecting){
                                  this.handleSetState({isDragging: true})
                                }
                              }}
                              onHover = {() => {
                                if(isDragging){
                                  this.handleMouseHover(row, index)
                                }
                              }}
                              onMouseUp = {() => this.handleSetState({ isDragging: false, isSelecting: false })}
                            >
                              { this.handleGetCellData(row, index) }
                            </GridCell>
                          )
                        })
                      }
                    </GridRow>
                  )
                }
              })
            }
          </GridBody>
        </TableGrid>
      )
    )
  }
}

export default ReactSpreadSheetGridView