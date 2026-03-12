export function formatDate(date: Date | undefined): string {
	if (!date) return '';
	return date.toISOString().split('T')[0];
}

export function formatShortDate(date: Date | undefined, lang: 'es' | 'en'): string {
	if (!date) return '';
	const locale = lang === 'es' ? 'es-ES' : 'en-US';
	const formatted = new Intl.DateTimeFormat(locale, { month: 'short', year: 'numeric', day: 'numeric' }).format(date);

	return formatted;
}
