/**
 * Planet popup
 */

import React from 'react'
import { apis } from "../../apis/index.js";

class PlanetPopup extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			planet: props.planet,
			miners: []
		}
		this.changeLoading = props.changeLoading
	}

	componentDidMount() {
		apis.fetchMinerByPlanetId(this.state.planet.id).then(
			value => {
				this.setState({ miners: value.data.results })
				this.changeLoading(false)
			},
			error => this.setState({ error: error })
		);
	}

	render() {
		return <div className="scrollable">
			<table>
				<thead>
					<tr>
						<th>Name</th>
						<th>Carry capacity</th>
						<th>Travel speed</th>
						<th>Mining speed</th>
						<th>Position (x, y)</th>
						<th>Status</th>
					</tr>
				</thead>

				<tbody>
					{
						this.state.miners.map(miner => (
							<tr>
								<td> {miner.name} </td>
								<td className={Number(miner.payload) === Number(miner.carryCapacity) ? "green" : ""}> {miner.load}/ {miner.carryCapacity}</td>
								<td> {miner.travelSpeed}</td>
								<td> {miner.miningSpeed}</td>
								<td>333, 123</td>
								{/* <td> {miner.position.x}, {" "}, {miner.position.y}</td> */}
								<td> {miner.status}</td>
							</tr>
						))
					}
				</tbody>
			</table>
		</div>
	}
}

export default PlanetPopup