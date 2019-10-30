/**
* Internal dependencies
*/
import edit from './edit';
import './style.scss'


/**
* External dependencies
*/
import { __ } from 'wp.i18n';
const {jQuery: $} = window;

const { registerBlockType } = wp.blocks;
const { InnerBlocks } = wp.blockEditor;

/**
* Register the block
*/
registerBlockType( 'getwid/template-post-meta', {
	title: __( 'Meta', 'getwid' ),
	icon: 'tagcloud',
	category: ( Getwid.settings.post_type == Getwid.templates.name ? 'getwid-post-blocks' : 'getwid-blocks' ),
	keywords: [ ],
	supports: {
		inserter: ( Getwid.settings.post_type == Getwid.templates.name ? true : false ) //Show Only on Templates page
	},
	edit,
	save: () => {
		return <InnerBlocks.Content/>;
	}
});