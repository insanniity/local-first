import { StyleSheet } from 'react-native';
import { theme } from './theme';

export const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },

    safeContainer: {
        flex: 1,
        backgroundColor: theme.colors.background,
        paddingHorizontal: theme.spacing.md,
    },

    card: {
        backgroundColor: theme.colors.surface,
        borderRadius: theme.borderRadius.md,
        padding: theme.spacing.md,
        marginBottom: theme.spacing.md,
        ...theme.shadows.sm,
    },

    cardElevated: {
        backgroundColor: theme.colors.surface,
        borderRadius: theme.borderRadius.md,
        padding: theme.spacing.lg,
        marginBottom: theme.spacing.md,
        ...theme.shadows.md,
    },

    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    rowBetween: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    rowCenter: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },

    column: {
        flexDirection: 'column',
    },

    flex1: {
        flex: 1,
    },

    textCenter: {
        textAlign: 'center',
    },

    textRight: {
        textAlign: 'right',
    },

    // Typography
    h1: {
        ...theme.typography.h1,
        color: theme.colors.text.primary,
    },

    h2: {
        ...theme.typography.h2,
        color: theme.colors.text.primary,
    },

    h3: {
        ...theme.typography.h3,
        color: theme.colors.text.primary,
    },

    body: {
        ...theme.typography.body,
        color: theme.colors.text.primary,
    },

    bodySecondary: {
        ...theme.typography.body,
        color: theme.colors.text.secondary,
    },

    bodySmall: {
        ...theme.typography.bodySmall,
        color: theme.colors.text.primary,
    },

    caption: {
        ...theme.typography.caption,
        color: theme.colors.text.secondary,
    },

    textPrimary: {
        color: theme.colors.primary,
    },

    textSuccess: {
        color: theme.colors.status.success,
    },

    textError: {
        color: theme.colors.status.error,
    },

    textWarning: {
        color: theme.colors.status.warning,
    },

    // Spacing
    mt_xs: { marginTop: theme.spacing.xs },
    mt_sm: { marginTop: theme.spacing.sm },
    mt_md: { marginTop: theme.spacing.md },
    mt_lg: { marginTop: theme.spacing.lg },
    mt_xl: { marginTop: theme.spacing.xl },

    mb_xs: { marginBottom: theme.spacing.xs },
    mb_sm: { marginBottom: theme.spacing.sm },
    mb_md: { marginBottom: theme.spacing.md },
    mb_lg: { marginBottom: theme.spacing.lg },
    mb_xl: { marginBottom: theme.spacing.xl },

    mx_xs: { marginHorizontal: theme.spacing.xs },
    mx_sm: { marginHorizontal: theme.spacing.sm },
    mx_md: { marginHorizontal: theme.spacing.md },
    mx_lg: { marginHorizontal: theme.spacing.lg },
    mx_xl: { marginHorizontal: theme.spacing.xl },

    my_xs: { marginVertical: theme.spacing.xs },
    my_sm: { marginVertical: theme.spacing.sm },
    my_md: { marginVertical: theme.spacing.md },
    my_lg: { marginVertical: theme.spacing.lg },
    my_xl: { marginVertical: theme.spacing.xl },

    p_xs: { padding: theme.spacing.xs },
    p_sm: { padding: theme.spacing.sm },
    p_md: { padding: theme.spacing.md },
    p_lg: { padding: theme.spacing.lg },
    p_xl: { padding: theme.spacing.xl },

    px_xs: { paddingHorizontal: theme.spacing.xs },
    px_sm: { paddingHorizontal: theme.spacing.sm },
    px_md: { paddingHorizontal: theme.spacing.md },
    px_lg: { paddingHorizontal: theme.spacing.lg },
    px_xl: { paddingHorizontal: theme.spacing.xl },

    py_xs: { paddingVertical: theme.spacing.xs },
    py_sm: { paddingVertical: theme.spacing.sm },
    py_md: { paddingVertical: theme.spacing.md },
    py_lg: { paddingVertical: theme.spacing.lg },
    py_xl: { paddingVertical: theme.spacing.xl },
});
