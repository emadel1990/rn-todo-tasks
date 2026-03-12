import '@/i18n';
import { Stack } from 'expo-router';

import i18n from '@/i18n';
import { useThemeStore } from '@/stores/theme/theme.store';
import { ConvexProvider, ConvexReactClient } from 'convex/react';
import { useEffect } from 'react';

const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!, {
	unsavedChangesWarning: false,
});

function I18nSync() {
	const { language } = useThemeStore();
	useEffect(() => {
		if (i18n.language !== language) {
			i18n.changeLanguage(language);
		}
	}, [language]);
	return null;
}

export default function RootLayout() {
	return (
		<ConvexProvider client={convex}>
			<I18nSync />
			<Stack screenOptions={{ headerShown: false }}>
				<Stack.Screen name='(tabs)' />
			</Stack>
		</ConvexProvider>
	);
}
