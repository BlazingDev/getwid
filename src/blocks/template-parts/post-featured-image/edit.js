/**
* External dependencies
*/
import Inspector from './inspector';
import './editor.scss';
import classnames from "classnames";


/**
* WordPress dependencies
*/
const {
	Component,
	Fragment,
} = wp.element;
const {
	ServerSideRender,
	Disabled,
	Dashicon
} = wp.components;
import { __ } from 'wp.i18n';
const {
	BlockAlignmentToolbar,
	BlockControls,
} = wp.editor;
const {
	select,
} = wp.data;

/**
* Create an Component
*/
class Edit extends Component {
	constructor() {
		super( ...arguments );		
	}

	render() {
		const {
			attributes: {
				align
			},
			className,
			setAttributes,
		} = this.props;

		const current_post_type = select("core/editor").getCurrentPostType();

		const wrapperclass = classnames(
			className,
			align ? `align${ align }` : null,
		);

		if (current_post_type && current_post_type == Getwid.templates.name){
			return (
				<Fragment>
					<Inspector {...{
						...this.props,
					}} key='inspector'/>
					<BlockControls>
						<BlockAlignmentToolbar
							value={ align }
							controls= {[ 'wide', 'full', 'left', 'center', 'right' ]}
							onChange={ ( nextAlign ) => {
								setAttributes( { align: nextAlign } );
							} }
						/>					
					</BlockControls>
	
					<div className={wrapperclass}>		
						<div className="components-placeholder editor-media-placeholder">
							<div className="components-placeholder__label">
								<Dashicon icon="format-image" />
							</div>
							<div className="components-placeholder__instructions">{__('Post Featured Image', 'getwid')}</div>
						</div>
					</div>
	
				</Fragment>
			);			
		} else {
			return (
				<Fragment>
					<Disabled>
						<ServerSideRender
							block="getwid/template-post-featured-image"
							attributes={this.props.attributes}
						/>
					</Disabled>
				</Fragment>
			);
		}

	}
}

export default ( Edit );