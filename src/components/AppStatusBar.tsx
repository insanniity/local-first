import { theme } from '@/styles/theme';
import { StatusBar } from 'expo-status-bar';

export function AppStatusBar() {
    return (
        <StatusBar
            style="dark"
            backgroundColor={theme.colors.surface}
        />
    );
}
