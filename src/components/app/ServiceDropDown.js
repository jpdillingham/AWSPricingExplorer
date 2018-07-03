import React, { Component } from 'react';

const styles = {
	select: {
		width: 300,
	},
}

class ServiceDropDown extends Component {
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
					<select onChange={this.handleChange} style={styles.select}>
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

export default ServiceDropDown;
