import Button from "@/components/button";
import database, { accountsCollection } from "@/db";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput } from "react-native";
import { InferType, number, object, string } from "yup";

const formSchema = object({
    name: string()
        .min(2, "Name must be at least 2 characters")
        .default("")
        .required("Name is required"),
    cap: number()
        .optional()
        .default(0)
        .transform(value => (value ? Number(value) : undefined)),
    tap: number()
        .optional()
        .default(0)
        .transform(value => (value ? Number(value) : undefined)),
})

type FormType = InferType<typeof formSchema>;

export default function NewAccountScreen() {
    const router = useRouter();
    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(formSchema),
        mode: "onSubmit",
    });

    const onSubmit = async (data: FormType) => {
        console.log("Form submitted with data:", data);
        try {
            await database.write(async () => {
                await accountsCollection.create((account) => {
                    account.name = data.name;
                    account.cap = data.cap;
                    account.tap = data.tap;
                });
            });
            console.log("Account created successfully");
            router.replace("/accounts");
        } catch (error) {
            console.error("Error creating account:", error);
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
                    Name:
                </Text>
                <Controller
                    control={control}
                    name="name"
                    render={({ field: { onChange, value } }) => (
                        <TextInput
                            style={styles.input}
                            placeholder="Name"
                            value={value}
                            onChangeText={onChange}
                        />
                    )}
                />
                {errors.name && <Text style={styles.error}>{errors.name.message}</Text>}
                <Text
                    style={styles.label}
                >
                    CAP:
                </Text>
                <Controller
                    control={control}
                    name="cap"
                    render={({ field: { onChange, value } }) => (
                        <TextInput
                            style={styles.input}
                            placeholder="CAP"
                            value={value?.toString()}
                            onChangeText={onChange}
                            keyboardType="numeric"
                        />
                    )}
                />
                {errors.cap && <Text style={styles.error}>{errors.cap.message}</Text>}
                <Text
                    style={styles.label}
                >
                    TAP:
                </Text>
                <Controller
                    control={control}
                    name="tap"
                    render={({ field: { onChange, value } }) => (
                        <TextInput
                            style={styles.input}
                            placeholder="TAP"
                            value={value?.toString()}
                            onChangeText={onChange}
                            keyboardType="numeric"
                        />
                    )}
                />
                {errors.tap && <Text style={styles.error}>{errors.tap.message}</Text>}
                <Button onPress={handleSubmit(onSubmit)} label="Save" />
            </ScrollView>
        </KeyboardAvoidingView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
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