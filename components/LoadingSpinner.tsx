import { createHomeStyles } from '@/assets/styles/home.styles';
import { useThemeStore } from '@/stores/theme/theme.store';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, Text, View } from 'react-native';

const LoadingSpinner = () => {
	const { colors } = useThemeStore();
	const homeStyles = createHomeStyles(colors);
	const { t } = useTranslation();

	return (
		<LinearGradient colors={colors.gradients.background} style={homeStyles.container}>
			<View style={homeStyles.loadingContainer}>
				<ActivityIndicator size='large' color={colors.primary} />
				<Text style={homeStyles.loadingText}>{t('loading.todos')}</Text>
			</View>
		</LinearGradient>
	);
};

export default LoadingSpinner;
