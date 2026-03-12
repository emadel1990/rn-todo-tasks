import { createSettingsStyles } from '@/assets/styles/settings.styles';
import { api } from '@/convex/_generated/api';
import { useThemeStore } from '@/stores/theme/theme.store';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useQuery } from 'convex/react';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';

const ProgressStats = () => {
	const { colors } = useThemeStore();
	const settingsStyles = createSettingsStyles(colors);
	const { t } = useTranslation();
	const todos = useQuery(api.todos.getTodos) || [];
	const totalTodos = todos.length;
	const completedTodos = todos.filter((todo) => todo.isCompleted).length;
	const activeTodos = totalTodos - completedTodos;

	return (
		<LinearGradient colors={colors.gradients.surface} style={settingsStyles.section}>
			<Text style={settingsStyles.sectionTitle}>{t('settings.progressStats')}</Text>
			<View style={settingsStyles.statsContainer}>
				{/* TOTAL TODOS */}
				<LinearGradient
					colors={colors.gradients.background}
					style={[settingsStyles.statCard, { borderLeftColor: colors.primary }]}
				>
					<View style={settingsStyles.statIconContainer}>
						<LinearGradient colors={colors.gradients.primary} style={settingsStyles.statIcon}>
							<Ionicons name='list' size={20} color={'#fff'} />
						</LinearGradient>
					</View>
					<View>
						<Text style={settingsStyles.statNumber}>{totalTodos}</Text>
						<Text style={settingsStyles.statLabel}>{t('progressStats.total')}</Text>
					</View>
				</LinearGradient>
				{/* COMPLETED TODOS */}
				<LinearGradient
					colors={colors.gradients.background}
					style={[settingsStyles.statCard, { borderLeftColor: colors.success }]}
				>
					<View style={settingsStyles.statIconContainer}>
						<LinearGradient colors={colors.gradients.success} style={settingsStyles.statIcon}>
							<Ionicons name='checkmark-circle' size={20} color={'#fff'} />
						</LinearGradient>
					</View>
					<View>
						<Text style={settingsStyles.statNumber}>{completedTodos}</Text>
						<Text style={settingsStyles.statLabel}>{t('progressStats.completed')}</Text>
					</View>
				</LinearGradient>

				{/* ACTIVE TODOS */}
				<LinearGradient
					colors={colors.gradients.background}
					style={[settingsStyles.statCard, { borderLeftColor: colors.warning }]}
				>
					<View style={settingsStyles.statIconContainer}>
						<LinearGradient colors={colors.gradients.warning} style={settingsStyles.statIcon}>
							<Ionicons name='time' size={20} color={'#fff'} />
						</LinearGradient>
					</View>
					<View>
						<Text style={settingsStyles.statNumber}>{activeTodos}</Text>
						<Text style={settingsStyles.statLabel}>{t('progressStats.active')}</Text>
					</View>
				</LinearGradient>
			</View>
		</LinearGradient>
	);
};

export default ProgressStats;
