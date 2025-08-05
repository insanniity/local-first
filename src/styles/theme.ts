export const theme = {
    colors: {
        primary: '#6366F1',
        primaryLight: '#8B5CF6',
        primaryDark: '#4F46E5',
        secondary: '#10B981',
        accent: '#F59E0B',

        background: '#FAFAFA',
        surface: '#FFFFFF',
        surfaceSecondary: '#F8FAFC',

        text: {
            primary: '#1F2937',
            secondary: '#6B7280',
            tertiary: '#9CA3AF',
            inverse: '#FFFFFF',
        },

        border: {
            light: '#E5E7EB',
            medium: '#D1D5DB',
            dark: '#9CA3AF',
        },

        status: {
            success: '#10B981',
            warning: '#F59E0B',
            error: '#EF4444',
            info: '#3B82F6',
        },

        gradient: {
            primary: ['#6366F1', '#8B5CF6'],
            secondary: ['#10B981', '#059669'],
        }
    },

    spacing: {
        xs: 4,
        sm: 8,
        md: 16,
        lg: 24,
        xl: 32,
        xxl: 48,
    },

    borderRadius: {
        sm: 8,
        md: 12,
        lg: 16,
        xl: 20,
        full: 9999,
    },

    typography: {
        h1: {
            fontSize: 32,
            fontWeight: '700' as const,
            lineHeight: 40,
        },
        h2: {
            fontSize: 24,
            fontWeight: '600' as const,
            lineHeight: 32,
        },
        h3: {
            fontSize: 20,
            fontWeight: '600' as const,
            lineHeight: 28,
        },
        body: {
            fontSize: 16,
            fontWeight: '400' as const,
            lineHeight: 24,
        },
        bodySmall: {
            fontSize: 14,
            fontWeight: '400' as const,
            lineHeight: 20,
        },
        caption: {
            fontSize: 12,
            fontWeight: '400' as const,
            lineHeight: 16,
        },
        button: {
            fontSize: 16,
            fontWeight: '600' as const,
            lineHeight: 24,
        },
    },

    shadows: {
        sm: {
            elevation: 2,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.05,
            shadowRadius: 2,
        },
        md: {
            elevation: 4,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
        },
        lg: {
            elevation: 8,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.15,
            shadowRadius: 8,
        },
    },
}

export type Theme = typeof theme;
