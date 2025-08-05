import Button from "@/components/button";
import Card from "@/components/Card";
import Header from "@/components/Header";
import Input from "@/components/Input";
import database, { accountsCollection, allocationsCollection } from "@/db";
import Account from "@/model/Account";
import { globalStyles } from "@/styles/globalStyles";
import { theme } from "@/styles/theme";
import { yupResolver } from "@hookform/resolvers/yup";
import { withObservables } from "@nozbe/watermelondb/react";
import { useRouter } from "expo-router";
import { ArrowLeftIcon, DollarSignIcon } from "lucide-react-native";
import { Controller, useForm } from "react-hook-form";
import { KeyboardAvoidingView, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { InferType, number, object } from "yup";

const formSchema = object({
    income: number()
        .default(0)
        .transform((value) => Number(value))
        .required("Renda é obrigatória"),
})

type FormType = InferType<typeof formSchema>;

function NewAllocationScreen({ accounts }: { accounts: Account[] }) {
    const router = useRouter();
    const { control, handleSubmit, formState: { errors, isSubmitting }, reset, watch } = useForm({
        resolver: yupResolver(formSchema),
        mode: "onSubmit",
        defaultValues: formSchema.getDefault(),
    });
    const income = watch("income");

    const onSubmit = async (data: FormType) => {
        try {
            await database.write(async () => {
                await allocationsCollection.create((allocation) => {
                    allocation.income = data.income;
                });
            });
            router.replace("/allocations");
            reset(formSchema.getDefault());
        } catch (error) {
            console.error("Error creating allocation:", error);
        }
    };

    const totalPercentage = accounts.reduce((sum, account) => sum + (account.cap || 0), 0);

    return (
        <View style={globalStyles.container}>
            <Header
                title="Nova Alocação"
                subtitle="Registre sua nova renda"
                leftAction={
                    <Pressable
                        style={styles.backButton}
                        onPress={() => router.back()}
                    >
                        <ArrowLeftIcon size={20} color={theme.colors.text.primary} />
                    </Pressable>
                }
            />

            <KeyboardAvoidingView style={styles.content}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.form}>
                        <Card variant="elevated">
                            <Text style={styles.sectionTitle}>Informações da Renda</Text>

                            <Controller
                                control={control}
                                name="income"
                                render={({ field: { onChange, value } }) => (
                                    <Input
                                        label="Valor da Renda"
                                        placeholder="0,00"
                                        value={value?.toString()}
                                        onChangeText={onChange}
                                        keyboardType="numeric"
                                        error={errors.income?.message}
                                        leftIcon={<DollarSignIcon size={20} color={theme.colors.text.secondary} />}
                                    />
                                )}
                            />
                        </Card>

                        {accounts.length > 0 && (
                            <Card variant="elevated">
                                <Text style={styles.sectionTitle}>Distribuição por Conta</Text>

                                {totalPercentage !== 100 && (
                                    <View style={styles.warningContainer}>
                                        <Text style={styles.warningText}>
                                            ⚠️ Total das porcentagens: {totalPercentage}%
                                        </Text>
                                        <Text style={styles.warningSubtext}>
                                            Recomendamos que o total seja 100%
                                        </Text>
                                    </View>
                                )}

                                {accounts.map((account) => {
                                    const allocatedAmount = (Number(income) * (account.cap || 0)) / 100;

                                    return (
                                        <View key={account.id} style={styles.accountRow}>
                                            <View style={styles.accountInfo}>
                                                <Text style={styles.accountName}>{account.name}</Text>
                                                <Text style={styles.accountPercentage}>
                                                    {account.cap}%
                                                </Text>
                                            </View>
                                            <Text style={styles.accountValue}>
                                                R$ {allocatedAmount.toLocaleString('pt-BR', {
                                                    minimumFractionDigits: 2,
                                                    maximumFractionDigits: 2
                                                })}
                                            </Text>
                                        </View>
                                    );
                                })}
                            </Card>
                        )}

                        <Button
                            onPress={handleSubmit(onSubmit)}
                            label="Salvar Alocação"
                            loading={isSubmitting}
                            disabled={!income || income <= 0}
                        />
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },

    form: {
        padding: theme.spacing.md,
    },

    backButton: {
        padding: theme.spacing.sm,
        borderRadius: theme.borderRadius.full,
        backgroundColor: theme.colors.surfaceSecondary,
    },

    sectionTitle: {
        ...theme.typography.h3,
        color: theme.colors.text.primary,
        marginBottom: theme.spacing.md,
    },

    warningContainer: {
        backgroundColor: theme.colors.status.warning + '20',
        borderRadius: theme.borderRadius.sm,
        padding: theme.spacing.md,
        marginBottom: theme.spacing.md,
        borderLeftWidth: 4,
        borderLeftColor: theme.colors.status.warning,
    },

    warningText: {
        ...theme.typography.bodySmall,
        color: theme.colors.status.warning,
        fontWeight: '600',
    },

    warningSubtext: {
        ...theme.typography.caption,
        color: theme.colors.text.secondary,
        marginTop: theme.spacing.xs,
    },

    accountRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: theme.spacing.md,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border.light,
    },

    accountInfo: {
        flex: 1,
    },

    accountName: {
        ...theme.typography.body,
        color: theme.colors.text.primary,
        fontWeight: '500',
    },

    accountPercentage: {
        ...theme.typography.bodySmall,
        color: theme.colors.text.secondary,
        marginTop: theme.spacing.xs,
    },

    accountValue: {
        ...theme.typography.body,
        color: theme.colors.status.success,
        fontWeight: '600',
    },
});

const enhance = withObservables([], () => ({
    accounts: accountsCollection.query(),
}));

export default enhance(NewAllocationScreen);