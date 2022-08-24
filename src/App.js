import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import EventGenre from './EventGenre';
import NumberOfEvents from './NumberOfEvents';
import { getEvents, extractLocations, checkToken, getAccessToken } from './api';
import './nprogress.css';
import { OfflineAlert } from './Alert';
import WelcomeScreen from './WelcomeScreen';
import {
	ScatterChart,
	Scatter,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
} from 'recharts';

class App extends Component {
	state = {
		events: [],
		locations: [],
		numberOfEvents: 32,
		selectedLocation: 'all',
		showWelcomeScreen: undefined,
	};

	updateEvents = (location, eventCount) => {
		if (eventCount === undefined) {
			eventCount = this.state.numberOfEvents;
		} else this.setState({ numberOfEvents: eventCount });
		if (location === undefined) {
			location = this.state.selectedLocation;
		}
		getEvents().then((events) => {
			const locationEvents =
				location === 'all'
					? events
					: events.filter((event) => event.location === location);
			if (this.mounted) {
				this.setState({
					events: locationEvents.slice(0, eventCount),
					numberOfEvents: eventCount,
					selectedLocation: location,
				});
			}
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
					this.setState({
						events: events.slice(0, this.state.numberOfEvents),
						locations: extractLocations(events),
					});
				}
			});
		}
		if (navigator.onLine) {
			this.setState({
				offlineText: '',
			});
		} else {
			this.setState({
				offlineText: 'You are currently offline, data may not  be updated.',
			});
		}
	}

	componentWillUnmount() {
		this.mounted = false;
	}

	getData = () => {
		const { locations, events } = this.state;
		const data = locations.map((location) => {
			const number = events.filter(
				(event) => event.location === location
			).length;
			const city = location.split(', ').shift();
			return { city, number };
		});
		return data;
	};

	render() {
		const { events } = this.state;
		if (this.state.showWelcomeScreen === undefined) {
			return <div className="App" />;
		}

		return (
			<div className="App">
				<h1>Meet App</h1>
				<CitySearch
					locations={this.state.locations}
					updateEvents={this.updateEvents}
				/>
				<NumberOfEvents
					numberOfEvents={this.state.numberOfEvents}
					updateEvents={this.updateEvents}
				/>
				<h4>Events in each city</h4>
				<OfflineAlert text={this.state.offlineText} />
				<div className="data-vis-wrapper">
					<EventGenre events={events} />
					<ResponsiveContainer height={400}>
						<ScatterChart margin={{ top: 10, right: 10, bottom: 10, left: 10 }}>
							<CartesianGrid />
							<XAxis type="category" dataKey="city" name="city" />
							<YAxis
								type="number"
								dataKey="number"
								name="number of events"
								allowDecimals={false}
							/>
							<Tooltip cursor={{ strokeDasharray: '3 3' }} />
							<Scatter data={this.getData()} fill="#fff" />
						</ScatterChart>
					</ResponsiveContainer>
				</div>
				<EventList
					events={this.state.events}
					updateEvents={this.updateEvents}
					numberOfEvents={this.state.numberOfEvents}
				/>
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
