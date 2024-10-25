import { create } from 'zustand'
import { persist } from 'zustand/middleware';

export const useBearStore = create(persist((set) => ({
  bears: 0,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
})))

// function BearCounter() {
//     const bears = useBearStore((state) => state.bears)
//     return <h1>{bears} around here ...</h1>
//   }
  
//   function Controls() {
//     const increasePopulation = useBearStore((state) => state.increasePopulation)
//     return <button onClick={increasePopulation}>one up</button>
//   }

export const useCityStore = create(persist((set) => ({
  city: {},
  setCity: (cit) => set((state) => ({ cit: state.city=cit })),
  remove: () => set({ cities: {}}),
})))

export const useDestStore = create(persist((set) => ({
  dest: [],
  setDest: (destArray) => set((state) => ({ dest: state.dest=destArray })),
  removeAllDest: () => set({ dest: [] }),
})))

export const useDestDetail = create(persist((set) => ({
  detail: {},
  setDet: (details) => set((state) => ({ details: state.detail=details })),
  removeAllDet: () => set({ detail: {}}),
})))


export const useHotelStore = create(persist((set) => ({
  hotels: [],
  setHotels: (hotelArr) => set((state) => ({ hotelArr: state.hotels=hotelArr })),
  removeAllHotels: () => set({ hotels: [] }),
})))

export const useHotelDetail = create(persist((set) => ({
  hotel: {},
  setHotel: (detail) => set((state) => ({  detail:state.hotel=detail })),
  removeAllHotels: () => set({ hotel:{} }),
})))

export const useRestDetail = create(persist((set) => ({
  rest: {},
  setRest: (detail) => set((state) => ({  detail:state.rest=detail })),
  removeAllHotels: () => set({ hotel:{} }),
})))