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
			miners: [],
			selectedMiner: {},
		}
		this.hidePopup = this.hidePopup.bind(this)
		this.openPopup = this.openPopup.bind(this)
	}

	openPopup(miner) {
		// If there is a timeout in progress, cancel it
		if (this.state.loaderTimeout)
			clearTimeout(this.state.loaderTimeout)

		this.setState({
			popupVisible: true,
			selectedMiner: miner,
			loading: true,
			loaderTimeout: setTimeout(() => {
				this.setState({
					loading: false
				})
			}, 2000),
		})

		apis.fetchHistoryByMinerId(miner.id).then(
			value => {
				console.debug(value.data)
				this.setState({
					histories: value.data,
					loading: false
				})
				clearTimeout(this.state.loaderTimeout)
			},
			error => this.setState({
				error: error,
				miners: [],
			})
		);
	}

	hidePopup() {
		this.setState({
			popupVisible: false,
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
							<tr onClick={(e) => this.openPopup(miner)} key={miner.id}>
								<td> {miner.name} </td>
								<td> {miner.planet.name}</td>
								<td className={Number(miner.load) === Number(miner.carryCapacity) ? "green" : ""}> {miner.load}/ {miner.carryCapacity}</td>
								<td> {miner.travelSpeed}</td>
								<td> {miner.miningSpeed}</td>
								<td>{miner.position.x + ', ' + miner.position.y}</td>
								<td> {miner.status}</td>
							</tr>
						))
					}
				</tbody>
			</table>

			<Rodal visible={this.state.popupVisible} onClose={this.hidePopup} width="782" height="480">
				<h2>History of { this.state.selectedMiner.name}</h2>
				{
					this.state.loading ? <Loader /> :  <PopupContent histories={this.state.histories} />
				}
			</Rodal>
		</div>
	}
}

export default MinerList