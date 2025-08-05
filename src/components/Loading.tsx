import { theme } from '@/styles/theme';
import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

type LoadingProps = {
    text?: string;
    size?: 'small' | 'large';
};

export default function Loading({ text = 'Carregando...', size = 'large' }: LoadingProps) {
    return (
        <View style={styles.container}>
            <ActivityIndicator size={size} color={theme.colors.primary} />
            <Text style={styles.text}>{text}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.colors.background,
        padding: theme.spacing.xl,
    },

    text: {
        ...theme.typography.body,
        color: theme.colors.text.secondary,
        marginTop: theme.spacing.md,
        textAlign: 'center',
    },
});
