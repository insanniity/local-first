import Button from "@/components/button";
import Card from "@/components/Card";
import Header from "@/components/Header";
import database, { allocationsCollection } from "@/db";
import Allocation from "@/model/Allocation";
import { globalStyles } from "@/styles/globalStyles";
import { theme } from "@/styles/theme";
import { Q } from "@nozbe/watermelondb";
import { withObservables } from "@nozbe/watermelondb/react";
import { useRouter } from "expo-router";
import { PlusIcon, TrashIcon } from "lucide-react-native";
import moment from "moment";
import { Alert, FlatList, Pressable, StyleSheet, Text, View } from "react-native";

function AllocationsScreen({ allocations }: { allocations: Allocation[] }) {
    const router = useRouter();

    return (
        <View style={globalStyles.container}>
            <Header
                title="Alocações"
                subtitle={`${allocations.length} registros`}
                rightAction={
                    <Pressable
                        style={styles.addButton}
                        onPress={() => router.push('/allocations/new')}
                    >
                        <PlusIcon size={20} color={theme.colors.text.inverse} />
                    </Pressable>
                }
            />

            <View style={styles.content}>
                {allocations.length === 0 ? (
                    <View style={styles.emptyState}>
                        <Text style={styles.emptyTitle}>Nenhuma alocação encontrada</Text>
                        <Text style={styles.emptySubtitle}>
                            Comece criando sua primeira alocação de renda
                        </Text>
                        <Button
                            onPress={() => router.push('/allocations/new')}
                            label="Criar Alocação"
                            style={styles.emptyButton}
                        />
                    </View>
                ) : (
                    <FlatList
                        data={allocations}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => (
                            <AllocationCard allocation={item} />
                        )}
                        keyExtractor={(item) => item.id}
                        contentContainerStyle={styles.list}
                        ListHeaderComponent={
                            <Card variant="outlined" style={styles.headerCard}>
                                <View style={styles.headerRow}>
                                    <Text style={styles.headerText}>Data</Text>
                                    <Text style={styles.headerText}>Renda</Text>
                                    <Text style={styles.headerText}>Ação</Text>
                                </View>
                            </Card>
                        }
                    />
                )}
            </View>
        </View>
    )
}

function AllocationCard({ allocation }: { allocation: Allocation }) {
    async function handleDelete() {
        Alert.alert(
            'Confirmar exclusão',
            'Tem certeza de que deseja excluir esta alocação?',
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
                            await allocation.markAsDeleted();
                        });
                    },
                },
            ]
        );
    }

    return (
        <Card>
            <View style={styles.cardRow}>
                <Text style={styles.dateText}>
                    {moment(allocation.createdAt).format('DD/MM/YYYY')}
                </Text>

                <View style={styles.incomeContainer}>
                    <Text style={styles.currencySymbol}>R$</Text>
                    <Text style={styles.incomeValue}>
                        {(allocation.income || 0).toLocaleString('pt-BR', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                        })}
                    </Text>
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
    },

    cardRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    dateText: {
        ...theme.typography.body,
        color: theme.colors.text.primary,
        fontWeight: '500',
    },

    incomeContainer: {
        flexDirection: 'row',
        alignItems: 'baseline',
    },

    currencySymbol: {
        ...theme.typography.bodySmall,
        color: theme.colors.text.secondary,
        marginRight: theme.spacing.xs,
    },

    incomeValue: {
        ...theme.typography.body,
        color: theme.colors.status.success,
        fontWeight: '600',
    },

    deleteButton: {
        backgroundColor: theme.colors.status.error,
        borderRadius: theme.borderRadius.sm,
        padding: theme.spacing.sm,
        ...theme.shadows.sm,
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

const enhance = withObservables(['allocations'], () => ({
    allocations: allocationsCollection.query(Q.sortBy('created_at', Q.desc)),
}))

const EnhancedAllocationsScreen = enhance(AllocationsScreen);

export default EnhancedAllocationsScreen;