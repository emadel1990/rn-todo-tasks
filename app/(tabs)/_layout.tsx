import { useThemeStore } from '@/stores/theme/theme.store';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';

export default function TabsLayout() {
	const { colors } = useThemeStore();
	const { t } = useTranslation();

	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: colors.primary,
				tabBarInactiveTintColor: colors.textMuted,
				tabBarStyle: {
					backgroundColor: colors.surface,
					height: 90,
					paddingBottom: 30,
					paddingTop: 10,
					borderTopColor: colors.primary,
					borderTopWidth: 1,
				},
				tabBarLabelStyle: {
					fontSize: 12,
					fontWeight: '600',
				},
				tabBarIconStyle: {
					marginBottom: 0,
				},
				headerShown: false,
			}}
		>
			<Tabs.Screen
				name='index'
				options={{
					title: t('tabs.home'),
					tabBarIcon: ({ color, size }) => <Ionicons name='flash-outline' color={color} size={size} />,
				}}
			/>
			<Tabs.Screen
				name='settings'
				options={{
					title: t('tabs.settings'),
					tabBarIcon: ({ color, size }) => <Ionicons name='settings' color={color} size={size} />,
				}}
			/>
		</Tabs>
	);
}
