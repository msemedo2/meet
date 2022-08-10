import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { getEvents, extractLocations } from './api';
import './nprogress.css';
class App extends Component {
	state = {
		events: [],
		locations: [],
		numberOfEvents: 32,
		selectedLocation: 'all',
	};

	updateEvents = (location, eventCount) => {
		if (location === undefined) {
			location = this.state.selectedLocation;
		}
		if (eventCount === undefined) {
			eventCount = this.state.numberOfEvents;
		}

		getEvents().then((events) => {
			const locationEvents =
				location === 'all'
					? events
					: events.filter((event) => event.location === location);
			this.setState({
				events: locationEvents.slice(0, eventCount),
				numberOfEvents: eventCount,
				selectedLocation: location,
			});
		});
	};

	componentDidMount() {
		this.mounted = true;
		getEvents().then((events) => {
			if (this.mounted) {
				this.setState({ events, locations: extractLocations(events) });
			}
		});
	}

	componentWillUnmount() {
		this.mounted = false;
	}

	render() {
		return (
			<div className="App">
				<CitySearch
					locations={this.state.locations}
					updateEvents={this.updateEvents}
				/>
				<EventList events={this.state.events} />
				<NumberOfEvents
					numberOfEvents={this.state.numberOfEvents}
					updateEvents={this.updateEvents}
				/>
			</div>
		);
	}
}

export default App;
