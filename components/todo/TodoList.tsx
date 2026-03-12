import { createHomeStyles } from '@/assets/styles/home.styles';
import { IConvexTodo } from '@/convex/todos';
import { useThemeStore } from '@/stores/theme/theme.store';
import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, Text, View } from 'react-native';
import { TodoItem } from './TodoItem';

interface TodoListProps {
	todos: IConvexTodo[];
}

const EmptyState = () => {
	const { colors } = useThemeStore();
	const homeStyles = createHomeStyles(colors);
	const { t } = useTranslation();
	return (
		<View style={homeStyles.emptyContainer}>
			<LinearGradient colors={colors.gradients.empty} style={homeStyles.emptyIconContainer}>
				<Ionicons name='clipboard-outline' size={60} color={colors.textMuted} />
			</LinearGradient>
			<Text style={homeStyles.emptyText}>{t('todoList.empty')}</Text>
			<Text style={homeStyles.emptySubtext}>{t('todoList.emptySub')}</Text>
		</View>
	);
};

const TodoList = ({ todos }: TodoListProps) => {
	const { colors } = useThemeStore();
	const homeStyles = createHomeStyles(colors);
	return (
		<FlatList
			contentContainerStyle={homeStyles.todoListContent}
			style={homeStyles.todoList}
			data={todos}
			renderItem={({ item }) => <TodoItem item={item} />}
			keyExtractor={(item) => item._id}
			ListEmptyComponent={EmptyState}
			//showsVerticalScrollIndicator={false}
		/>
	);
};

export default TodoList;
