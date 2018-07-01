import React, { Component } from 'react';

const styles = {
	select: {
		width: 250,
	},
}

class AttributeFilter extends Component {
	handleAttributeChange = (event) => {
		
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
				<select onChange={this.handleValueChange} style={styles.select}>
						<option selected></option>
						{attributes.map((a, index) => 
							<option key={index} value={a}>{a}</option>
						)}
					</select>
				</div>
			</label>
		);
	}
}

export default AttributeFilter;
