function PlayerDisplay() {
	return (
		<>
			<h3>Player Name</h3>
			<h6>Level: 0</h6>
			<div className="lifeBar">100%</div>
			{false ? (
				<>
					<p>Who's Playing?</p>
					<div>
						<input type="text" placeholder="Player" />
						<button type="button">Save</button>
					</div>
				</>
			) : (
				<> </>
			)}
		</>
	);
}

function PlayerActions() {
	return (
		<div className="btn-actions">
			<button type="button">Next</button>
			<button type="button">Flee</button>
			<button type="button">Attack</button>
			<button type="button">Regen</button>
		</div>
	);
}

function Inventory() {
	return (
		<>
			<button type="button">Inventory</button>
			<div className="inventory-container"></div>
		</>
	);
}
