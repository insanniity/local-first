import Button from "@/components/button";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { KeyboardAvoidingView, ScrollView, StyleSheet, TextInput } from "react-native";
import { InferType, object, string } from "yup";

const formSchema = object({
    name: string().min(2, "Name must be at least 2 characters").required("Name is required"),
    cap: string().optional(),
    tap: string().optional(),
});

type FormType = InferType<typeof formSchema>;

export default function NewAccountScreen() {
    const { control, handleSubmit } = useForm({
        resolver: yupResolver(formSchema),
        mode: "onSubmit",
        defaultValues: {
            name: "",
            cap: "",
            tap: "",
        }
    });

    const onSubmit = (data: FormType) => {
        console.log("Form submitted with data:", data);
        // Handle form submission logic here
    }



    return (
        <KeyboardAvoidingView style={styles.container}>
            <ScrollView
                showsVerticalScrollIndicator={false}
            >
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
                <Controller
                    control={control}
                    name="cap"
                    render={({ field: { onChange, value } }) => (
                        <TextInput
                            style={styles.input}
                            placeholder="CAP"
                            value={value}
                            onChangeText={onChange}
                            keyboardType="numeric"
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="tap"
                    render={({ field: { onChange, value } }) => (
                        <TextInput
                            style={styles.input}
                            placeholder="TAP"
                            value={value}
                            onChangeText={onChange}
                            keyboardType="numeric"
                        />
                    )}
                />
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
    }
})