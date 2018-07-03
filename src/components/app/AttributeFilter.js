import React, { Component } from 'react';
import { BACKEND_URL } from '../../constants';
import { Button } from '@blueprintjs/core';

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
			this.props.onChange({
				filterId: this.props.filterId, 
				attribute: this.state.selectedAttribute, 
				value: this.state.selectedValue
			});
		})
	}

	render() {
		let attributes = this.props.attributes
			.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase())) || [];

		let values = this.state.values
			.sort((a, b) => a.Value.toLowerCase().localeCompare(b.Value.toLowerCase())) || [];

		return (
			<label className="pt-label pt-inline">
				<span className={'form-label'}>Filter</span>
				<div className={'pt-select attribute-select'}>
					<select onChange={this.handleAttributeChange}>
						<option selected>Select</option>
						{attributes.map((a, index) => 
							<option key={index} value={a}>{a}</option>
						)}
					</select>
				</div>
				<div className={'pt-select value-select'}>
					<select 
						onChange={this.handleValueChange} 
						className={''}
						disabled={this.state.api.isExecuting || !this.state.values.length}
					>
						{this.state.api.isExecuting ? <option selected>Loading...</option> : ''}
						<option selected>Select</option>
						{values
							.map((v, index) => 
								<option 
									key={index} 
									value={v.Value}
								>
									{v.Value}
								</option>
						)}
					</select>
				</div>
				<Button 
					icon={'delete'} 
					className={'pt-intent-danger delete-button'}
					onClick={this.props.onDelete}
				/>
			</label>
		);
	}
}

export default AttributeFilter;
