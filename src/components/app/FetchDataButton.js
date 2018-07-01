import React, { Component } from 'react';
import { Button } from "@blueprintjs/core";

const styles = {
	button: {
		marginLeft: 5,
		width: 620,
	},
}

class FetchDataButton extends Component {
	render() {
		return (
			<label className="pt-label">
				<span className={'form-label'}></span>
				<Button 
					style={styles.button}
					onClick={this.props.onClick} 
					className={'pt-intent-success'} 
					icon={'circle-arrow-down'}
				>
					Fetch Data
				</Button>
			</label>
		);
	}
}

export default FetchDataButton;
