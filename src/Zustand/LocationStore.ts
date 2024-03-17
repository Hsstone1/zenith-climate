// useStore.js
import create from 'zustand';
import { Location } from '../exports';

interface LocationStore {
    // Define the properties and methods of the store
    locations: Location[];
    addLocation: (location: Location) => void;
    removeLocation: (location: Location) => void;
    toggleVisibility: (location: Location) => void;
}

const useLocationStore = create<LocationStore>((set) => ({
    locations: [],
    addLocation: (location) => set((state) => ({
        locations: [...state.locations, location],
    })),
    removeLocation: (location) => set((state) => ({
        locations: state.locations.filter((l) => l.id !== location.id),
    })),
    toggleVisibility: (location) => set((state) => ({
        locations: state.locations.map((l) => {
            if (l.id === location.id) {
                return { ...l, visible: !l.visible };
            }
            return l;
        }),
    })),
}));

export default useLocationStore;
