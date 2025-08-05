import Button from "@/components/button";
import database, { accountsCollection, allocationsCollection } from "@/db";
import Account from "@/model/Account";
import { yupResolver } from "@hookform/resolvers/yup";
import { withObservables } from "@nozbe/watermelondb/react";
import { useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { InferType, number, object } from "yup";

const formSchema = object({
    income: number()
        .default(0)
        .transform((value) => Number(value))
        .required("Income is required"),
})

type FormType = InferType<typeof formSchema>;


function NewAllocationScreen({ accounts }: { accounts: Account[] }) {
    const router = useRouter();
    const { control, handleSubmit, formState: { errors }, reset, watch } = useForm({
        resolver: yupResolver(formSchema),
        mode: "onSubmit",
        defaultValues: formSchema.getDefault(),
    });
    const income = watch("income");

    const onSubmit = async (data: FormType) => {
        console.log("Form submitted with data:", data);
        try {
            await database.write(async () => {
                await allocationsCollection.create((allocation) => {
                    allocation.income = data.income;
                });
            });
            console.log("Allocation created successfully");
            router.replace("/allocations");
            reset(formSchema.getDefault());
        } catch (error) {
            console.error("Error creating allocation:", error);
        }
    };

    return (
        <KeyboardAvoidingView style={styles.container}>
            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                <Text
                    style={styles.label}
                >
                    Income:
                </Text>
                <Controller
                    control={control}
                    name="income"
                    render={({ field: { onChange, value } }) => (
                        <TextInput
                            style={styles.input}
                            placeholder="Income"
                            value={value?.toString()}
                            onChangeText={onChange}
                            keyboardType="numeric"
                        />
                    )}
                />
                {errors.income && <Text style={styles.error}>{errors.income.message}</Text>}
                {accounts.map((account) => (
                    <View key={account.id} style={{ marginBottom: 10, flexDirection: 'row' }}>
                        <Text >{account.name} : {account.cap}% </Text>
                        <Text >${(Number(income) * (account.cap ?? 0)) / 100}</Text>
                    </View>
                ))}

                <Button onPress={handleSubmit(onSubmit)} label="Save" />
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 10,
    },
    error: {
        color: 'red',
        marginBottom: 10,
        fontSize: 12,
        fontStyle: 'italic',
        marginLeft: 5,
    },
})

const enhance = withObservables([], () => ({
    accounts: accountsCollection.query(),
}));

export default enhance(NewAllocationScreen);