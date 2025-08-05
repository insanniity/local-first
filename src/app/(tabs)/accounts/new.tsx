import Button from "@/components/Button";
import Card from "@/components/Card";
import Header from "@/components/Header";
import Input from "@/components/Input";
import database, { accountsCollection } from "@/db";
import { globalStyles } from "@/styles/globalStyles";
import { theme } from "@/styles/theme";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "expo-router";
import { ArrowLeftIcon, PercentIcon, UserIcon } from "lucide-react-native";
import { Controller, useForm } from "react-hook-form";
import { KeyboardAvoidingView, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { InferType, number, object, string } from "yup";

const formSchema = object({
    name: string()
        .min(2, "Nome deve ter pelo menos 2 caracteres")
        .default("")
        .required("Nome é obrigatório"),
    cap: number()
        .optional()
        .default(0)
        .transform(value => (value ? Number(value) : undefined))
        .min(0, "CAP deve ser maior ou igual a 0")
        .max(100, "CAP deve ser menor ou igual a 100"),
    tap: number()
        .optional()
        .default(0)
        .transform(value => (value ? Number(value) : undefined))
        .min(0, "TAP deve ser maior ou igual a 0")
        .max(100, "TAP deve ser menor ou igual a 100"),
})

type FormType = InferType<typeof formSchema>;

export default function NewAccountScreen() {
    const router = useRouter();
    const { control, handleSubmit, formState: { errors, isSubmitting }, reset, watch } = useForm({
        resolver: yupResolver(formSchema),
        mode: "onSubmit",
        defaultValues: formSchema.getDefault(),
    });

    const capValue = watch("cap");
    const tapValue = watch("tap");

    const onSubmit = async (data: FormType) => {
        try {
            await database.write(async () => {
                await accountsCollection.create((account) => {
                    account.name = data.name;
                    account.cap = data.cap;
                    account.tap = data.tap;
                });
            });
            router.replace("/accounts");
            reset(formSchema.getDefault());
        } catch (error) {
            console.error("Error creating account:", error);
        }
    };

    return (
        <View style={globalStyles.container}>
            <Header
                title="Nova Conta"
                subtitle="Configure uma nova conta de investimento"
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
                            <Text style={styles.sectionTitle}>Informações da Conta</Text>

                            <Controller
                                control={control}
                                name="name"
                                render={({ field: { onChange, value } }) => (
                                    <Input
                                        label="Nome da Conta"
                                        placeholder="Ex: Conta Corrente, Poupança..."
                                        value={value}
                                        onChangeText={onChange}
                                        error={errors.name?.message}
                                        leftIcon={<UserIcon size={20} color={theme.colors.text.secondary} />}
                                    />
                                )}
                            />
                        </Card>

                        <Card variant="elevated">
                            <Text style={styles.sectionTitle}>Configuração de Percentuais</Text>
                            <Text style={styles.sectionSubtitle}>
                                Configure as porcentagens de alocação para esta conta
                            </Text>

                            <Controller
                                control={control}
                                name="cap"
                                render={({ field: { onChange, value } }) => (
                                    <Input
                                        label="CAP (Capital Allocation Percentage)"
                                        placeholder="0"
                                        value={value?.toString()}
                                        onChangeText={onChange}
                                        keyboardType="numeric"
                                        error={errors.cap?.message}
                                        helperText="Porcentagem da renda alocada para esta conta"
                                        leftIcon={<PercentIcon size={20} color={theme.colors.text.secondary} />}
                                    />
                                )}
                            />

                            <Controller
                                control={control}
                                name="tap"
                                render={({ field: { onChange, value } }) => (
                                    <Input
                                        label="TAP (Target Allocation Percentage)"
                                        placeholder="0"
                                        value={value?.toString()}
                                        onChangeText={onChange}
                                        keyboardType="numeric"
                                        error={errors.tap?.message}
                                        helperText="Meta de porcentagem para rebalanceamento"
                                        leftIcon={<PercentIcon size={20} color={theme.colors.text.secondary} />}
                                    />
                                )}
                            />
                        </Card>

                        {(capValue || tapValue) && (
                            <Card variant="outlined" style={styles.previewCard}>
                                <Text style={styles.previewTitle}>Prévia da Configuração</Text>

                                <View style={styles.previewRow}>
                                    <Text style={styles.previewLabel}>CAP:</Text>
                                    <Text style={styles.previewValue}>{capValue || 0}%</Text>
                                </View>

                                <View style={styles.previewRow}>
                                    <Text style={styles.previewLabel}>TAP:</Text>
                                    <Text style={styles.previewValue}>{tapValue || 0}%</Text>
                                </View>

                                <Text style={styles.previewExample}>
                                    Com uma renda de R$ 1.000,00, esta conta receberá R$ {((capValue || 0) * 10).toFixed(2)}
                                </Text>
                            </Card>
                        )}

                        <Button
                            onPress={handleSubmit(onSubmit)}
                            label="Salvar Conta"
                            loading={isSubmitting}
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
        marginBottom: theme.spacing.sm,
    },

    sectionSubtitle: {
        ...theme.typography.bodySmall,
        color: theme.colors.text.secondary,
        marginBottom: theme.spacing.lg,
    },

    previewCard: {
        backgroundColor: theme.colors.surfaceSecondary,
    },

    previewTitle: {
        ...theme.typography.body,
        color: theme.colors.text.primary,
        fontWeight: '600',
        marginBottom: theme.spacing.md,
    },

    previewRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: theme.spacing.sm,
    },

    previewLabel: {
        ...theme.typography.body,
        color: theme.colors.text.secondary,
    },

    previewValue: {
        ...theme.typography.body,
        color: theme.colors.primary,
        fontWeight: '600',
    },

    previewExample: {
        ...theme.typography.caption,
        color: theme.colors.text.tertiary,
        marginTop: theme.spacing.sm,
        fontStyle: 'italic',
    },
});