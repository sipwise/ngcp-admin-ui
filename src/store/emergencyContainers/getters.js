
export function filteredEmergencyContainerOptions (state) {
    const emergencyContainers = []
    state.filteredEmergencyContainers.forEach((emergencyContainer) => {
        emergencyContainers.push({
            label: emergencyContainer.name,
            value: emergencyContainer.name
        })
    })
    return emergencyContainers
}
