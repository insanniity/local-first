import Button from "@/components/button";
import database, { allocationsCollection } from "@/db";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { InferType, number, object } from "yup";

const formSchema = object({
    income: number()
        .default(0)
        .transform((value) => Number(value))
        .required("Income is required"),
})

type FormType = InferType<typeof formSchema>;


export default function NewAllocationScreen() {
    const router = useRouter();
    const { control, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(formSchema),
        mode: "onSubmit",
        defaultValues: formSchema.getDefault(),
    });

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
        <View
            style={styles.container}
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
            <Button onPress={handleSubmit(onSubmit)} label="Save" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
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