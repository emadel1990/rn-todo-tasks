import { createHomeStyles } from '@/assets/styles/home.styles';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { IConvexTodo } from '@/convex/todos';
import { useThemeStore } from '@/stores/theme/theme.store';
import { formatShortDate } from '@/utils/formatDate';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useMutation } from 'convex/react';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';

export const TodoItem = ({ item }: { item: IConvexTodo }) => {
	const [editingId, setEditingId] = useState<Id<'todos'> | null>(null);
	const [editedText, setEditedText] = useState(item.text);

	const { colors, language } = useThemeStore();
	const homeStyles = createHomeStyles(colors);
	const toggleTodo = useMutation(api.todos.toggleTodo);
	const deleteTodo = useMutation(api.todos.deleteTodo);
	const updateTodo = useMutation(api.todos.updateTodo);

	const handleToggleTodo = async (id: Id<'todos'>) => {
		try {
			const updateTodo = await toggleTodo({ id });
			return updateTodo;
		} catch (e) {
			console.error('Error toggling todo:', e);
			Alert.alert('Error', 'Failed to toggle todo');
		}
	};

	const handleDeleteTodo = async (id: Id<'todos'>) => {
		Alert.alert('Confirm Delete', 'Are you sure you want to delete this todo?', [
			{
				text: 'Cancel',
				style: 'cancel',
			},
			{
				text: 'Delete',
				style: 'destructive',
				onPress: async () => {
					try {
						await deleteTodo({ id });
					} catch (e) {
						console.error('Error deleting todo:', e);
						Alert.alert('Error', 'Failed to delete todo');
					}
				},
			},
		]);
	};

	const handleEditTodo = (id: Id<'todos'>) => {
		setEditingId(id);
	};

	const handleSaveEdit = async (id: Id<'todos'>) => {
		if (editedText.trim() === '') {
			Alert.alert('Validation Error', 'Todo text cannot be empty');
			return;
		}
		try {
			await updateTodo({ id, text: editedText.trim() });
			setEditingId(null);
		} catch (e) {
			console.error('Error updating todo:', e);
			Alert.alert('Error', 'Failed to update todo');
		}
	};

	const handleCancelEdit = () => {
		setEditingId(null);
		setEditedText(item.text);
	};

	return (
		<View style={homeStyles.todoItemWrapper}>
			<LinearGradient
				colors={colors.gradients.surface}
				style={homeStyles.todoItem}
				start={{ x: 0, y: 0 }}
				end={{ x: 1, y: 1 }}
			>
				<TouchableOpacity style={homeStyles.checkbox} activeOpacity={0.7} onPress={() => handleToggleTodo(item._id)}>
					<LinearGradient
						colors={item.isCompleted ? colors.gradients.success : colors.gradients.muted}
						style={[homeStyles.checkboxInner, { borderColor: item.isCompleted ? 'transparent' : colors.border }]}
					>
						{item.isCompleted && <Ionicons name='checkmark' size={17} color={colors.text} />}
					</LinearGradient>
				</TouchableOpacity>
				{editingId ? (
					<View style={homeStyles.editContainer}>
						<TextInput
							maxLength={200}
							value={editedText}
							onChangeText={setEditedText}
							style={[homeStyles.editInput]}
							autoFocus
							placeholder='Edit your todo...'
							placeholderTextColor={colors.textMuted}
						/>
						<View style={homeStyles.editButtons}>
							<TouchableOpacity onPress={() => handleSaveEdit(item._id)} activeOpacity={0.8}>
								<LinearGradient colors={colors.gradients.success} style={homeStyles.editButton}>
									<Ionicons name='checkmark' size={14} color={'#ffff'} />
									<Text style={homeStyles.editButtonText}>Save</Text>
								</LinearGradient>
							</TouchableOpacity>
							<TouchableOpacity onPress={handleCancelEdit} activeOpacity={0.8}>
								<LinearGradient colors={colors.gradients.danger} style={homeStyles.editButton}>
									<Ionicons name='close' size={14} color={'#ffff'} />
									<Text style={homeStyles.editButtonText}>Cancel</Text>
								</LinearGradient>
							</TouchableOpacity>
						</View>
					</View>
				) : (
					<View style={[homeStyles.todoTextContainer]}>
						<Text
							style={[
								homeStyles.todoText,
								item.isCompleted && {
									textDecorationLine: 'line-through',
									color: colors.textMuted,
									opacity: 0.6,
								},
								(item?.from || item?.to) && { marginBottom: 0 },
							]}
						>
							{item.text}
						</Text>
						{(item?.from || item?.to) && (
							<Text
								style={[
									homeStyles.todoText,
									{ color: colors.textMuted, fontSize: 12 },
									item.isCompleted && { textDecorationLine: 'line-through', opacity: 0.6 },
								]}
							>
								{item.from && `${formatShortDate(new Date(item.from), language)} `}
								{item.to && `- ${formatShortDate(new Date(item.to), language)}`}
							</Text>
						)}

						<View style={homeStyles.todoActions}>
							<TouchableOpacity onPress={() => handleEditTodo(item._id)} activeOpacity={0.8}>
								<LinearGradient colors={colors.gradients.warning} style={homeStyles.actionButton}>
									<Ionicons name='pencil' size={14} color={'#ffff'} />
								</LinearGradient>
							</TouchableOpacity>
							<TouchableOpacity onPress={() => handleDeleteTodo(item._id)} activeOpacity={0.8}>
								<LinearGradient colors={colors.gradients.danger} style={homeStyles.actionButton}>
									<Ionicons name='trash' size={14} color={'#ffff'} />
								</LinearGradient>
							</TouchableOpacity>
						</View>
						<View
							style={{
								position: 'absolute',
								right: -10,
								bottom: -10,
								paddingHorizontal: 8,
								paddingVertical: 4,
							}}
						>
							<Text style={[{ fontSize: 12, color: colors.textMuted }]}>
								{new Date(item._creationTime).toLocaleDateString()}
							</Text>
						</View>
					</View>
				)}
			</LinearGradient>
		</View>
	);
};
