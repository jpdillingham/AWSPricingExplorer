import React, { Component } from 'react';

class ServiceSelect extends Component {
	handleChange = (event) => {
		let value = event.target.value;

		if (value !== 'Select') {
			this.props.onChange(value);
		}
		else {
			this.props.onClear();
		}
	}

	render() {
		return (
			<label className="pt-label pt-inline">
				<span className={'form-label'}>Service</span>
				<div className={'pt-select'}>
					<select onChange={this.handleChange} className={'service-select'}>
						<option selected>Select</option>
						{this.props.services
							.sort((a, b) => a.ServiceCode.toLowerCase().localeCompare(b.ServiceCode.toLowerCase()))
							.map((s, index) => 
								<option key={index} value={s.ServiceCode}>{s.ServiceCode}</option>
						)}
					</select>
				</div>
			</label>
		);
	}
}

export default ServiceSelect;
