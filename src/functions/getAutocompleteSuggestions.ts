export const getAutocompleteSuggestions = async (searchString: string): Promise<{locationName: string}[]> => {
    return [
        {locationName: 'Oslo'},
        {locationName: 'Trondheim'},
        {locationName: 'Røros'},
    ]
}