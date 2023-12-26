import { create }  from 'zustand'

type Navigation = {
  location?: string
  isNavigating: boolean
  startNavigation: (location: string) => void
  endNavigation: () => void
}

export const useNavigationStore = create<Navigation>()((set, get) => ({
  isNavigating: false,
  startNavigation: (location: string) => {
    set(() => ({
      location,
      isNavigating: true,
    }))
  },
  endNavigation: () => {
    const { location } = get()
    if (location) window.location.href = location
  }
}))
