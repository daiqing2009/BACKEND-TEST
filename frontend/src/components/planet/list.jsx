/**
 * List of planets
 */

import React from 'react'
import Rodal from 'rodal'
import PopupContent from './popup.jsx'
import CreateMinerForm from './createMiner.jsx'
import Loader from '../layout/loader.jsx'
import { apis } from "../../apis/index.js";

class PlanetList extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			popupVisible: false,
			formVisible: false,
			loading: false,
			planets: []
		}
		this.showPopup = this.showPopup.bind(this)
		this.hidePopup = this.hidePopup.bind(this)
		this.showForm = this.showForm.bind(this)
		this.hideForm = this.hideForm.bind(this)
	}

	// Show planet popup
	showPopup() {
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

	// Hide planet popup
	hidePopup() {
		this.setState({
			popupVisible: false
		})
	}

	// Show create miner form popup
	showForm(e) {
		e.stopPropagation()
		this.setState({
			formVisible: true
		})
	}

	// Hide create miner form popup
	hideForm() {
		this.setState({
			formVisible: false
		})
	}

	componentDidMount() {
		apis.fetchPlanets().then(
			value => {
				// console.debug(value)
				this.setState({ planets: value.data.results })
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
						<th>Miners</th>
						<th>Minerals</th>
						<th>Position (x, y)</th>
						<th></th>
					</tr>
				</thead>

				<tbody>
					{
						this.state.planets.map(planet => (
							<tr onClick={this.showPopup}>
								<td>{planet.name}</td>
								<td>{planet.totalOfMiners}</td>
								<td className={Number(planet.mineral) > 1000 ? "green" : ""}>{planet.mineral}/ 1000</td>
								<td>832, 635</td>
								<td>{Number(planet.mineral) > 1000 ? <div className="icon-addminer" onClick={this.showForm}>Create a miner</div> : ""}</td>
							</tr>
						))
					}
				</tbody>
			</table>

			<Rodal visible={this.state.popupVisible} onClose={this.hidePopup} width="550" height="480">
				<h2>List of miners of Planet 1</h2>
				{
					this.state.loading ? <Loader /> : <PopupContent />
				}
			</Rodal>

			<Rodal visible={this.state.formVisible} onClose={this.hideForm} width="440" height="480">
				<h2>Create a miner</h2>
				<CreateMinerForm />
			</Rodal>
		</div>
	}
}

export default PlanetList