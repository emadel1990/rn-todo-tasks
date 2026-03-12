import { ColorScheme } from '@/stores/theme/theme.interface';
import { useThemeStore } from '@/stores/theme/theme.store';
import { ES } from '@/utils/localeCalendarConfigs';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Modal, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { Calendar, DateData, LocaleConfig } from 'react-native-calendars';

const createCalendarStyles = (colors: ColorScheme) => {
	const styles = StyleSheet.create({
		calendarContainer: {
			flex: 1,
			justifyContent: 'center',
			backgroundColor: 'rgba(0,0,0,0.3)', // Semi-transparent background for modal effect
		},
		calendar: {
			width: '95%',
			alignSelf: 'center',
			paddingHorizontal: 10,
			overflow: 'hidden',
			backgroundColor: 'transparent',
		},
		day: {
			borderRadius: 6,
			padding: 10,
		},
	});
	return styles;
};

interface CalendarComponentProps {
	onDateSelect: (date: DateData) => void;
	defaultDate?: DateData | undefined;
	closeCalendars: () => void;
	openModal: boolean;
	minDate?: DateData | null;
}

const CalendarComponent = ({
	onDateSelect,
	closeCalendars,
	openModal,
	minDate,
	defaultDate,
}: CalendarComponentProps) => {
	LocaleConfig.locales['es-AR'] = ES;
	LocaleConfig.defaultLocale = 'es-AR';

	const { colors } = useThemeStore();
	const [selectedDate, setSelectedDate] = useState<DateData | undefined>(defaultDate);

	const calendarStyles = createCalendarStyles(colors);

	const viewOpacity = useRef(new Animated.Value(0)).current;

	useEffect(() => {
		Animated.timing(viewOpacity, {
			toValue: 1,
			duration: 200,
			useNativeDriver: true,
		}).start();
	}, []);

	return (
		<Modal visible={openModal} transparent animationType='fade' onRequestClose={closeCalendars}>
			<TouchableWithoutFeedback onPress={closeCalendars}>
				<View style={[calendarStyles.calendarContainer]}>
					<Calendar
						initialDate={defaultDate?.dateString}
						minDate={minDate ? minDate.dateString : new Date().toISOString().split('T')[0]}
						style={calendarStyles.calendar}
						headerStyle={{ backgroundColor: colors.surface }}
						theme={{
							todayTextColor: colors.primary,
							selectedDayBackgroundColor: colors.shadow,
							arrowColor: colors.primary,
							monthTextColor: '#FFFF',
						}}
						dayComponent={({ date, state }) => {
							return (
								<TouchableOpacity
									disabled={state === 'disabled'}
									style={[
										calendarStyles.day,
										date?.dateString === selectedDate?.dateString && {
											backgroundColor: colors.warning,
										},
										state === 'disabled' && { opacity: 0.3 },
									]}
									onPress={() => {
										if (state !== 'disabled' && date) {
											setSelectedDate(date);
											onDateSelect(date);
										}
									}}
								>
									<Text
										style={[
											state === 'disabled' && { color: colors.border },
											state === 'today' && { color: colors.primary },
											date?.dateString === selectedDate?.dateString && { color: colors.shadow },
										]}
									>
										{date?.day}
									</Text>
								</TouchableOpacity>
							);
						}}
						hideExtraDays
						onDayPress={(day) => {
							setSelectedDate(day);
							onDateSelect(day);
						}}
						markedDates={
							selectedDate && {
								[selectedDate.dateString]: { selected: true, selectedColor: colors.shadow },
							}
						}
					/>
				</View>
			</TouchableWithoutFeedback>
		</Modal>
	);
};

export default CalendarComponent;
