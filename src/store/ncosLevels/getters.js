
export function filteredNcosLevelOptions (state) {
	const ncosLevels = []
	state.filteredNcosLevels.forEach((ncosLevel) => {
		ncosLevels.push({
			label: ncosLevel.level,
			value: ncosLevel.level
		})
	})
	return ncosLevels
}
