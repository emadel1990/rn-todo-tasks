// stores/theme.store.ts

import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { ColorScheme, darkColors, lightColors } from './theme.interface';

interface ThemeState {
	isDarkMode: boolean;
	toggleDarkMode: () => void;
	colors: ColorScheme;
	language: 'en' | 'es';
	setLanguage: (lang: 'en' | 'es') => void;
}

export const useThemeStore = create<ThemeState>()(
	persist(
		(set, get) => ({
			isDarkMode: true,
			toggleDarkMode: () => {
				const newMode = !get().isDarkMode;
				set({
					isDarkMode: newMode,
					colors: newMode ? darkColors : lightColors,
				});
			},
			colors: darkColors,
			language: 'en',
			setLanguage: (lang: 'en' | 'es') => {
				set({ language: lang });
			},
		}),
		{
			name: 'theme-storage',
			storage: createJSONStorage(() => AsyncStorage),
			partialize: (state) => ({ isDarkMode: state.isDarkMode, language: state.language }),
			onRehydrateStorage: () => (state) => {
				if (state) {
					state.colors = state.isDarkMode ? darkColors : lightColors;
					state.language = state.language || 'en';
				}
			},
		},
	),
);
