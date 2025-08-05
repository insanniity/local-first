import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { theme } from '../styles/theme';

type HeaderProps = {
    title: string;
    subtitle?: string;
    rightAction?: React.ReactNode;
    leftAction?: React.ReactNode;
};

export default function Header({ title, subtitle, rightAction, leftAction }: HeaderProps) {
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                {leftAction && (
                    <View style={styles.leftAction}>
                        {leftAction}
                    </View>
                )}

                <View style={styles.titleContainer}>
                    <Text style={styles.title}>{title}</Text>
                    {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
                </View>

                {rightAction && (
                    <View style={styles.rightAction}>
                        {rightAction}
                    </View>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colors.surface,
        paddingBottom: theme.spacing.md,
        ...theme.shadows.sm,
    },

    content: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: theme.spacing.md,
        paddingTop: theme.spacing.md * 2,
    },

    leftAction: {
        marginRight: theme.spacing.md,
    },

    titleContainer: {
        flex: 1,
    },

    title: {
        ...theme.typography.h2,
        color: theme.colors.text.primary,
    },

    subtitle: {
        ...theme.typography.bodySmall,
        color: theme.colors.text.secondary,
        marginTop: theme.spacing.xs,
    },

    rightAction: {
        marginLeft: theme.spacing.md,
    },
});
