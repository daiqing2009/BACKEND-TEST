/**
 * List of miners
 */

import React from 'react'
import Rodal from 'rodal'
import PopupContent from './popup.jsx'
import Loader from '../layout/loader.jsx'
import { apis } from "../../apis/index.js";

class MinerList extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			popupVisible: false,
			loading: true,
			miners: []
		}
	}

	openPopup() {
		// If there is a timeout in progress, cancel it
		if (this.state.loaderTimeout)
			clearTimeout(this.state.loaderTimeout)

		this.setState({
			popupVisible: true,
			loading: true,
			loaderTimeout: setTimeout(() => {
				this.setState({
					loading: false
				})
			}, 2000)
		})
	}

	hidePopup() {
		this.setState({
			popupVisible: false
		})
	}

	componentDidMount() {
		apis.fetchMiners().then(
			value => {
				console.debug(value)
				this.setState({ miners: value.data.results })
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
						<th>Planet</th>
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
							<tr onClick={this.openPopup.bind(this)}>
								<td> {miner.name} </td>
								<td> {miner.planet.name}</td>
								<td className={Number(miner.payload) === Number(miner.carryCapacity) ? "green" : ""}> {miner.load}/ {miner.carryCapacity}</td>
								<td> {miner.travelSpeed}</td>
								<td> {miner.miningSpeed}</td>
								<td>832, 635</td>
								{/* <td> {miner.position.x}, {" "}, {miner.position.y}</td> */}
								<td> {miner.status}</td>
							</tr>
						))
					}
				</tbody>
			</table>

			<Rodal visible={this.state.popupVisible} onClose={this.hidePopup.bind(this)} width="782" height="480">
				<h2>History of Miner { }</h2>
				{
					this.state.loading ? <Loader /> : <PopupContent />
				}
			</Rodal>
		</div>
	}
}

export default MinerList