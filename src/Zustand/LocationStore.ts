// useStore.js
import create from 'zustand';
import { Location } from '../exports';

interface LocationStore {
    // Define the properties and methods of the store
    locations: Location[];
    addLocation: (location: Location) => void;
    removeLocation: (location: Location) => void;
}

const useLocationStore = create<LocationStore>((set) => ({
    locations: [],
    addLocation: (location) => set((state) => ({
        locations: [...state.locations, location],
    })),
    removeLocation: (location) => set((state) => ({
        locations: state.locations.filter((l) => l.id !== location.id),
    })),
}));

export default useLocationStore;
