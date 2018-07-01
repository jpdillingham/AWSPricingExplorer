import React, { Component } from 'react';

class AttributeList extends Component {
	render() {
		let attributes = this.props.attributes || [];
		return (
			<ul>
				{attributes.map(a => <li>{a}</li>)}
			</ul>
		);
	}
}

export default AttributeList;
