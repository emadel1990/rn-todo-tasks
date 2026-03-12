import { useThemeStore } from '@/stores/theme/theme.store';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import React, { useState } from 'react';

interface CustomDatePickerProps {
	onDateSelect: (date: Date) => void;
	defaultDate?: Date | undefined;
	closeCalendar: () => void;
	openModal: boolean;
	minDate?: Date | null;
}

export const CustomDatePicker = ({
	onDateSelect,
	defaultDate,
	closeCalendar,
	openModal,
	minDate,
}: CustomDatePickerProps) => {
	const { isDarkMode } = useThemeStore();
	const [date, setDate] = useState(defaultDate || new Date());
	const [mode, setMode] = useState<'date' | 'time'>('date');

	return (
		<>
			<RNDateTimePicker
				value={date}
				themeVariant={isDarkMode ? 'dark' : 'light'}
				minimumDate={minDate || new Date()}
				mode={mode}
				display='default'
				onChange={(event, selectedDate) => {
					if (event.type === 'dismissed') {
						closeCalendar();
						return;
					}
					if (event.type === 'set' && selectedDate) {
						setDate(selectedDate);
						onDateSelect(selectedDate);
						closeCalendar();
					}
				}}
			/>
		</>
	);
};
