import create from 'zustand';

type GeneralStoreState = {
    isSidebarOpen: boolean;
    setIsSidebarOpen: (isOpen: boolean) => void;
    mapInstance: google.maps.Map | null;
    setMapInstance: (map: google.maps.Map) => void;
};

const useGeneralStore = create<GeneralStoreState>((set) => ({
    isSidebarOpen: false,

    setIsSidebarOpen: (isOpen) => set({ isSidebarOpen: isOpen }),
    mapInstance: null,
    setMapInstance: (map) => set({ mapInstance: map }),
}));

export default useGeneralStore;