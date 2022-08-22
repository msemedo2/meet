import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { getEvents, extractLocations, checkToken, getAccessToken } from './api';
import './nprogress.css';
import { OfflineAlert } from './Alert';
import WelcomeScreen from './WelcomeScreen';

class App extends Component {
	state = {
		events: [],
		locations: [],
		numberOfEvents: 32,
		selectedLocation: 'all',
		showWelcomeScreen: undefined,
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

	async componentDidMount() {
		this.mounted = true;
		const accessToken = localStorage.getItem('access_token');
		const isTokenValid = (await checkToken(accessToken)).error ? false : true;
		const searchParams = new URLSearchParams(window.location.search);
		const code = searchParams.get('code');
		this.setState({ showWelcomeScreen: !(code || isTokenValid) });
		if ((code || isTokenValid) && this.mounted) {
			getEvents().then((events) => {
				if (this.mounted) {
					this.setState({ events, locations: extractLocations(events) });
				}
			});
		}
	}

	componentWillUnmount() {
		this.mounted = false;
	}

	render() {
		if (this.state.showWelcomeScreen === undefined)
			return <div className="App" />;
		return (
			<div className="App">
				<div className="offlineAlert">
					{!navigator.onLine && (
						<OfflineAlert
							text={'You are currently offline, data may not  be updated.'}
						/>
					)}
				</div>
				<CitySearch
					locations={this.state.locations}
					updateEvents={this.updateEvents}
				/>
				<NumberOfEvents
					numberOfEvents={this.state.numberOfEvents}
					updateEvents={this.updateEvents}
				/>
				<EventList events={this.state.events} />
				<WelcomeScreen
					showWelcomeScreen={this.state.showWelcomeScreen}
					getAccessToken={() => {
						getAccessToken();
					}}
				/>
			</div>
		);
	}
}

export default App;
