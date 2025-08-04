import Button from '@/components/button';
import { useRouter } from 'expo-router';
import { FlatList, StyleSheet, Text, View } from 'react-native';

const MOCK_ACCOUNTS = [
    { name: 'Account 1', cap: '1000', tap: '2000', id: '1' },
    { name: 'Account 2', cap: '1500', tap: '2500', id: '2' },
    { name: 'Account 3', cap: '2000', tap: '3000', id: '3' },
];

export default function AccountsScreen() {
    const router = useRouter();

    return (
        <View
            style={styles.container}
        >
            <FlatList
                data={MOCK_ACCOUNTS}
                renderItem={({ item }) => (
                    <AccountCard account={item} />
                )}
                keyExtractor={(item, index) => `index-${index}`}
                contentContainerStyle={{ padding: 20 }}
            />
            <View style={{ padding: 20 }}>
                <Button onPress={() => router.push('/accounts/new')} label="Adicionar" />
            </View>
        </View>
    );
}


function AccountCard({ account }: { account: { name: string; cap: string; tap: string } }) {
    return (
        <View style={styles.card}>
            <View style={styles.cardContent}>
                <Text>{account.name}</Text>
                <Text>{account.cap}</Text>
                <Text>{account.tap}</Text>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    card: {
        padding: 20,
        marginBottom: 10,
        backgroundColor: '#fff',
        borderRadius: 8,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        borderColor: '#ccc',
        borderWidth: 1,
    },
    cardContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});