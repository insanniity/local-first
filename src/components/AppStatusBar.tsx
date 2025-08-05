import { StatusBar } from 'expo-status-bar';
import { theme } from '../styles/theme';

export function AppStatusBar() {
    return (
        <StatusBar
            style="dark"
            backgroundColor={theme.colors.surface}
        />
    );
}
