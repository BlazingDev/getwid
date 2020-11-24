/**
* WordPress dependencies
*/
import { __ } from 'wp.i18n';
const {jQuery: $} = window;
const {
	Component,
} = wp.element;
const {
	PanelColorSettings,
	InspectorControls,
} = wp.blockEditor || wp.editor;
const {
	PanelBody,
} = wp.components;


/**
* Create an Inspector Controls
*/
export default class Inspector extends Component {

	constructor() {
		super(...arguments);
	}

	render() {
		const {
			backgroundColor,
			setBackgroundColor,
			
			textColor,
			setTextColor,
		} = this.props;
		
		return (
			<InspectorControls>
				<PanelBody title={ __('Settings', 'getwid') }>
					<PanelColorSettings
						title={__('Colors', 'getwid')}
						colorSettings={[
							{
								value: textColor.color,
								onChange: setTextColor,
								label: __('Text Color', 'getwid')
							},
							{
								value: backgroundColor.color,
								onChange: setBackgroundColor,
								label: __('Background Color', 'getwid')
							},
						]}
					/>	
				</PanelBody>
			</InspectorControls>
		);
	}
}