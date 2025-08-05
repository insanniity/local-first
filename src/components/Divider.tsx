import React from 'react';
import { StyleSheet, View } from 'react-native';
import { theme } from '../styles/theme';

type DividerProps = {
    style?: any;
    color?: string;
    thickness?: number;
    margin?: number;
};

export default function Divider({
    style,
    color = theme.colors.border.light,
    thickness = 1,
    margin = theme.spacing.md
}: DividerProps) {
    return (
        <View
            style={[
                styles.divider,
                {
                    backgroundColor: color,
                    height: thickness,
                    marginVertical: margin,
                },
                style
            ]}
        />
    );
}

const styles = StyleSheet.create({
    divider: {
        width: '100%',
    },
});
