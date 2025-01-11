import create from 'zustand';

interface Preferences {
    notificationsEnabled: boolean;
    language: string;
    // Add more preferences as needed
}

interface State {
    jwtToken: string | null;
    isAuthenticated: boolean;
    login: (token: string) => void;
    logout: () => void;
    isDarkMode: boolean;
    toggleDarkMode: () => void;
    preferences: Preferences;
    setPreference: <K extends keyof Preferences>(key: K, value: Preferences[K]) => void;
}

const useStore = create<State>((set:any) => ({
    jwtToken: null,
    isAuthenticated: false,
    login: (token: string) => set({ jwtToken: token, isAuthenticated: true }),
    logout: () => set({ jwtToken: null, isAuthenticated: false }),
    isDarkMode: false,
    toggleDarkMode: () => set((state:any) => ({ isDarkMode: !state.isDarkMode })),
    preferences: {
        notificationsEnabled: true,
        language: 'en',
    },
    setPreference: (key:any, value:any) => set((state:any) => ({
        preferences: {
            ...state.preferences,
            [key]: value,
        },
    })),
}));

export default useStore;
