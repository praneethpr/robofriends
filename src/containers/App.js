import React, { Component } from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import './App.css';
import ErrorBoundary from '../containers/ErrorBoundary';

class App extends Component {
	constructor() {
		super();
		this.state = {
			robots: [],
			searchfield: ''
		}
	}

	componentDidMount() {
		fetch('https://jsonplaceholder.typicode.com/users')
		.then(respone => respone.json())
		.then(users => this.setState({robots: users}));
	}

	onSearchChange = (event) => {
		this.setState({ searchfield: event.target.value })
	}

	render() {
		const { robots, searchfield } = this.state;
		const fileteredRobots = robots.filter(robot => {
			return robot.name.toLowerCase().includes(searchfield.toLowerCase());
		})			
		return !robots.length ?
		<h1>Loading..</h1> :
		(
			<div className='tc'>
				<h1 className='f1'>RoboFriends</h1>
				<SearchBox searchChange={this.onSearchChange}/>
				<Scroll>
					<ErrorBoundary>
						<CardList robots={fileteredRobots} />
					</ErrorBoundary>
				</Scroll>
			</div>
		);
	}
}

export default App;