import React from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, TextStyle, ViewStyle } from "react-native";
import { theme } from '../styles/theme';

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost';
type ButtonSize = 'small' | 'medium' | 'large';

type Props = {
    onPress?: () => void;
    label?: string;
    variant?: ButtonVariant;
    size?: ButtonSize;
    disabled?: boolean;
    loading?: boolean;
    fullWidth?: boolean;
    style?: ViewStyle;
    textStyle?: TextStyle;
}

export default function Button({
    onPress,
    label,
    variant = 'primary',
    size = 'medium',
    disabled = false,
    loading = false,
    fullWidth = true,
    style,
    textStyle
}: Props) {
    const buttonStyle = [
        styles.base,
        styles[variant],
        styles[size],
        fullWidth && styles.fullWidth,
        disabled && styles.disabled,
        style
    ];

    const textStyles = [
        styles.text,
        styles[`${variant}Text`],
        styles[`${size}Text`],
        disabled && styles.disabledText,
        textStyle
    ];

    return (
        <Pressable
            style={({ pressed }) => [
                ...buttonStyle,
                pressed && !disabled && styles.pressed
            ]}
            onPress={onPress}
            disabled={disabled || loading}
        >
            {loading ? (
                <ActivityIndicator
                    size="small"
                    color={variant === 'primary' ? theme.colors.text.inverse : theme.colors.primary}
                />
            ) : (
                <Text style={textStyles}>
                    {label}
                </Text>
            )}
        </Pressable>
    );
}

const styles = StyleSheet.create({
    base: {
        borderRadius: theme.borderRadius.md,
        alignItems: 'center',
        justifyContent: 'center',
        ...theme.shadows.sm,
    },

    // Variants
    primary: {
        backgroundColor: theme.colors.primary,
    },
    secondary: {
        backgroundColor: theme.colors.surface,
        borderWidth: 1,
        borderColor: theme.colors.border.medium,
    },
    danger: {
        backgroundColor: theme.colors.status.error,
    },
    ghost: {
        backgroundColor: 'transparent',
    },

    // Sizes
    small: {
        paddingVertical: theme.spacing.sm,
        paddingHorizontal: theme.spacing.md,
    },
    medium: {
        paddingVertical: theme.spacing.md,
        paddingHorizontal: theme.spacing.lg,
    },
    large: {
        paddingVertical: theme.spacing.lg,
        paddingHorizontal: theme.spacing.xl,
    },

    fullWidth: {
        width: '100%',
    },

    disabled: {
        opacity: 0.5,
    },

    pressed: {
        opacity: 0.8,
        transform: [{ scale: 0.98 }],
    },

    // Text styles
    text: {
        ...theme.typography.button,
        textAlign: 'center',
    },

    primaryText: {
        color: theme.colors.text.inverse,
    },
    secondaryText: {
        color: theme.colors.text.primary,
    },
    dangerText: {
        color: theme.colors.text.inverse,
    },
    ghostText: {
        color: theme.colors.primary,
    },

    smallText: {
        fontSize: 14,
    },
    mediumText: {
        fontSize: 16,
    },
    largeText: {
        fontSize: 18,
    },

    disabledText: {
        opacity: 0.7,
    },
})