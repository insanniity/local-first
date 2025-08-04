import Button from '@/components/button';
import { accountsCollection } from '@/db';
import Account from '@/model/Account';
import { withObservables } from '@nozbe/watermelondb/react';
import { useRouter } from 'expo-router';
import { FlatList, StyleSheet, Text, View } from 'react-native';

function AccountsScreen({ accounts }: { accounts: Account[] }) {
    const router = useRouter();
    // const [accounts, setAccounts] = useState<Account[]>([]);

    // const getData = useCallback(() => {
    //     (async () => {
    //         const fetchedAccounts = await accountsCollection.query().fetch();
    //         setAccounts(fetchedAccounts);
    //     })();
    // }, []);

    // useFocusEffect(getData);

    return (
        <View
            style={styles.container}
        >
            <FlatList
                data={accounts}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={() => (
                    <View style={styles.card}>
                        <View style={styles.cardContent}>
                            <Text>Name</Text>
                            <Text>CAP</Text>
                            <Text>TAP</Text>
                        </View>
                    </View>
                )}
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


function AccountCard({ account }: { account: Account }) {
    return (
        <View style={styles.card}>
            <View style={styles.cardContent}>
                <Text>{account.name}</Text>
                <Text>{account.cap} %</Text>
                <Text>{account.tap} %</Text>
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

const enhance = withObservables(['account'], () => ({
    accounts: accountsCollection.query()
}))

const EnhancedAccountsScreen = enhance(AccountsScreen);

export default EnhancedAccountsScreen;
