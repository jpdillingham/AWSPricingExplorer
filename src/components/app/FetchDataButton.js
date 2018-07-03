import React, { Component } from 'react';
import { Button } from "@blueprintjs/core";

class FetchDataButton extends Component {
	render() {
		return (
			<label className="pt-label">
				<span className={'form-label'}></span>
				<Button 
					onClick={this.props.onClick} 
					className={'pt-intent-success fetch-data-button'} 
					icon={'circle-arrow-down'}
				>
					Fetch Data
				</Button>
			</label>
		);
	}
}

export default FetchDataButton;
