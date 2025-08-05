import Button from '@/components/Button';
import Card from '@/components/Card';
import Header from '@/components/Header';
import database, { accountsCollection } from '@/db';
import Account from '@/model/Account';
import { globalStyles } from '@/styles/globalStyles';
import { theme } from '@/styles/theme';
import { withObservables } from '@nozbe/watermelondb/react';
import { useRouter } from 'expo-router';
import { PlusIcon, TrashIcon } from 'lucide-react-native';
import { Alert, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

function AccountsScreen({ accounts }: { accounts: Account[] }) {
    const router = useRouter();

    const totalCap = accounts.reduce((sum, account) => sum + (account.cap || 0), 0);
    const totalTap = accounts.reduce((sum, account) => sum + (account.tap || 0), 0);

    return (
        <View style={globalStyles.container}>
            <Header
                title="Contas"
                subtitle={`${accounts.length} contas configuradas`}
                rightAction={
                    <Pressable
                        style={styles.addButton}
                        onPress={() => router.push('/accounts/new')}
                    >
                        <PlusIcon size={20} color={theme.colors.text.inverse} />
                    </Pressable>
                }
            />

            <View style={styles.content}>
                {accounts.length === 0 ? (
                    <View style={styles.emptyState}>
                        <Text style={styles.emptyTitle}>Nenhuma conta encontrada</Text>
                        <Text style={styles.emptySubtitle}>
                            Configure suas contas para começar a alocar sua renda
                        </Text>
                        <Button
                            onPress={() => router.push('/accounts/new')}
                            label="Criar Conta"
                            style={styles.emptyButton}
                        />
                    </View>
                ) : (
                    <>
                        <Card variant="outlined" style={styles.summaryCard}>
                            <View style={styles.summaryRow}>
                                <View style={styles.summaryItem}>
                                    <Text style={styles.summaryLabel}>Total CAP</Text>
                                    <Text style={[
                                        styles.summaryValue,
                                        totalCap === 100 ? styles.summarySuccess : styles.summaryWarning
                                    ]}>
                                        {totalCap}%
                                    </Text>
                                </View>
                                <View style={styles.summaryDivider} />
                                <View style={styles.summaryItem}>
                                    <Text style={styles.summaryLabel}>Total TAP</Text>
                                    <Text style={styles.summaryValue}>{totalTap}%</Text>
                                </View>
                            </View>
                        </Card>

                        <FlatList
                            data={accounts}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item }) => (
                                <AccountCard account={item} />
                            )}
                            keyExtractor={(item) => item.id}
                            contentContainerStyle={styles.list}
                            ListHeaderComponent={
                                <Card variant="outlined" style={styles.headerCard}>
                                    <View style={styles.headerRow}>
                                        <Text style={styles.headerText}>Nome</Text>
                                        <Text style={styles.headerText}>CAP</Text>
                                        <Text style={styles.headerText}>TAP</Text>
                                        <Text style={styles.headerText}>Ação</Text>
                                    </View>
                                </Card>
                            }
                        />
                    </>
                )}
            </View>
        </View>
    );
}

function AccountCard({ account }: { account: Account }) {
    async function handleDelete() {
        Alert.alert(
            'Confirmar exclusão',
            'Tem certeza de que deseja excluir esta conta?',
            [
                {
                    text: 'Cancelar',
                    style: 'cancel',
                },
                {
                    text: 'Excluir',
                    style: 'destructive',
                    onPress: async () => {
                        await database.write(async () => {
                            await account.markAsDeleted();
                        });
                    },
                },
            ]
        );
    }

    return (
        <Card>
            <View style={styles.cardRow}>
                <View style={styles.accountNameContainer}>
                    <Text style={styles.accountName}>{account.name}</Text>
                </View>

                <View style={styles.percentageContainer}>
                    <Text style={styles.percentageValue}>{account.cap || 0}%</Text>
                </View>

                <View style={styles.percentageContainer}>
                    <Text style={styles.percentageValue}>{account.tap || 0}%</Text>
                </View>

                <Pressable style={styles.deleteButton} onPress={handleDelete}>
                    <TrashIcon size={18} color={theme.colors.text.inverse} />
                </Pressable>
            </View>
        </Card>
    );
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },

    list: {
        padding: theme.spacing.md,
    },

    addButton: {
        backgroundColor: theme.colors.primary,
        borderRadius: theme.borderRadius.full,
        padding: theme.spacing.sm,
        ...theme.shadows.md,
    },

    summaryCard: {
        backgroundColor: theme.colors.surfaceSecondary,
        margin: theme.spacing.md,
        marginBottom: 0,
    },

    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },

    summaryItem: {
        alignItems: 'center',
        flex: 1,
    },

    summaryLabel: {
        ...theme.typography.caption,
        color: theme.colors.text.secondary,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
        marginBottom: theme.spacing.xs,
    },

    summaryValue: {
        ...theme.typography.h2,
        color: theme.colors.text.primary,
        fontWeight: 'bold',
    },

    summarySuccess: {
        color: theme.colors.status.success,
    },

    summaryWarning: {
        color: theme.colors.status.warning,
    },

    summaryDivider: {
        width: 1,
        height: 40,
        backgroundColor: theme.colors.border.light,
    },

    headerCard: {
        backgroundColor: theme.colors.surfaceSecondary,
    },

    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    headerText: {
        ...theme.typography.bodySmall,
        fontWeight: '600',
        color: theme.colors.text.secondary,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
        flex: 1,
        textAlign: 'center',
    },

    cardRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    accountNameContainer: {
        flex: 2,
    },

    accountName: {
        ...theme.typography.body,
        color: theme.colors.text.primary,
        fontWeight: '500',
    },

    percentageContainer: {
        flex: 1,
        alignItems: 'center',
    },

    percentageValue: {
        ...theme.typography.body,
        color: theme.colors.primary,
        fontWeight: '600',
    },

    deleteButton: {
        backgroundColor: theme.colors.status.error,
        borderRadius: theme.borderRadius.sm,
        padding: theme.spacing.sm,
        ...theme.shadows.sm,
        marginLeft: theme.spacing.md,
    },

    emptyState: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: theme.spacing.xl,
    },

    emptyTitle: {
        ...theme.typography.h3,
        color: theme.colors.text.primary,
        textAlign: 'center',
        marginBottom: theme.spacing.sm,
    },

    emptySubtitle: {
        ...theme.typography.body,
        color: theme.colors.text.secondary,
        textAlign: 'center',
        marginBottom: theme.spacing.xl,
    },

    emptyButton: {
        maxWidth: 200,
    },
});

const enhance = withObservables(['account'], () => ({
    accounts: accountsCollection.query()
}))

const EnhancedAccountsScreen = enhance(AccountsScreen);

export default EnhancedAccountsScreen;
