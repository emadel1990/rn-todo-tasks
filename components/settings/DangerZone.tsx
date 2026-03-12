import { createSettingsStyles } from '@/assets/styles/settings.styles';
import { api } from '@/convex/_generated/api';
import { useThemeStore } from '@/stores/theme/theme.store';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useMutation } from 'convex/react';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, Text, TouchableOpacity, View } from 'react-native';

const DangerZone = () => {
	const { colors } = useThemeStore();

	const settingsStyles = createSettingsStyles(colors);
	const { t } = useTranslation();
	const clearAllTodos = useMutation(api.todos.clearAllTodos);

	const handleResetApp = () => {
		Alert.alert(t('settings.resetApp'), t('settings.resetAppDesc'), [
			{ text: t('settings.cancel'), style: 'cancel' },
			{
				text: t('settings.deleteAll'),
				style: 'destructive',
				onPress: async () => {
					try {
						const result = await clearAllTodos();
						Alert.alert(
							t('settings.appReset'),
							t('settings.resetSuccess', { deleted: result.deleted, total: result.total }),
							[{ text: t('settings.ok') }],
						);
					} catch (error) {
						console.error('Failed to clear todos:', error);
						Alert.alert('Error', t('settings.resetError'));
					}
				},
			},
		]);
	};
	return (
		<LinearGradient colors={colors.gradients.surface} style={settingsStyles.section}>
			<Text style={settingsStyles.sectionTitleDanger}>{t('settings.dangerZone')}</Text>

			<TouchableOpacity
				style={[settingsStyles.actionButton, { borderBottomWidth: 0 }]}
				onPress={handleResetApp}
				activeOpacity={0.7}
			>
				<View style={settingsStyles.actionLeft}>
					<LinearGradient colors={colors.gradients.danger} style={settingsStyles.actionIcon}>
						<Ionicons name='trash-outline' size={18} color='#fff' />
					</LinearGradient>
					<Text style={settingsStyles.actionTextDanger}>{t('settings.resetApp')}</Text>
				</View>
				<Ionicons name='chevron-forward' size={18} color={colors.textMuted} />
			</TouchableOpacity>
		</LinearGradient>
	);
};

export default DangerZone;
