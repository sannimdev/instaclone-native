import React, { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import AuthButton from '../components/auth/AuthButton';
import AuthLayout from '../components/auth/AuthLayout';
import { TextInput } from '../components/auth/AuthShared';

export default function LogIn({ navigation }) {
    const { register, handleSubmit, setValue } = useForm();
    const passwordRef = useRef();
    const onNext = (nextOne) => {
        nextOne?.current?.focus();
    };
    const onValid = (data) => {
        console.log(data);
    };

    useEffect(() => {
        register('username');
        register('password');
    }, [register]);

    return (
        <AuthLayout>
            <TextInput
                autoFocus
                placeholder="Username"
                placeholderTextColor="gray"
                autoCapitalize="none"
                returnKeyType="next"
                placeholderTextColor={'rgba(255,255,255,0.6)'}
                onSubmitEditing={() => onNext(passwordRef)}
                onChangeText={(text) => setValue('username', text)}
            />
            <TextInput
                ref={passwordRef}
                placeholder="Password"
                placeholderTextColor="gray"
                secureTextEntry
                returnKeyType="done"
                placeholderTextColor={'rgba(255,255,255,0.6)'}
                lastOne={true}
                onChangeText={(text) => setValue('password', text)}
                onSubmitEditing={handleSubmit(onValid)}
            />
            <AuthButton text="Log In" disabled={false} onPress={handleSubmit(onValid)} />
        </AuthLayout>
    );
}
