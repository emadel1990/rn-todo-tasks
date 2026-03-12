import { createSettingsStyles } from '@/assets/styles/settings.styles';
import i18n from '@/i18n';
import { useThemeStore } from '@/stores/theme/theme.store';
import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Switch, Text, TouchableOpacity, View } from 'react-native';

const Preferences = () => {
	const [isAutoSync, setIsAutoSync] = useState(true);
	const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true);

	const { colors, isDarkMode, toggleDarkMode, language, setLanguage } = useThemeStore();

	const settingsStyles = createSettingsStyles(colors);
	const { t } = useTranslation();

	const handleLanguageChange = (lang: 'en' | 'es') => {
		setLanguage(lang);
		i18n.changeLanguage(lang);
	};
	return (
		<LinearGradient colors={colors.gradients.surface} style={settingsStyles.section}>
			<Text style={settingsStyles.sectionTitle}>{t('settings.preferences')}</Text>
			<View style={settingsStyles.settingItem}>
				<View style={settingsStyles.settingLeft}>
					<LinearGradient colors={colors.gradients.primary} style={settingsStyles.settingIcon}>
						<Ionicons name='moon' size={18} color='#fff' />
					</LinearGradient>
					<Text style={settingsStyles.settingText}>{t('settings.darkMode')}</Text>
				</View>
				<Switch
					value={isDarkMode}
					onValueChange={toggleDarkMode}
					thumbColor={'#fff'}
					trackColor={{ false: colors.border, true: colors.primary }}
				/>
			</View>

			{/* LANGUAGE */}
			<View style={[settingsStyles.settingItem]}>
				<View style={settingsStyles.settingLeft}>
					<LinearGradient colors={colors.gradients.success} style={settingsStyles.settingIcon}>
						<Ionicons name='language' size={18} color='#fff' />
					</LinearGradient>
					<Text style={settingsStyles.settingText}>{t('language.label')}</Text>
				</View>
				<View style={{ flexDirection: 'row', gap: 8 }}>
					<TouchableOpacity
						onPress={() => handleLanguageChange('en')}
						style={{
							paddingHorizontal: 12,
							paddingVertical: 6,
							borderRadius: 8,
							backgroundColor: language === 'en' ? colors.primary : colors.border,
						}}
					>
						<Text style={{ color: '#fff', fontWeight: '600', fontSize: 13 }}>{t('language.en')}</Text>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => handleLanguageChange('es')}
						style={{
							paddingHorizontal: 12,
							paddingVertical: 6,
							borderRadius: 8,
							backgroundColor: language === 'es' ? colors.primary : colors.border,
						}}
					>
						<Text style={{ color: '#fff', fontWeight: '600', fontSize: 13 }}>{t('language.es')}</Text>
					</TouchableOpacity>
				</View>
			</View>

			{/* NOTIFICATIONS */}
			<View style={settingsStyles.settingItem}>
				<View style={settingsStyles.settingLeft}>
					<LinearGradient colors={colors.gradients.warning} style={settingsStyles.settingIcon}>
						<Ionicons name='notifications' size={18} color='#fff' />
					</LinearGradient>
					<Text style={settingsStyles.settingText}>{t('settings.notifications')}</Text>
				</View>
				<Switch
					value={isNotificationsEnabled}
					onValueChange={setIsNotificationsEnabled}
					thumbColor={'#fff'}
					trackColor={{ false: colors.border, true: colors.warning }}
				/>
			</View>
		</LinearGradient>
	);
};

export default Preferences;
