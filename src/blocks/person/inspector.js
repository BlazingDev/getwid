import {times} from 'lodash';
// Setup the block
const {__} = wp.i18n;
const {Component} = wp.element;

const {
	InspectorControls,
} = wp.editor;

const {
	PanelBody,
	SelectControl,
	ToggleControl
} = wp.components;

/**
 * Create an Inspector Controls wrapper Component
 */
export default class Inspector extends Component {

	getImageCropHelp( checked ) {
		return checked ? __( 'Thumbnails are cropped to align.', 'getwid' ) : __( 'Thumbnails are not cropped.', 'getwid' );
	}	

	render() {

		const {
			attributes: {
				imageSize,
				imageCrop
			},
			setAttributes,
			changeImageSize,
			imgObj
		} = this.props;

		const onChangeImageSize = (imageSize) => {

			if (typeof imgObj != 'undefined'){
				setAttributes( {
					imageSize
				} );
				changeImageSize(imgObj, imageSize);
			} else {
				alert(__('For self-hosted images only', 'getwid'));
			}

		};

		// options={times(items.length, (n) => ({value: n, label: n + 1}) )}
		return (
			<InspectorControls>
				<PanelBody
					title={__('Settings', 'getwid')}
				>
					<SelectControl
						label={__('Image Size', 'getwid')}
						help={__('For self-hosted images only', 'getwid')}
						value={imageSize}
						onChange={onChangeImageSize}
						options={Getwid.settings.image_sizes}
					/>

					<ToggleControl
						label={ __( 'Crop Images', 'getwid' ) }
						checked={ imageCrop }
						onChange={ () => {
							setAttributes( { imageCrop: !imageCrop } );
						}}						
						help={ this.getImageCropHelp }
					/>					
				</PanelBody>
			</InspectorControls>
		);
	}

}