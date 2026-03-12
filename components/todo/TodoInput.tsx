import { createHomeStyles } from '@/assets/styles/home.styles';
import { api } from '@/convex/_generated/api';
import { useThemeStore } from '@/stores/theme/theme.store';
import { formatDate } from '@/utils/formatDate';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useMutation } from 'convex/react';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, Animated, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { CustomDatePicker } from '../DatePicker';

const TodoInput = () => {
	const { colors } = useThemeStore();
	const homeStyles = createHomeStyles(colors);
	const { t } = useTranslation();
	const [newTodo, setNewTodo] = useState('');
	const [openModal, setOpenModal] = useState(false);
	const [showFromCalendar, setShowFromCalendar] = useState(false);
	const [showToCalendar, setShowToCalendar] = useState(false);
	const [fromDate, setFromDate] = useState<Date | undefined>(undefined);
	const [toDate, setToDate] = useState<Date | undefined>(undefined);
	const buttonOpacity = useRef(new Animated.Value(0.5)).current;

	const isDisabled = !newTodo.trim();

	useEffect(() => {
		Animated.timing(buttonOpacity, {
			toValue: isDisabled ? 0.5 : 1,
			duration: 250,
			useNativeDriver: true,
		}).start();
	}, [isDisabled]);

	const addTodo = useMutation(api.todos.addTodo);

	const handleAddTodo = async () => {
		if (newTodo.trim() === '') return; // Don't add empty todos\
		try {
			console.log('Adding todo with dates:', { text: newTodo, from: formatDate(fromDate), to: formatDate(toDate) });
			await addTodo({ text: newTodo, from: formatDate(fromDate), to: formatDate(toDate) });
			setNewTodo(''); // Clear the input after adding
			setFromDate(undefined);
			setToDate(undefined);
		} catch (error) {
			console.error('Failed to add todo:', error);
			Alert.alert('Error', 'Failed to add todo. Please try again.'); // Show an alert on error
		}
	};

	const handleFromDateSaved = (date: Date) => {
		setFromDate(date);
		if (toDate && fromDate && fromDate?.getTime() > toDate.getTime()) {
			setToDate(undefined); // Clear toDate if it's before the new fromDate
		}
		return date;
	};

	const handleToDateSaved = (date: Date) => {
		setToDate(date);
		return date;
	};

	const closeCalendars = () => {
		setShowFromCalendar(false);
		setShowToCalendar(false);
		setOpenModal(false);
	};

	useEffect(() => {
		console.log('From date selected:', fromDate);
	}, [fromDate]);

	return (
		<View style={homeStyles.inputSection}>
			{Platform.OS !== 'ios' && showFromCalendar && (
				<CustomDatePicker
					onDateSelect={handleFromDateSaved}
					defaultDate={fromDate}
					closeCalendar={closeCalendars}
					openModal={openModal}
					minDate={undefined}
				/>
			)}
			{Platform.OS !== 'ios' && showToCalendar && (
				<CustomDatePicker
					onDateSelect={handleToDateSaved}
					defaultDate={toDate}
					closeCalendar={closeCalendars}
					openModal={openModal}
					minDate={fromDate}
				/>
			)}

			<View style={homeStyles.inputWrapper}>
				<TextInput
					style={homeStyles.input}
					value={newTodo}
					onChangeText={setNewTodo}
					placeholder={t('todoInput.placeholder')}
					placeholderTextColor={colors.textMuted}
					onSubmitEditing={handleAddTodo}
				/>
				<Animated.View style={{ opacity: buttonOpacity }}>
					<TouchableOpacity
						onPress={handleAddTodo}
						disabled={isDisabled}
						style={homeStyles.addButton}
						activeOpacity={0.8}
					>
						<LinearGradient
							colors={!isDisabled ? colors.gradients.primary : colors.gradients.muted}
							style={homeStyles.addButton}
						>
							<Ionicons name='add' size={24} color={colors.text} />
						</LinearGradient>
					</TouchableOpacity>
				</Animated.View>
			</View>
			<View style={[homeStyles.inputWrapper, { justifyContent: 'space-between', marginTop: 12 }]}>
				{Platform.OS === 'ios' && (
					<View style={{ flexDirection: 'column', alignItems: 'center', gap: 2 }}>
						<Text style={{ color: colors.textMuted, fontSize: 14, fontWeight: '600' }}>{t('todoInput.from')}</Text>
						<CustomDatePicker
							onDateSelect={handleFromDateSaved}
							defaultDate={fromDate}
							closeCalendar={closeCalendars}
							openModal={openModal}
							minDate={undefined}
						/>
					</View>
				)}
				{Platform.OS === 'ios' && (
					<View style={{ flexDirection: 'column', alignItems: 'center', gap: 2 }}>
						<Text style={{ color: colors.textMuted, fontSize: 14, fontWeight: '600' }}>{t('todoInput.to')}</Text>
						<CustomDatePicker
							onDateSelect={handleToDateSaved}
							defaultDate={toDate}
							closeCalendar={closeCalendars}
							openModal={openModal}
							minDate={fromDate}
						/>
					</View>
				)}
				{Platform.OS !== 'ios' && (
					<>
						<TouchableOpacity
							onPress={() => {
								setOpenModal(true);
								setShowFromCalendar(!showFromCalendar);
							}}
							style={{ flexDirection: 'column', alignItems: 'center', gap: 4 }}
						>
							<LinearGradient colors={colors.gradients.surface} style={homeStyles.actionButton}>
								<Ionicons name='calendar-number-outline' size={22} color={'#fff'} />
							</LinearGradient>
							<Text style={{ color: colors.textMuted, fontSize: 14, fontWeight: '600' }}>
								{t('todoInput.from')} {formatDate(fromDate)}
							</Text>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={() => {
								setOpenModal(true);
								setShowToCalendar(!showToCalendar);
							}}
							style={{ flexDirection: 'column', alignItems: 'center', gap: 4 }}
						>
							<LinearGradient colors={colors.gradients.surface} style={homeStyles.actionButton}>
								<Ionicons name='calendar-number-outline' size={22} color={'#fff'} />
							</LinearGradient>
							<Text style={{ color: colors.textMuted, fontSize: 14, fontWeight: '600' }}>
								{t('todoInput.to')} {formatDate(toDate)}
							</Text>
						</TouchableOpacity>
					</>
				)}
			</View>
		</View>
	);
};

export default TodoInput;
