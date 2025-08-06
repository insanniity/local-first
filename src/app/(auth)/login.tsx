import { Button, Input } from "@/components";
import { supabase } from "@/lib/supabase";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { Alert, AppState, StyleSheet, Text, View } from "react-native";
import { object, string } from "yup";


AppState.addEventListener('change', (state) => {
    if (state === 'active') {
        supabase.auth.startAutoRefresh()
    } else {
        supabase.auth.stopAutoRefresh()
    }
})

const formSchmema = object({
    email: string().email('Email inválido').required('Email é obrigatório'),
    password: string().min(6, 'Senha deve ter pelo menos 6 caracteres').required('Senha é obrigatória'),
});

type FormType = {
    email: string;
    password: string;
};

export default function LoginScreen() {
    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(formSchmema),
        defaultValues: {
            email: __DEV__ ? 'contato@insannity.dev' : '',
            password: __DEV__ ? '123456' : '',
        }
    });


    const onSubmit = handleSubmit(async (data: FormType) => {
        const { email, password } = data;
        const { error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        })
        if (error) Alert.alert(error.message)
    });


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <View style={[styles.verticallySpaced, styles.mt20]}>
                <Controller
                    control={control}
                    name="email"
                    render={({ field: { onChange, value } }) => (
                        <Input
                            label="Email"
                            onChangeText={onChange}
                            value={value}
                            placeholder="email@address.com"
                            autoCapitalize={'none'}
                        />
                    )}
                />
                {errors.email && <Text style={{ color: 'red' }}>{errors.email.message}</Text>}
            </View>
            <View style={styles.verticallySpaced}>
                <Controller
                    control={control}
                    name="password"
                    render={({ field: { onChange, value } }) => (
                        <Input
                            label="Senha"
                            onChangeText={onChange}
                            value={value}
                            secureTextEntry
                            placeholder="********"
                        />
                    )}
                />
                {errors.password && <Text style={{ color: 'red' }}>{errors.password.message}</Text>}
            </View>
            <View style={[styles.verticallySpaced, styles.mt20]}>
                <Button label="Entrar" onPress={onSubmit} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    verticallySpaced: {
        paddingTop: 4,
        paddingBottom: 4,
        alignSelf: 'stretch',
    },
    mt20: {
        marginTop: 20,
    },
})