import { withObservables } from "@nozbe/watermelondb/react";
import { useRouter } from "expo-router";
import { FolderTreeIcon, PlusIcon, TrendingUpIcon, WalletIcon } from "lucide-react-native";
import moment from "moment";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Card, Header } from "../components";
import { accountsCollection, allocationsCollection } from "../db";
import Account from "../model/Account";
import Allocation from "../model/Allocation";
import { globalStyles } from "../styles/globalStyles";
import { theme } from "../styles/theme";
import { formatCurrency, formatDate } from "../utils/formatters";

type HomeScreenProps = {
  accounts: Account[];
  allocations: Allocation[];
};

function HomeScreen({ accounts, allocations }: HomeScreenProps) {
  const router = useRouter();

  // Calcular estatísticas
  const totalAllocation = allocations.reduce((sum, allocation) => sum + (allocation.income || 0), 0);
  const totalCap = accounts.reduce((sum, account) => sum + (account.cap || 0), 0);
  const lastAllocation = allocations[0]; // já ordenado por data desc
  const monthlyAllocations = allocations.filter(allocation =>
    moment(allocation.createdAt).isSame(moment(), 'month')
  );
  const monthlyTotal = monthlyAllocations.reduce((sum, allocation) => sum + (allocation.income || 0), 0);

  return (
    <View style={globalStyles.container}>
      <Header
        title="Dashboard"
        subtitle="Visão geral dos seus investimentos"
      />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Cards de estatísticas rápidas */}
        <View style={styles.statsGrid}>
          <Card style={styles.statCard}>
            <View style={styles.statContent}>
              <TrendingUpIcon size={24} color={theme.colors.status.success} />
              <View style={styles.statInfo}>
                <Text style={styles.statValue}>
                  {formatCurrency(totalAllocation)}
                </Text>
                <Text style={styles.statLabel}>Total Alocado</Text>
              </View>
            </View>
          </Card>

          <Card style={styles.statCard}>
            <View style={styles.statContent}>
              <WalletIcon size={24} color={theme.colors.primary} />
              <View style={styles.statInfo}>
                <Text style={styles.statValue}>{accounts.length}</Text>
                <Text style={styles.statLabel}>Contas Ativas</Text>
              </View>
            </View>
          </Card>
        </View>

        <View style={styles.statsGrid}>
          <Card style={styles.statCard}>
            <View style={styles.statContent}>
              <FolderTreeIcon size={24} color={theme.colors.accent} />
              <View style={styles.statInfo}>
                <Text style={styles.statValue}>{allocations.length}</Text>
                <Text style={styles.statLabel}>Total Alocações</Text>
              </View>
            </View>
          </Card>

          <Card style={styles.statCard}>
            <View style={styles.statContent}>
              <TrendingUpIcon size={24} color={theme.colors.secondary} />
              <View style={styles.statInfo}>
                <Text style={styles.statValue}>
                  {formatCurrency(monthlyTotal)}
                </Text>
                <Text style={styles.statLabel}>Este Mês</Text>
              </View>
            </View>
          </Card>
        </View>

        {/* Status das configurações */}
        <View style={{ paddingHorizontal: theme.spacing.md, marginBottom: theme.spacing.sm }}>
          <Card variant="elevated">
            <Text style={styles.sectionTitle}>Status das Configurações</Text>

            <View style={styles.statusRow}>
              <View style={styles.statusItem}>
                <View style={[
                  styles.statusIndicator,
                  { backgroundColor: totalCap === 100 ? theme.colors.status.success : theme.colors.status.warning }
                ]} />
                <Text style={styles.statusText}>
                  CAP Total: {totalCap}%
                </Text>
              </View>

              {totalCap !== 100 && (
                <Text style={styles.statusWarning}>
                  {totalCap < 100 ? 'Configure mais contas para atingir 100%' : 'Total excede 100%'}
                </Text>
              )}
            </View>
          </Card>
          {/* Última alocação */}
          {lastAllocation && (
            <Card variant="elevated">
              <Text style={styles.sectionTitle}>Última Alocação</Text>
              <View style={styles.lastAllocationContent}>
                <View>
                  <Text style={styles.lastAllocationValue}>
                    {formatCurrency(lastAllocation.income || 0)}
                  </Text>
                  <Text style={styles.lastAllocationDate}>
                    {formatDate(lastAllocation.createdAt || new Date())}
                  </Text>
                </View>
              </View>
            </Card>
          )}

          {/* Ações rápidas */}
          <Card variant="elevated">
            <Text style={styles.sectionTitle}>Ações Rápidas</Text>

            <View style={styles.quickActions}>
              <Pressable
                style={styles.quickAction}
                onPress={() => router.push('/allocations/new')}
              >
                <PlusIcon size={20} color={theme.colors.text.inverse} />
                <Text style={styles.quickActionText}>Nova Alocação</Text>
              </Pressable>

              <Pressable
                style={[styles.quickAction, styles.quickActionSecondary]}
                onPress={() => router.push('/accounts/new')}
              >
                <PlusIcon size={20} color={theme.colors.primary} />
                <Text style={styles.quickActionTextSecondary}>Nova Conta</Text>
              </Pressable>
            </View>
          </Card>

          {/* Estado vazio */}
          {accounts.length === 0 && allocations.length === 0 && (
            <Card variant="outlined" style={styles.emptyState}>
              <Text style={styles.emptyTitle}>Bem-vindo!</Text>
              <Text style={styles.emptySubtitle}>
                Comece configurando suas contas de investimento e fazendo sua primeira alocação.
              </Text>
              <Pressable
                style={styles.emptyAction}
                onPress={() => router.push('/accounts/new')}
              >
                <Text style={styles.emptyActionText}>Configurar Primeira Conta</Text>
              </Pressable>
            </Card>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },

  statsGrid: {
    flexDirection: 'row',
    paddingHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.sm,
    gap: theme.spacing.sm,
    marginTop: theme.spacing.md,
  },

  statCard: {
    flex: 1,
    padding: theme.spacing.lg,
  },

  statContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  statInfo: {
    marginLeft: theme.spacing.md,
    flex: 1,
  },

  statValue: {
    ...theme.typography.h3,
    color: theme.colors.text.primary,
    fontWeight: 'bold',
  },

  statLabel: {
    ...theme.typography.caption,
    color: theme.colors.text.secondary,
    marginTop: theme.spacing.xs,
  },

  sectionTitle: {
    ...theme.typography.h3,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.md,
  },

  statusRow: {
    marginBottom: theme.spacing.sm,
  },

  statusItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
  },

  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: theme.spacing.sm,
  },

  statusText: {
    ...theme.typography.body,
    color: theme.colors.text.primary,
    fontWeight: '500',
  },

  statusWarning: {
    ...theme.typography.bodySmall,
    color: theme.colors.status.warning,
    marginLeft: theme.spacing.lg,
  },

  lastAllocationContent: {
    alignItems: 'flex-start',
  },

  lastAllocationValue: {
    ...theme.typography.h2,
    color: theme.colors.status.success,
    fontWeight: 'bold',
  },

  lastAllocationDate: {
    ...theme.typography.bodySmall,
    color: theme.colors.text.secondary,
    marginTop: theme.spacing.xs,
  },

  quickActions: {
    flexDirection: 'row',
    gap: theme.spacing.md,
  },

  quickAction: {
    flex: 1,
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.shadows.sm,
  },

  quickActionSecondary: {
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.primary,
  },

  quickActionText: {
    ...theme.typography.button,
    color: theme.colors.text.inverse,
    marginLeft: theme.spacing.sm,
  },

  quickActionTextSecondary: {
    ...theme.typography.button,
    color: theme.colors.primary,
    marginLeft: theme.spacing.sm,
  },

  emptyState: {
    margin: theme.spacing.md,
    padding: theme.spacing.xl,
    alignItems: 'center',
  },

  emptyTitle: {
    ...theme.typography.h2,
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

  emptyAction: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    paddingHorizontal: theme.spacing.xl,
  },

  emptyActionText: {
    ...theme.typography.button,
    color: theme.colors.text.inverse,
  },
});

const enhance = withObservables([], () => ({
  accounts: accountsCollection.query(),
  allocations: allocationsCollection.query().observe(),
}));

export default enhance(HomeScreen);
