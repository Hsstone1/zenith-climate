// useStore.js
import create from 'zustand';
import { Location } from '../exports';

interface LocationStore {
    // Define the properties and methods of the store
    selectedLocation: Location | null;
    locations: Location[];
    setSelectedLocation: (selectedLocation: Location | null) => void;
    addLocation: (location: Location) => void;
    removeLocation: (id: string) => void;
    toggleVisibility: (location: Location) => void;
}

const useLocationStore = create<LocationStore>((set) => ({
    locations: [],
    selectedLocation: null,
    setSelectedLocation: (location) => set({ selectedLocation: location }),
    addLocation: (location) => set((state) => ({
        locations: [...state.locations, location],
    })),
    // removeLocation: (location) => set((state) => ({
    //     locations: state.locations.filter((l) => l.id !== location.id),
    //     selectedLocation: state.selectedLocation && state.selectedLocation.id === location.id ? null : state.selectedLocation,

    // })),

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
}));

export default useLocationStore;
