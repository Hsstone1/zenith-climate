import {create} from 'zustand';

interface HistoricalStore {
    visibleRange: {min: number, max: number};
    setVisibleRange: (visibleRange: {min: number, max: number}) => void;
}

const useHistoricalStore = create<HistoricalStore>((set) => ({
    visibleRange: {min: 0, max: 365*2},
    setVisibleRange: (visibleRange) => set({visibleRange}),
}));

export default useHistoricalStore;