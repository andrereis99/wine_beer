/* eslint-disable eqeqeq */
/*
*
* BottleForm
*
*/

import React from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { push } from "connected-react-router";
import NumberFormat from "react-number-format";
import Dropzone from "react-dropzone";
import Compressor from "compressorjs";
import { Row, Col, Input, Button, Select } from "antd";
import { Icon } from "../../components";
import { setTitle, setBottles } from "../../store/actions";
import { toast, translate } from "../../utils/utils";
import Strings from '../../utils/strings';

import placeholder from "../../assets/images/placeholder.jpg";

import './styles.scss';
import { reduceEachTrailingCommentRange } from 'typescript';

const { Option } = Select;

export class BottleForm extends React.Component<any, any> {
	constructor(props: any) {
		super(props);

		this.state = {
			hasUnsavedFields: false,
		};
	}

    componentDidMount() {
        const { bottles, bottleType, dispatch, match } = this.props;

		if (match.params.id) {
			dispatch(setTitle(Strings.bottleForm.editBottle));

			const bottle = bottles.find((elem: any) => elem.id == match.params.id);
	
			this.setState({ bottle })
		} else {
			this.setState({ bottle: { type: bottleType } })
			dispatch(setTitle(Strings.bottleForm.addBottle));
		}
    }

	getBase64 = (file: any) => {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => resolve(reader.result);
			reader.onerror = (error) => reject(error);
		});
	}
	
	onDrop = (files: any) => {
		try {
			const file = files[files.length - 1];
		
			new Compressor(file, {
				quality: 0.9,
				maxWidth: 400,
				mimeType: "image/png",
				success: (result: any) => {
					this.getBase64(result).then((res) => {
						this.setState((state: any) => ({
							bottle: {
								...state.bottle,
								image: res,
							},
							hasUnsavedFields: true,
						}))
					});
				},
			});
		} catch (err) {
			toast.error(Strings.errors.notSupportedFile);
		}
	}

	isValidBottle = () => {
		const { bottle } = this.state;
		if (bottle.brand && bottle.name && bottle.type && bottle.price) {
			return true;
		} else {
			toast.error(Strings.generic.fillRequiredFields);
			return false;
		}
	}

	pushBottleToList = () => {
		const { bottle } = this.state;
		const { bottles, dispatch, match } = this.props;
		if (match.params.id) {
			const index = bottles.findIndex((elem: any) => elem.id == match.params.id);
			
			if (index !== -1) {
				bottles.splice(index, 1, bottle)
			} else {
				bottles.push(bottle);
			}
		} else {
			bottles.push(bottle);
		}

		dispatch(setBottles(bottles))
		dispatch(push('/'))
	}
	
	onAddBottle = () => {
		const { bottle } = this.state;
		const { bottles } = this.props;

		if (bottle.id) this.pushBottleToList();

		for (let i = 1; i <= bottles.length+1; i++) {
			if(!bottles.find((elem: any) => elem.id === i)) {
				bottle.id = i;
				this.setState({ bottle }, () => this.pushBottleToList());
			}
		}
	}
	
	onDeleteBottle = () => {
		const { bottle } = this.state;
		const { bottles, dispatch, match } = this.props;

		if (bottle.id) {
			const index = bottles.findIndex((elem: any) => elem.id == match.params.id);
			
			if (index !== -1) {
				bottles.splice(index, 1)
				dispatch(setBottles(bottles))
				dispatch(push('/'))
			}
		}
	}

	render() {
		const { bottle } = this.state;
		const { language, dispatch, match } = this.props;

		return (
			<React.Fragment>
				<Helmet>
					<title>{match.params.id ? Strings.bottleForm.editBottle : Strings.bottleForm.addBottle}</title>
					<meta name="form" content="Bottle Form" />
				</Helmet>
				{/* Header with back button and delete/save buttons */}
				<div className="Bottle_Header">
					<div className="Bottle_Header_BackPath" onClick={() => dispatch(push('/'))}>
						<Icon name="back" />
						<span>{Strings.listOfBottles.header}</span>
					</div>
					<div>
						{match.params.id ? <Button style={{ marginRight: 5 }} onClick={this.onDeleteBottle} type="dashed">
							{Strings.bottleForm.delete}
						</Button> : null}
						<Button onClick={this.onAddBottle} type="primary">
							{Strings.generic.save}
						</Button>
					</div>
				</div>
				<div className="ContentContainer">
					<Row gutter={12}>
						<Col xs={24} md={12}>
							<label className="SingleLabel __required">{Strings.bottleForm.brand}</label>
							<Input
								placeholder={Strings.bottleForm.brand}
								defaultValue={bottle?.brand}
								value={bottle?.brand}
								onChange={e => {
									this.setState({
										bottle: {
											...bottle,
											brand: e.target.value,
										},
										hasUnsavedFields: true,
									});
								}}
							/>
							<label className="SingleLabel __required">{Strings.bottleForm.name}</label>
							<Input
								placeholder={Strings.bottleForm.name}
								defaultValue={bottle?.name}
								value={bottle?.name}
								onChange={e => {
									this.setState({
										bottle: {
											...bottle,
											name: e.target.value,
										},
										hasUnsavedFields: true,
									});
								}}
							/>
							<label className="SingleLabel __required">{Strings.bottleForm.type}</label>
							<Select
								allowClear
								placeholder={Strings.bottleForm.type}
								optionFilterProp="children"
								onChange={(type: any) =>
									this.setState({
										bottle: {
											...bottle,
											type: type,
										},
										hasUnsavedFields: true,
									})
								}
								style={{ width: "100%" }}
								filterOption={(input: any, option: any) =>
									option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
								}
								value={bottle?.type}
								>
									<Option key="wine" value="wine">{Strings.generic.wine}</Option>
									<Option key="beer" value="beer">{Strings.generic.beer}</Option>
							</Select>
							<label className="SingleLabel __required">{Strings.bottleForm.price}</label>
							<NumberFormat
								key="bottle_price_input"
								className="inputClass ant-input"
								value={bottle?.price}
								placeholder={Strings.bottleForm.price}
								style={{ textAlign: "right" }}
								thousandSeparator
								maxNumber
								suffix="€"
								onValueChange={(valueFloat: any) => {
									if (
									Number(valueFloat.floatValue) >= 0 &&
									Number(valueFloat.floatValue) <= 100
									)
									this.setState({
										bottle: {
											...bottle,
											price: valueFloat.floatValue,
										},
										hasUnsavedFields: true,
									});
								}}
								decimalScale={2}
								fixedDecimalScale
							/>
							<label className="SingleLabel">{Strings.bottleForm.promoPrice}</label>
							<NumberFormat
								key="bottle_promoPrice_input"
								className="inputClass ant-input"
								value={bottle?.promoPrice}
								placeholder={Strings.bottleForm.promoPrice}
								style={{ textAlign: "right" }}
								thousandSeparator
								maxNumber
								suffix="€"
								onValueChange={(valueFloat: any) => {
									if (
									Number(valueFloat.floatValue) >= 0 &&
									Number(valueFloat.floatValue) <= 100
									)
									this.setState({
										bottle: {
											...bottle,
											promoPrice: valueFloat.floatValue,
										},
										hasUnsavedFields: true,
									});
								}}
								decimalScale={2}
								fixedDecimalScale
							/>
						</Col>
						<Col xs={24} md={12}>
							<div className="ImageContainer">
								<div className="Image">
									<img
										alt={Strings.bottleForm.image}
										src={bottle?.image || placeholder}
									/>
									<div className="ImageOverlay">
										<Dropzone
											accept="image/jpg, image/jpeg, image/png"
											className="ImageOverlayOption"
											onDrop={(file: any) => this.onDrop(file)}
											>
											<Icon name="pencil" />
										</Dropzone>
										<div
											className={`ImageOverlayOption${
												Boolean(bottle?.image) ? "" : " __disabled"
											}`}
											onClick={()=> this.setState({
												bottle: {
													...bottle,
													image: null,
												},
												hasUnsavedFields: true,
											})}
											>
											<Icon name="trash" />
										</div>
									</div>
								</div>
							</div>
						</Col>
					</Row>
					<label className="SingleLabel">
						{Strings.bottleForm.description}
					</label>
					<label className="SingleLabel SecondaryLabel">
						{Strings.bottleForm.languageChangeAlert}
					</label>
					<Input.TextArea
						placeholder={Strings.bottleForm.description}
						defaultValue={bottle?.description?.[language]}
						value={bottle?.description?.[language]}
						style={{ height: 100 }}
						onChange={(e) => {
							this.setState({
								bottle: {
									...bottle,
									description: {
										...bottle?.description,
										[language]: e.target.value
									},
								},
								hasUnsavedFields: true,
							});
						}}
					/>
				</div>
			</React.Fragment>
		);
	}
}

const mapStateToProps = (state: any) => ({
	bottles: state.bottles,
	language: state.language || 'pt',
	bottleType: state.router?.location?.state?.bottleType
});

export default connect(mapStateToProps)(BottleForm);