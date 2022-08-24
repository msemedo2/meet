import React, { Component } from 'react';
import { ErrorAlert } from './Alert';

export class NumberOfEvents extends Component {
	state = {
		numberOfEvents: 32,
		infoText: '32',
	};

	handleInputChanged = (event) => {
		let inputValue = event.target.value;
		if (inputValue >= 33 || inputValue <= 0) {
			this.setState({
				numberOfEvents: inputValue,
				infoText: 'Please enter a number between 1 - 32.',
			});
		} else {
			this.setState({
				numberOfEvents: event.target.value,
				infoText: ' ',
			});
		}

		this.props.updateEvents(undefined, inputValue);
	};

	render() {
		return (
			<div className="numberOfEvents">
				<label>
					Number of Events:
					<input
						type="number"
						className="number-input"
						value={this.state.numOfEvents}
						onChange={this.handleInputChanged}
					/>
				</label>
				<ErrorAlert text={this.state.infoText} />{' '}
			</div>
		);
	}
}

export default NumberOfEvents;
