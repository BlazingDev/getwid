/**
* WordPress dependencies
*/
import { __ } from 'wp.i18n';
const {
	Component,
	Fragment,
} = wp.element;
const {
	InspectorControls,
} = wp.editor;
const {
	SelectControl,
	PanelBody,
	RangeControl,
	ToggleControl,
} = wp.components;


/**
* Module Constants
*/
const MAX_POSTS_COLUMNS = 6;


/**
* Create an Inspector Controls
*/
export default class Inspector extends Component {

	constructor() {
		super(...arguments);
	}

	render() {
		const {
			attributes: {
				headerTag
			},
			setAttributes,
			changeState,
			getState,
		} = this.props;
		
		return (
			<InspectorControls>
				<PanelBody title={ __('Settings', 'getwid') }>
					<SelectControl
						label={__('Title Tag', 'getwid')}
						value={headerTag}
						options={[
							{value: 'span', label: __('Paragraph', 'getwid')},
							{value: 'h2', label: __('Heading 2', 'getwid')},
							{value: 'h3', label: __('Heading 3', 'getwid')},
							{value: 'h4', label: __('Heading 4', 'getwid')},
							{value: 'h5', label: __('Heading 5', 'getwid')},
							{value: 'h6', label: __('Heading 6', 'getwid')},
						]}
						onChange={headerTag => setAttributes({headerTag})}
					/>	
				</PanelBody>
			</InspectorControls>
		);
	}
}