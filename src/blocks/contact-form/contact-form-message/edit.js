/**
* External dependencies
*/
import { __ } from 'wp.i18n';

/**
* WordPress dependencies
*/
const {
	TextareaControl,
	ToggleControl
} = wp.components;

const {
	Fragment,
	Component
} = wp.element;

/**
* Create an Component
*/
class Edit extends Component {

	constructor() {
		super(...arguments);
	}

	render() {

		const {
			attributes: {
				required,
				label,
				placehoder
			},

			isSelected,

			baseClass,
			className,
			setAttributes

		} = this.props;

		const _required = required == 'true' ? true : false;

		return (
			<Fragment>
				<div className={`${className}`}>
					<div className={`${baseClass}__label-wrapper`}>
						<textarea
							className={`${baseClass}__label`}
							placeholder={__('Message', 'getwid')}
							value={label ? label : ''}
							onChange={event => {
								setAttributes({ label: event.target.value });
							}}
						> </textarea>

						{ isSelected && (
							<ToggleControl
								label={__('Required', 'getwid')}
								className={`${baseClass}__required`}
								checked={_required}
								onChange={value => {
									setAttributes({ required: value ? 'true' : 'false' });
								}}
							/>
						) }
						{ ! isSelected && _required && (
							<span className={'required'}>{__('(required)', 'getwid')}</span>
						)}
					</div>

					<TextareaControl
						className={`${baseClass}__textarea`}
						value={placehoder ? placehoder : ''}
						onChange={value => {
							setAttributes({ placehoder: value });
						}}
					/>
				</div>
			</Fragment>
		);
	}
}

export default (Edit);
