import { theme } from '@/styles/theme';
import React from 'react';
import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';

type InputProps = TextInputProps & {
    label?: string;
    error?: string;
    helperText?: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
};

export default function Input({
    label,
    error,
    helperText,
    leftIcon,
    rightIcon,
    style,
    ...props
}: InputProps) {
    return (
        <View style={styles.container}>
            {label && <Text style={styles.label}>{label}</Text>}

            <View style={[
                styles.inputContainer,
                error && styles.inputContainerError,
                props.editable === false && styles.inputContainerDisabled
            ]}>
                {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}

                <TextInput
                    style={[
                        styles.input,
                        leftIcon ? styles.inputWithLeftIcon : undefined,
                        rightIcon ? styles.inputWithRightIcon : undefined,
                        style
                    ]}
                    placeholderTextColor={theme.colors.text.tertiary}
                    {...props}
                />

                {rightIcon && <View style={styles.rightIcon}>{rightIcon}</View>}
            </View>

            {error && <Text style={styles.error}>{error}</Text>}
            {!error && helperText && <Text style={styles.helperText}>{helperText}</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: theme.spacing.md,
    },

    label: {
        ...theme.typography.bodySmall,
        color: theme.colors.text.primary,
        fontWeight: '600',
        marginBottom: theme.spacing.xs,
    },

    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.colors.surface,
        borderWidth: 1,
        borderColor: theme.colors.border.light,
        borderRadius: theme.borderRadius.md,
        ...theme.shadows.sm,
    },

    inputContainerError: {
        borderColor: theme.colors.status.error,
    },

    inputContainerDisabled: {
        backgroundColor: theme.colors.surfaceSecondary,
        opacity: 0.6,
    },

    input: {
        flex: 1,
        paddingVertical: theme.spacing.md,
        paddingHorizontal: theme.spacing.md,
        ...theme.typography.body,
        color: theme.colors.text.primary,
    },

    inputWithLeftIcon: {
        paddingLeft: theme.spacing.xs,
    },

    inputWithRightIcon: {
        paddingRight: theme.spacing.xs,
    },

    leftIcon: {
        paddingLeft: theme.spacing.md,
    },

    rightIcon: {
        paddingRight: theme.spacing.md,
    },

    error: {
        ...theme.typography.caption,
        color: theme.colors.status.error,
        marginTop: theme.spacing.xs,
        marginLeft: theme.spacing.xs,
    },

    helperText: {
        ...theme.typography.caption,
        color: theme.colors.text.secondary,
        marginTop: theme.spacing.xs,
        marginLeft: theme.spacing.xs,
    },
});
