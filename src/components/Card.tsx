import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { theme } from '../styles/theme';

type CardProps = {
    children: React.ReactNode;
    onPress?: () => void;
    variant?: 'default' | 'elevated' | 'outlined';
    style?: any;
};

export default function Card({ children, onPress, variant = 'default', style }: CardProps) {
    const cardStyle = [
        styles.base,
        styles[variant],
        style
    ];

    if (onPress) {
        return (
            <Pressable
                style={({ pressed }) => [
                    ...cardStyle,
                    pressed && styles.pressed
                ]}
                onPress={onPress}
            >
                {children}
            </Pressable>
        );
    }

    return (
        <View style={cardStyle}>
            {children}
        </View>
    );
}

const styles = StyleSheet.create({
    base: {
        backgroundColor: theme.colors.surface,
        borderRadius: theme.borderRadius.md,
        padding: theme.spacing.md,
        marginBottom: theme.spacing.md,
    },

    default: {
        ...theme.shadows.sm,
    },

    elevated: {
        ...theme.shadows.md,
    },

    outlined: {
        borderWidth: 1,
        borderColor: theme.colors.border.light,
    },

    pressed: {
        opacity: 0.95,
        transform: [{ scale: 0.98 }],
    },
});
