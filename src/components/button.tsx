import { Pressable, StyleSheet, Text } from "react-native";

type Props = {
    onPress?: () => void;
    label?: string;
}


export default function Button({ onPress, label }: Props) {
    return (
        <Pressable
            style={styles.button}
            onPress={onPress}
        >
            <Text style={{ color: "#fff" }}>
                {label}
            </Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#007AFF',
        width: '100%',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    }
})