import { createSettingsStyles } from '@/assets/styles/settings.styles';
import DangerZone from '@/components/settings/DangerZone';
import Preferences from '@/components/settings/Preferences';
import ProgressStats from '@/components/settings/ProgressStats';
import { useThemeStore } from '@/stores/theme/theme.store';
import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Settings = () => {
	const { colors, isDarkMode, toggleDarkMode } = useThemeStore();
	const settingsStyles = createSettingsStyles(colors);

	return (
		<LinearGradient colors={colors.gradients.background} style={settingsStyles.container}>
			<SafeAreaView style={settingsStyles.safeArea}>
				{/* HEADER */}
				<View style={settingsStyles.header}>
					<View style={settingsStyles.titleContainer}>
						<LinearGradient colors={colors.gradients.primary} style={settingsStyles.iconContainer}>
							<Ionicons name='settings' size={28} color={'#fff'} />
						</LinearGradient>
						<Text style={settingsStyles.title}>Settings</Text>
					</View>
				</View>

				{/* CONTENT */}
				<ScrollView
					style={settingsStyles.scrollView}
					contentContainerStyle={settingsStyles.content}
					showsVerticalScrollIndicator={false}
				>
					{/* PROGRESS STATS */}
					<ProgressStats />
					{/* PREFERENCES */}
					<Preferences />
					{/* DANGER ZONE */}
					<DangerZone />
				</ScrollView>
			</SafeAreaView>
		</LinearGradient>
	);
};

export default Settings;
