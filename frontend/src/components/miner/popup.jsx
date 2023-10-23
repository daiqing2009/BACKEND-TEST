/**
 * Miner popup
 */

import React from 'react'
import { apis } from "../../apis/index.js";


class MinerPopup extends React.Component {
	constructor(props) {
		super(props)
		console.debug(props)
		// this.state = {
		// 	miner: props.miner,
		// 	histories: [],
		// }
	}

	render() {
		return <div className="scrollable">
			<table>
				<thead>
					<tr>
						<th>Date</th>
						<th>Year</th>
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
						this.props.histories.map(history => (
							<tr key={history.id}>
								<td>{history.timestamp}</td>
								<td>{history.year}</td>
								<td>{history.miner.planet.name}</td>
								<td className={Number(history.miner.payload) === Number(history.miner.carryCapacity) ? "green" : ""}> {history.miner.load}/ {history.miner.carryCapacity}</td>
								<td>{history.travel.speed}</td>
								<td>{history.mining.speed}</td>
								<td>{history.position.x + ', ' + history.position.y}</td>
								<td>{history.status}</td>
							</tr>
						))
					}
					<tr>
						<td>2021/05/26 15:26:23</td>
						<td>250</td>
						<td>Planet 1</td>
						<td>0/120</td>
						<td>60</td>
						<td>20</td>
						<td>832, 635</td>
						<td>Transferring done</td>
					</tr>

					<tr>
						<td>2021/05/26 15:26:22</td>
						<td>249</td>
						<td>Planet 1</td>
						<td className="green">120/120</td>
						<td>60</td>
						<td>20</td>
						<td>832, 635</td>
						<td>Transferring minerals to planet</td>
					</tr>

					<tr>
						<td>2021/05/26 15:26:22</td>
						<td>249</td>
						<td>Planet 1</td>
						<td className="green">120/120</td>
						<td>60</td>
						<td>20</td>
						<td>832, 635</td>
						<td>Arrived at planet</td>
					</tr>

					<tr>
						<td>2021/05/26 15:26:17</td>
						<td>226</td>
						<td>Planet 1</td>
						<td className="green">120/120</td>
						<td>60</td>
						<td>20</td>
						<td>832, 635</td>
						<td>Traveling back to planet</td>
					</tr>

					<tr>
						<td>2021/05/26 15:26:17</td>
						<td>226</td>
						<td>Planet 1</td>
						<td className="green">120/120</td>
						<td>60</td>
						<td>20</td>
						<td>832, 635</td>
						<td>Leaving asteroid</td>
					</tr>

					<tr>
						<td>2021/05/26 15:26:17</td>
						<td>226</td>
						<td>Planet 1</td>
						<td className="green">120/120</td>
						<td>60</td>
						<td>20</td>
						<td>832, 635</td>
						<td>Carry capacity full</td>
					</tr>

					<tr>
						<td>2021/05/26 15:26:09</td>
						<td>208</td>
						<td>Planet 1</td>
						<td>0/120</td>
						<td>60</td>
						<td>20</td>
						<td>832, 635</td>
						<td>Mining asteroid `Asteroid 1`</td>
					</tr>

					<tr>
						<td>2021/05/26 15:26:09</td>
						<td>208</td>
						<td>Planet 1</td>
						<td>0/120</td>
						<td>60</td>
						<td>20</td>
						<td>832, 635</td>
						<td>Traveling to asteroid</td>
					</tr>

					<tr>
						<td>2021/05/26 15:26:01</td>
						<td>201</td>
						<td>Planet 1</td>
						<td>0/120</td>
						<td>60</td>
						<td>20</td>
						<td>832, 635</td>
						<td>Leaving planet</td>
					</tr>

					<tr>
						<td>2021/05/26 15:25:23</td>
						<td>250</td>
						<td>Planet 1</td>
						<td>0/120</td>
						<td>60</td>
						<td>20</td>
						<td>832, 635</td>
						<td>Transferring done</td>
					</tr>

					<tr>
						<td>2021/05/26 15:25:22</td>
						<td>249</td>
						<td>Planet 1</td>
						<td className="green">120/120</td>
						<td>60</td>
						<td>20</td>
						<td>832, 635</td>
						<td>Transferring minerals to planet</td>
					</tr>

					<tr>
						<td>2021/05/26 15:25:22</td>
						<td>249</td>
						<td>Planet 1</td>
						<td className="green">120/120</td>
						<td>60</td>
						<td>20</td>
						<td>832, 635</td>
						<td>Arrived at planet</td>
					</tr>

				</tbody>
			</table>
		</div>
	}
}

export default MinerPopup