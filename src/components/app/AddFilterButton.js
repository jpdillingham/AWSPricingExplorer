import React, { Component } from 'react';
import { Button } from "@blueprintjs/core";

const styles = {
	button: {
		marginLeft: 5,
	},
}

class AddFilterButton extends Component {
	render() {
		return (
			<label className="pt-label">
				<span className={'form-label'}></span>
				<Button 
					style={styles.button}
					onClick={this.props.onClick} 
					className={'pt-intent-primary'} 
					icon={'add'}
				>
					Add Filter
				</Button>
			</label>
		);
	}
}

export default AddFilterButton;
