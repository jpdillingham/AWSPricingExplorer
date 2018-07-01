import React, { Component } from 'react';
import { BACKEND_URL } from '../../constants';

const styles = {
	select: {
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
		} 
	}

	handleAttributeChange = (event) => {
		let value = event.target.value;

		this.setState({ values: [], api: { isExecuting: true } }, () => {
			fetch(BACKEND_URL + this.props.service.ServiceCode + '/attributeValues/' + value)
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

	render() {
		let attributes = this.props.attributes || [];
		return (
			<label className="pt-label pt-inline">
				<span className={'form-label'}>Filter</span>
				<div className={'pt-select'}>
					<select onChange={this.handleAttributeChange} style={styles.select}>
						<option selected></option>
						{attributes.map((a, index) => 
							<option key={index} value={a}>{a}</option>
						)}
					</select>
				</div>
				<div className={'pt-select'}>
					<select 
						onChange={this.handleValueChange} 
						style={styles.value}
						disabled={this.state.api.isExecuting}
					>
						{this.state.api.isExecuting ? <option>Loading...</option> : ''}
						{this.state.values.map((v, index) => 
							<option 
								key={index} 
								value={v.Value}
								selected={index === 0}
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
