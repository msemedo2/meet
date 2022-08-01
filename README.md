_FEATURE 1: FILTER EVENTS BY CITY_

- As a **User**
- I should be able to **filter events by city**
- So that **I can see the list of events that take place in that city**

**Scenario 1:** When user hasn’t searched for a city, show upcoming events from all cities.

- **Given** user hasn’t searched for any city
- **When** the user opens the app
- **Then** the user should see a list of all upcoming events

**Scenario 2:** User should see a list of suggestions when they search for a city.

- **Given** the main page is open
- **When** user starts typing in the city textbox
- **Then** the user should see a list of cities (suggestions) that match what they’ve typed

**Scenario 3:** User can select a city from the suggested list.

- **Given** the user was typing “Berlin” in the city textbox and the list of suggested cities is showing
- **When** the user selects a city (e.g., “Berlin, Germany”) from the list
- **Then** their city should be changed to that city (i.e., “Berlin, Germany”)

_FEATURE 2: SHOW/HIDE AN EVENT’S DETAILS_

- As a **User**
- I should be able to **view the events or hide them**
- So that **I can se the details of each event**

**Scenario 1:** An event element is collapsed by default.

- **Given** the main page has been opened
- **When** the user views the featured city
- **Then** the events from that city will be collapsed/hidden from the user

**Scenario 2:** User can expand an event to see its details.

- **Given** the list of events has been loaded
- **When** user clicks on “Show details” button for an event
- **Then** the event element will be expanded to show the event details

**Scenario 3:** User can collapse an event to hide its details.

- **Given** the event element is opened\*\*
- **When** the user closes the event element
- **Then** the detailed will hide

_FEATURE 3: SPECIFY NUMBER OF EVENTS_

- As a **User**
- I should be able to **specify the number of events listed**
- So that **I know how many events are taking place**

**Scenario 1:** When user hasn’t specified a number, 32 is the default number.

- **Given** the user searched for events
- **When** the user doesn’t specify amount of search results
- **Then** the number of results should be 32

**Scenario 2:** User can change the number of events they want to see.

- **Given** the user opened the search results
- **When** the user changes the default number
- **Then** the default number of results should be changed

_FEATURE 4: USE THE APP WHEN OFFLINE_

- As a **User**
- I should be able to **use the app offline**
- So that **I can use the app without internet**

**Scenario 1:** Show cached data when there’s no internet connection.

- **Given** the app has no internet connection
- **When** the data is cached
- **Then** the data will be showed

**Scenario 2:** Show error when user changes the settings (city, time range).

- **Given** the user opened the settings
- **When** the user changes the settings
- **Then** an error message will show

_FEATURE 5: DATA VISUALIZATION_

- As a **User**
- I should be able to **see a chart with the upcoming events**
- So that **I can sort through my options**

**Scenario 1:** Show a chart with the number of upcoming events in each city.

- **Given** the user selected a city
- **When** the user clicks on the city’s upcoming events
- **Then** a chart will be listed with that city’s upcoming events
