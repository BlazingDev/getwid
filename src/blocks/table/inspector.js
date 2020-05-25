/**
 * External dependencies
 */
import { __ } from 'wp.i18n';
import { isEqual } from 'lodash';

/**
* Internal dependencies
*/
import GetwidCustomColorPalette from 'GetwidControls/custom-color-palette';
import { renderBorderSettingPanel, oneOfBorder } from 'GetwidUtils/render-inspector';

/**
* WordPress dependencies
*/
const { Component } = wp.element;
const { InspectorControls } = wp.blockEditor || wp.editor;
const { PanelBody, ToggleControl, RangeControl, SelectControl } = wp.components;

/**
* Create an Component
*/
class Inspector extends Component {
	constructor(props) {
		super(...arguments);
	}

	render() {
		const { head, foot, hasFixedLayout, tableCollapsed } = this.props.attributes;
		const { setAttributes, getCellStyle, toggleSection, updateCellsStyles, getSelectedCell } = this.props;
		const { isRangeSelected, isMultiSelected } = this.props;

		const selectedCell = getSelectedCell();
		const styles = selectedCell ? selectedCell.styles : undefined;

		const borderColor = selectedCell
			? selectedCell.cellBorderColor
				? !isEqual( selectedCell.cellBorderColor, '#000' )
					? selectedCell.cellBorderColor
					: undefined
				: undefined
			: undefined;

		const horizontalAlign = getCellStyle( 'textAlign' )
			? getCellStyle( 'textAlign' )
			: 'default';

		const verticalAlign = getCellStyle( 'verticalAlign' )
			? getCellStyle( 'verticalAlign' )
			: 'default';

		return (
			<InspectorControls>
				<PanelBody title={ __( 'Table Settings', 'getwid' ) }>
					<ToggleControl
						label={__( 'Fixed width table cells', 'getwid' )}
						checked={hasFixedLayout}
						onChange={() => setAttributes({ hasFixedLayout: !hasFixedLayout })}
					/>
					<ToggleControl
						label={__( 'Table header', 'getwid' )}
						checked={!!head.length}
						onChange={() => toggleSection( 'head' )}
					/>
					<ToggleControl
						label={__( 'Table footer', 'getwid' )}
						checked={!!foot.length}
						onChange={() => toggleSection( 'foot' )}
					/>
					<ToggleControl
						label={ __( 'Border collapsed', 'getwid' ) }
						checked={tableCollapsed}
						onChange={() => setAttributes({ tableCollapsed: !tableCollapsed })}
					/>
				</PanelBody>

				{ (selectedCell || isRangeSelected() || isMultiSelected()) && (
					<>
						<GetwidCustomColorPalette
							colorSettings={[
								{
									title: __( 'Background Color', 'getwid' ),
									colors: {
										customColor : getCellStyle( 'backgroundColor' )
									},
									changeColor: value => updateCellsStyles({ backgroundColor: value })
								},
								{
									title: __( 'Text Color', 'getwid' ),
									colors: {
										customColor : getCellStyle( 'color' )
									},
									changeColor: value => updateCellsStyles({ color: value })
								}
							]}
						/>

						{ renderBorderSettingPanel( this ) }

						{ oneOfBorder( styles ) && (
							<>
								<SelectControl
									label={__( 'Border Style', 'getwid' )}
									value={getCellStyle( 'borderStyle' )}
									options={ [
										{ label: __( 'Solid' , 'getwid' ), value: 'solid'  },
										{ label: __( 'Dashed', 'getwid' ), value: 'dashed' },
										{ label: __( 'Dotted', 'getwid' ), value: 'dotted' }
									] }
									onChange={value => updateCellsStyles({ borderStyle: value })}
								/>,
								<RangeControl
									label={__( 'Border width', 'getwid' )}
									value={getCellStyle( 'borderWidth' ) || 0}
									min={0}
									max={10}
									onChange={value => updateCellsStyles({ borderWidth: value })}
								/>,
								<GetwidCustomColorPalette
									colorSettings={[
										{
											title: __( 'Border Color', 'getwid' ),
											colors: {
												customColor: borderColor
											},
											changeColor: value => updateCellsStyles({ borderColor: value
												? value
												: selectedCell
													&& styles
													&& !styles.borderTopColor
													&& !styles.borderRightColor
													&& !styles.borderBottomColor
													&& !styles.borderLeftColor
														? undefined
														: '#000'
											})
										}
									]}
								/>
							</>
						)},
						<RangeControl
							label={ __( 'Padding Top', 'getwid' ) }
							value={ getCellStyle( 'paddingTop' ) || 0 }
							min={ 0 }
							max={ 100 }
							onChange={ value => updateCellsStyles({ paddingTop: value }) }
						/>,
						<RangeControl
							label={ __( 'Padding Right', 'getwid' ) }
							value={ getCellStyle( 'paddingRight' ) || 0 }
							min={ 0 }
							max={ 100 }
							onChange={ value => updateCellsStyles({ paddingRight: value }) }
						/>,
						<RangeControl
							label={ __( 'Padding Bottom', 'getwid' ) }
							value={ getCellStyle( 'paddingBottom' ) || 0 }
							min={ 0 }
							max={ 100 }
							onChange={ value => updateCellsStyles({ paddingBottom: value }) }
						/>,
						<RangeControl
							label={ __( 'Padding Left', 'getwid' ) }
							value={ getCellStyle( 'paddingLeft' ) || 0 }
							min={ 0 }
							max={ 100 }
							onChange={ value => updateCellsStyles({ paddingLeft: value }) }
						/>,
						<SelectControl
							label={ __( 'Horizontal Align', 'getwid' ) }
							value={ horizontalAlign }
							options={ [
								{ label: __( 'Align Left'   , 'getwid' ), value: 'left'    },
								{ label: __( 'Align Center' , 'getwid' ), value: 'center'  },
								{ label: __( 'Align Right'  , 'getwid' ), value: 'right'   },
								{ label: __( 'Align Justify', 'getwid' ), value: 'justify' },
								{ label: __( 'Default'      , 'getwid' ), value: 'default' }
							] }
							onChange={ value => updateCellsStyles({ textAlign: value }) }
						/>,
						<SelectControl
							label={__( 'Vertical Align', 'getwid' )}
							value={ verticalAlign }
							options={ [
								{ label: __( 'Align Top'   , 'getwid' ), value: 'top'     },
								{ label: __( 'Align Middle', 'getwid' ), value: 'middle'  },
								{ label: __( 'Align Bottom', 'getwid' ), value: 'bottom'  },
								{ label: __( 'Default'     , 'getwid' ), value: 'default' }
							] }
							onChange={ value => updateCellsStyles({ verticalAlign: value }) }
						/>
					</>
				)}
			</InspectorControls>
		);
	}
}

export default Inspector;