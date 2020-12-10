
export function filteredSoundSetOptions (state) {
	const soundSets = []
	state.filteredSoundSets.forEach((soundSet) => {
		soundSets.push({
			label: soundSet.name,
			value: soundSet.name
		})
	})
	return soundSets
}
