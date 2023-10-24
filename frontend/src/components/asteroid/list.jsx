/**
 * List of asteroids
 */

import React from 'react'
import { apis } from "../../apis/index.js";

class AsteroidList extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			asteroids: []
		}
	}

	componentDidMount() {
		apis.fetchAsteroids().then(
			value => {
				console.log(value)
				this.setState({ asteroids: value.data.results })
			},
			error => this.setState({ error: error })
		);
	}

	render() {
		return <div className="list">
			<table>
				<thead>
					<tr>
						<th>Name</th>
						<th>Minerals</th>
						<th>Current miner</th>
						<th>Position (x, y)</th>
					</tr>
				</thead>

				<tbody>
					{
						this.state.asteroids.map(asteroid => (
							<tr key={asteroid.id}>
								<td>{asteroid.name}</td>
								<td className={Number(asteroid.minerals) === 0 ? "red" : ""}>{asteroid.minerals}/ {asteroid.initMinerals}</td>
								<td>{asteroid.currentMiner? asteroid.currentMiner.name: '-'}</td>
								<td>{asteroid.position.x + ', ' + asteroid.position.y}</td>
							</tr>
						))
					}
				</tbody>
			</table>
		</div>
	}
}

export default AsteroidList