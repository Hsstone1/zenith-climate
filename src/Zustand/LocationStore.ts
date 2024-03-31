// useStore.js
import {create} from 'zustand';
import { Location } from '../exports';

interface LocationStore {
    // Define the properties and methods of the store
    selectedLocation: Location | null;
    locations: Location[];
    setSelectedLocation: (selectedLocation: Location | null) => void;
    addLocation: (location: Location) => void;
    removeLocation: (id: string) => void;
    toggleVisibility: (location: Location) => void;
    toggleVisibilityExclusive: (locationId: string) => void;
    updateHistoricalData: (id: string, year: number, historicalData: any) => void;
}

const useLocationStore = create<LocationStore>((set) => ({
    locations: [],
    selectedLocation: null,
    setSelectedLocation: (location) => set({ selectedLocation: location }),
    addLocation: (location) => set((state) => ({
        locations: [...state.locations, location],
    })),

    removeLocation: (id) => set((state) => ({
        locations: state.locations.filter((location) => location.id !== id),
        selectedLocation: state.selectedLocation && state.selectedLocation.id === id ? null : state.selectedLocation,
      })),
    toggleVisibility: (location) => set((state) => ({
        
        locations: state.locations.map((l) => {
            if (l.id === location.id) {
                return { ...l, visible: !l.visible };
            }
            return l;
        }),
    })),

    toggleVisibilityExclusive: (locationId) => set((state) => ({
        locations: state.locations.map((l) => ({
            ...l,
            visible: l.id === locationId ? !l.visible : false,
        })),
    })),

    updateHistoricalData: (id, year, historicalData) => set((state) => ({
        locations: state.locations.map((location) => {
            if (location.id === id) {
                return {
                    ...location,
                    historical_data: {
                        ...(location.historical_data || {}), // Preserve existing historical data
                        [year]: historicalData, // Add or update the historical data for the year
                    },
                };
            }
            return location;
        }),
    })),

    
}));

export default useLocationStore;
