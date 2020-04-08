import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MiniDrawer from './Components/AppBarPermaIcons'
import CustomLoader from './Components/Loader'
import { SnackbarProvider } from 'notistack';

//Import Base Components
import ErrorBoundry from './Components/ErrorBoundry.js'
import { BaseConfig } from './Context/BaseConfigContext.js'
import { ProtectedRoute } from './Routes/ProtectedRoute.js'

// Lazy load components ( Useful for code-splitting while building the bundle)
// const FrostApp = React.lazy(() => import('./FrostApp.js'))
const Dashboard = React.lazy(() => import('./Views/Dashboard.js'))
const Datastreams = React.lazy(() => import('./Views/Datastreams.js'))
const HistoricalLocations = React.lazy(() => import('./Views/HistoricalLocations.js'))
const Locations = React.lazy(() => import('./Views/Locations.js'))
const MultiDatastreams = React.lazy(() => import('./Views/MultiDatastreams.js'))
const Observations = React.lazy(() => import('./Views/Observations.js'))
const ObservedProperties = React.lazy(() => import('./Views/ObservedProperties.js'))
const Sensors = React.lazy(() => import('./Views/Sensors.js'))
const Things = React.lazy(() => import('./Views/Things.js'))
const PageNotFound = React.lazy(() => import('./Components/PageNotFound.js'))
const ServerInput = React.lazy(() => import('./Views/ServerInput.js'))
const Settings = React.lazy(() => import('./Views/Settings.js'))

const BaseIndexApp = (props) => {
	// Initialise Context As App State
	const [BaseConfContext, setBaseConfContext] = React.useState(localStorage.getItem('frostServerBaseConfig') ? JSON.parse(localStorage.getItem('frostServerBaseConfig')) : null)
	return (
		<BaseConfig.Provider value={{ BaseConfContext, setBaseConfContext }}>
			<Router>
				<MiniDrawer
					children={
						<React.Suspense fallback={<CustomLoader />}>
							<Switch>
								<Route exact path="/" component={ServerInput} />
								<ProtectedRoute exact path="/Dashboard" component={Dashboard} />
								<ProtectedRoute exact path="/Datastreams" component={Datastreams} />
								<ProtectedRoute exact path="/HistoricalLocations" component={HistoricalLocations} />
								<ProtectedRoute exact path="/Locations" component={Locations} />
								<ProtectedRoute exact path="/MultiDatastreams" component={MultiDatastreams} />
								<ProtectedRoute exact path="/Observations" component={Observations} />
								<ProtectedRoute exact path="/ObservedProperties" component={ObservedProperties} />
								<ProtectedRoute exact path="/Sensors" component={Sensors} />
								<ProtectedRoute exact path="/Things" component={Things} />
								<ProtectedRoute exact path="/Settings" component={Settings} />
								<Route path="*" component={PageNotFound} />
							</Switch>
						</React.Suspense>
					}
				/>
			</Router>
		</BaseConfig.Provider>
	)

}
ReactDOM.render(
	<React.StrictMode>
		<ErrorBoundry>
			<SnackbarProvider maxSnack={3} anchorOrigin={{
				vertical: 'bottom',
				horizontal: 'left',
			}}>
				<BaseIndexApp />
			</SnackbarProvider>
		</ErrorBoundry>
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
