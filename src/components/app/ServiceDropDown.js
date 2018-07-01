import React, { Component } from 'react';

const styles = {
	select: {
		width: 300,
	},
}

class ServiceDropDown extends Component {
	handleChange = (event) => {
		this.props.onChange(event.target.value);
	}

	render() {
		return (
			<label className="pt-label pt-inline">
				<span className={'form-label'}>Service</span>
				<div className={'pt-select'}>
					<select onChange={this.handleChange} style={styles.select}>
						<option selected></option>
						{this.props.services.map((s, index) => 
							<option key={index} value={s.ServiceCode}>{s.ServiceCode}</option>
						)}
					</select>
				</div>
			</label>
		);
	}
}

export default ServiceDropDown;
