import * as Localization from 'expo-localization';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en.json';
import es from './locales/es.json';

const resources = {
	en: { translation: en },
	es: { translation: es },
};

const languageDetector = {
	type: 'languageDetector' as const,
	detect: () => {
		const deviceLocale = Localization.getLocales?.()?.[0]?.languageCode ?? 'en';
		const supported = ['en', 'es'];
		return supported.includes(deviceLocale) ? deviceLocale : 'en';
	},
	init: () => {},
	cacheUserLanguage: () => {},
};

i18n
	.use(languageDetector as any)
	.use(initReactI18next)
	.init({
		resources,
		fallbackLng: 'en',
		initImmediate: false,
		interpolation: {
			escapeValue: false,
		},
	});

export default i18n;
