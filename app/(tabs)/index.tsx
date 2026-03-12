import { createHomeStyles } from '@/assets/styles/home.styles';
import Header from '@/components/Header';
import LoadingSpinner from '@/components/LoadingSpinner';
import TodoInput from '@/components/todo/TodoInput';
import TodoList from '@/components/todo/TodoList';
import { api } from '@/convex/_generated/api';
import { useThemeStore } from '@/stores/theme/theme.store';
import { useQuery } from 'convex/react';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Index() {
	const { colors } = useThemeStore();
	const homeStyles = createHomeStyles(colors);
	const todos = useQuery(api.todos.getTodos);
	const isLoading = todos === undefined;

	if (isLoading) return <LoadingSpinner />;

	return (
		<LinearGradient colors={colors.gradients.background} style={homeStyles.container}>
			<StatusBar barStyle={colors.statusBarStyle} />
			<SafeAreaView style={homeStyles.safeArea}>
				<Header />
				<TodoInput />
				<TodoList todos={todos ?? []} />
			</SafeAreaView>
		</LinearGradient>
	);
}
