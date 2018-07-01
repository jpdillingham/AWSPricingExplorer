import React, { Component } from 'react';
import { BACKEND_URL } from '../../constants';

const styles = {
	attribute: {
		width: 200,
	},
	value: {
		width: 400,
	},
}

class AttributeFilter extends Component {
	state = { 
		values: [],
		api: {
			isExecuting: false,
			isErrored: false,
		},
		selectedAttribute: undefined,
		selectedValue: undefined,
	}

	handleAttributeChange = (event) => {
		let value = event.target.value;

		this.setState({ 
			selectedAttribute: value,
			values: [], 
			api: { isExecuting: true }
		}, () => {
			fetch(BACKEND_URL + '/services/' + this.props.service.ServiceCode + '/attributeValues/' + value)
			.then(response => {
				response.json().then(data =>{
					this.setState({ 
						values: data,
						api: { isExecuting: false },
					});
				})
			})
		})
	}

	handleValueChange = (event) => {
		let value = event.target.value;

		this.setState({ 
			selectedValue: value,
		}, () => {
			this.props.onChange(this.props.filterId, this.state.selectedAttribute, this.state.selectedValue);
		})
	}

	render() {
		let attributes = this.props.attributes || [];
		return (
			<label className="pt-label pt-inline">
				<span className={'form-label'}>Filter</span>
				<div className={'pt-select'}>
					<select onChange={this.handleAttributeChange} style={styles.attribute}>
						<option selected>Select</option>
						{attributes.map((a, index) => 
							<option key={index} value={a}>{a}</option>
						)}
					</select>
				</div>
				<div className={'pt-select'}>
					<select 
						onChange={this.handleValueChange} 
						style={styles.value}
						disabled={this.state.api.isExecuting || !this.state.values.length}
					>
						{this.state.api.isExecuting ? <option selected>Loading...</option> : ''}
						<option selected>Select</option>
						{this.state.values.map((v, index) => 
							<option 
								key={index} 
								value={v.Value}
							>
								{v.Value}
							</option>
						)}
					</select>
				</div>
			</label>
		);
	}
}

export default AttributeFilter;
