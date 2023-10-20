/**
 * Create miner popup
 */
import React from 'react'
import httpStatus from 'http-status';

import { apis } from "../../apis/index.js";

class CreateMiner extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			name: 'new Miner',
			nameError: false,
			carryCapacity: 40,
			travelSpeed: 40,
			miningSpeed: 40,
			totalPoints: 120,
			limit: 120,
			totalPointError: false,
			planets: props.planets,
			planetId: props.selectedPlanet.id,
		}
		// console.debug(props.parentCallback)
		this.updatePoints = this.updatePoints.bind(this)
		this.computePoints = this.computePoints.bind(this)
		this.checkMinerName = this.checkMinerName.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
		this.validateFields = this.validateFields.bind(this)
	}

	computePoints() {
		this.setState({
			totalPoints: this.state.carryCapacity + this.state.travelSpeed + this.state.miningSpeed
		})
	}

	updatePoints(key, value) {
		value = parseInt(value)
		if (value < 1)
			value = 0

		this.setState({
			[key]: value
		}, () => this.computePoints())
	}

	checkMinerName(event) {
		let newName = event.target.value

		apis.fetchMinerByName(newName).then(
			value => {
				// console.log(value)
				if (value) {

					//TODO: 1. show error message 2. get focus
				} else {
					this.setState({

					})
				}
			},
			error => this.setState({
				error: error,
			})
		)
	}

	validateFields(field, value) {
		//TODO: validate field
		console.log("validating(" + field + ") with value:" + value)
		switch (field) {
			case ("name"): {
				this.setState({ 'name': value })
				break;
			}
			case ('planet'): {
				this.setState({ 'planetId': value })
				break;
			}
			default:
				console.error("unknown field(" + field + ") with value:" + value)

		}
	}

	handleSubmit(event) {
		event.preventDefault();
		let newMiner = {
			"name": this.state.name,
			carryCapacity: this.state.carryCapacity,
			travelSpeed: this.state.travelSpeed,
			miningSpeed: this.state.miningSpeed,
			planet: this.state.planetId,
			load: 0,
			status: "Idle",
		}
		console.log('New Miner submited' + JSON.stringify(newMiner));
		apis.createMiner(newMiner).then(
			value => {
				console.log(value.status + ':' + httpStatus.CREATED + '~' + (value.status === httpStatus.CREATED))
				if (value.status == httpStatus.CREATED) {
					this.props.parentCallback()
				} 
			},
			error => this.setState({
				error: error,
			})
		)
	}

	render() {
		return <form onSubmit={this.handleSubmit}>
			<div className="field">
				<label id="name">Miner name</label>
				<input type="text" id="name" value={this.state.name} placeholder="Miner name" onBlur={this.checkMinerName} onChange={(e) => this.validateFields('name', e.target.value)} />
				<div className="message">This name is already taken</div>
			</div>

			<div className="field">
				<label>Planet</label>
				<select placeholder="Select a planet" id="planet" value={this.state.planetId} onChange={(e) => this.validateFields('planet', e.target.value)} >
					{
						this.state.planets.map(planet => {
							if (planet.mineral < 1000) {
								return <option key={planet.id} value={planet.id} disabled>{planet.name}</option>
							} else {
								return <option key={planet.id} value={planet.id}>{planet.name}</option>
							}
						})
					}
				</select>
				<div className="message">Only planet with enough mineral can be selected</div>
			</div>

			<h2>Assign points</h2>

			<div className="columns">
				<div className="column">
					<div className="field">
						<label id="carry-capacity">Carry capacity</label>
						<input value={this.state.carryCapacity} type="number" id="carry-capacity" placeholder="0" onChange={(e) => this.updatePoints('carryCapacity', e.target.value)} />
					</div>
				</div>
				<div className="column">
					<div className="field">
						<label id="travel-speed">Travel speed</label>
						<input value={this.state.travelSpeed} type="number" id="travel-speed" placeholder="0" onChange={(e) => this.updatePoints('travelSpeed', e.target.value)} />
					</div>
				</div>
				<div className="column">
					<div className="field">
						<label id="mining-speed">Mining speed</label>
						<input value={this.state.miningSpeed} type="number" id="mining-speed" placeholder="0" onChange={(e) => this.updatePoints('miningSpeed', e.target.value)} />
					</div>
				</div>
			</div>

			<div className={this.state.totalPoints <= this.state.limit ? 'green' : 'red'}>{this.state.totalPoints}/{this.state.limit}</div>
			<div className="actions">
				<button type="submit" value="Submit">Save</button>
			</div>
		</form>
	}
}

export default CreateMiner