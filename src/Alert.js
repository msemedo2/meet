import React, { Component } from 'react';

class Alert extends Component {
	constructor(props) {
		super(props);
		this.color = null;
	}

	getStyle = () => {
		return {
			color: this.color,
			position: this.position,
			top: this.top,
		};
	};

	render() {
		return (
			<div className="Alert">
				<p style={this.getStyle()}>{this.props.text}</p>
			</div>
		);
	}
}

class InfoAlert extends Alert {
	constructor(props) {
		super(props);
		this.color = 'blue';
	}
}
class ErrorAlert extends Alert {
	constructor(props) {
		super(props);
		this.color = 'red';
		this.position = 'relative';
		this.top = '250px';
	}
}

class OfflineAlert extends Alert {
	constructor(props) {
		super(props);
		this.color = '#ff6600';
		this.position = 'relative';
		this.top = '300px';
	}
}

export { InfoAlert, ErrorAlert, OfflineAlert };
