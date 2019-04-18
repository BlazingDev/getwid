import Inspector from './inspector';
import classnames from 'classnames';

import { isEqual } from 'lodash';

import './editor.scss';

const { compose } = wp.compose;
const { Component, Fragment } = wp.element;
const { RichText, withColors } = wp.editor;

class Edit extends Component {

	constructor() {
		super(...arguments);

		this.startCounter = this.startCounter.bind(this);
		this.getNumerals = this.getNumerals.bind(this);
		this.getEasingFunction = this.getEasingFunction.bind(this);

		this.state = {
			didInput: false,
			isVisible: false,
		}
	}

	render() {
		const {
			attributes: {
				title,
				prefix,
				suffix,

				customTextColor
			},

			clientId,
			className,

			textColor,
			setAttributes,

		} = this.props;

		const baseClass = 'wp-block-getwid-counter';

		const wrapperProps = {
			className: classnames(`${baseClass}__number`,
				{
					'has-text-color': textColor.color,
					[textColor.class]: textColor.class,
				}),
			style: {
				color: (typeof this.props.attributes.textColor != 'undefined'
					&& typeof this.props.attributes.textColor.class == 'undefined') ?
					this.props.textColor.color : (customTextColor ? customTextColor : undefined),
			}
		}

		console.log('here');

		/* #region move later to 'help-functions.js' */
		let classNames = '';
		if (/\s/.test(className)) {
			const array = className.split(' ').slice(1);
			classNames = array.length > 1 ? ' ' + array.toString().replace(/\,/g, ' ') : ' ' + array.toString();
		}
		/* #endregion */

		return (
			<Fragment>
				<Inspector {...this.props} />
				<div className={classnames(`${baseClass + classNames}`)} >
					<div className={`${baseClass}__wrapper ${clientId}`}>

						<RichText
							tagName='p'
							className={`${baseClass}__title`}
							placeholder={__('Title', 'getwid')}
							value={title ? title : ''}
							onChange={title => setAttributes({ title })}
							keepPlaceholderOnFocus={true}
							multiline={false}
						/>

						<div className={`${baseClass}__number-wrapper`}>

							<RichText
								tagName='p'
								className={`${baseClass}__prefix`}
								placeholder={__('Prefix', 'getwid')}
								value={prefix ? prefix : ''}
								onChange={prefix => setAttributes({ prefix })}
								keepPlaceholderOnFocus={true}
								multiline={false}
							/>

							<span {...wrapperProps} >0</span>

							<RichText
								tagName='p'
								className={`${baseClass}__suffix`}
								placeholder={__('Suffix', 'getwid')}
								value={suffix ? suffix : ''}
								onChange={suffix => setAttributes({ suffix })}
								keepPlaceholderOnFocus={true}
								multiline={false}
							/>
						</div>
					</div>
				</div>
			</Fragment>
		);
	}

	getEasingFunction() {
		const {
			attributes: {
				easing,
				useEasing
			}
		} = this.props;

		if ($.parseJSON(useEasing)) {
			switch (easing) {
				case 'outExpo':
					return (t, b, c, d) => {
						return c * (-Math.pow(2, -10 * t / d) + 1) * 1024 / 1023 + b;
					};
				case 'outQuintic':
					return (t, b, c, d) => {
						let ts = (t /= d) * t;
						let tc = ts * t;
						return b + c * (tc * ts + -5 * ts * ts + 10 * tc + -10 * ts + 5 * t);
					}
				case 'outCubic':
					return (t, b, c, d) => {
						let ts = (t /= d) * t;
						let tc = ts * t;
						return b + c * (tc + -3 * ts + 3 * t);
					}
			}
		} else {
			return null;
		}
	}

	getNumerals() {
		const { attributes: { numerals } } = this.props;
		switch (numerals) {
			case 'eastern_arabic':
				return ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
			case 'farsi':
				return ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
			default:
				return null;
		}
	}

	startCounter() {

		const {
			attributes: {
				start,
				end,
				decimalPlaces,
				duration,
				useEasing,
				useGrouping,

				separator,
				decimal,
			},
			className,
			clientId
		} = this.props;

		const $id = $(`.${clientId}`);
		const $counter = $id.find(`.${className}__number`);

		const options = {
			startVal: parseFloat(start),
			decimalPlaces: parseInt(decimalPlaces),
			duration: parseInt(duration),

			useEasing: $.parseJSON(useEasing),
			useGrouping: $.parseJSON(useGrouping),
			separator: separator,
			decimal: decimal,

			easingFn: this.getEasingFunction(),
			numerals: this.getNumerals()
		}

		new CountUp($counter.get(0), parseFloat(end), options).start();
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevProps.isSelected === this.props.isSelected) {
			const {
				attributes: {
					title,
					prefix,
					suffix,

				},
				textColor
			} = this.props;

			if (!isEqual(prevProps.attributes.title, title) || !isEqual(prevProps.attributes.prefix, prefix) || !isEqual(prevProps.attributes.suffix, suffix)) {
				return;
			}

			if (!isEqual(prevProps.textColor, textColor) || !isEqual(prevProps.textColor.color, textColor.color)) {
				return;
			}

			this.startCounter();
		}
	}

	componentDidMount() {
		const { isVisible } = this.state;

		const {
			isInViewport,
			scrollHandler,
			clientId,
			className

		} = this.props;

		const $id = $(`.${clientId}`);
		const $counter = $id.find(`.${className}__number`);

		const root = '.edit-post-layout__content';

		if (!isVisible) {
			if (isInViewport($counter)) {
				this.setState({ isVisible: true });
				this.startCounter();
			} else {
				scrollHandler(root, $counter, () => {
					this.setState({ isVisible: true });
					this.startCounter();
				});
			}
		}
	}
}

export default compose([
	withColors({ textColor: 'color' }),
])(Edit);