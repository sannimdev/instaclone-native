import React, { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import AuthButton from '../components/auth/AuthButton';
import AuthLayout from '../components/auth/AuthLayout';
import { TextInput } from '../components/auth/AuthShared';

export default function CreateAccount() {
    const { register, handleSubmit, setValue } = useForm();
    const lastNameRef = useRef();
    const usernameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();

    const onNext = (nextOne) => {
        nextOne?.current?.focus();
    };

    const onValid = (data) => {
        console.log(data);
    };

    useEffect(() => {
        register('firstName', { required: true });
        register('lastName', { required: true });
        register('username', { required: true });
        register('email', { required: true });
        register('password', { required: true });
    }, [register]);

    return (
        <AuthLayout>
            <TextInput
                autoFocus
                placeholder="First Name"
                placeholderTextColor="gray"
                returnKeyType="next"
                placeholderTextColor={'rgba(255,255,255,0.6)'}
                onChangeText={(text) => setValue('firstName', text)}
                onSubmitEditing={() => onNext(lastNameRef)}
            />
            <TextInput
                ref={lastNameRef}
                placeholder="Last Name"
                placeholderTextColor="gray"
                returnKeyType="next"
                placeholderTextColor={'rgba(255,255,255,0.6)'}
                onChangeText={(text) => setValue('lastName', text)}
                onSubmitEditing={() => onNext(usernameRef)}
            />
            <TextInput
                ref={usernameRef}
                placeholder="Username"
                placeholderTextColor="gray"
                returnKeyType="next"
                placeholderTextColor={'rgba(255,255,255,0.6)'}
                onChangeText={(text) => setValue('username', text)}
                onSubmitEditing={() => onNext(emailRef)}
            />
            <TextInput
                ref={emailRef}
                placeholder="Email"
                placeholderTextColor="gray"
                keyboardType="email-address"
                returnKeyType="next"
                placeholderTextColor={'rgba(255,255,255,0.6)'}
                onChangeText={(text) => setValue('email', text)}
                onSubmitEditing={() => onNext(passwordRef)}
            />
            <TextInput
                ref={passwordRef}
                placeholder="Password"
                placeholderTextColor="gray"
                secureTextEntry
                returnKeyType="done"
                placeholderTextColor={'rgba(255,255,255,0.6)'}
                onChangeText={(text) => setValue('password', text)}
                onSubmitEditing={handleSubmit(onValid)}
                lastOne={true}
            />
            <AuthButton text="Create Account" loading onPress={handleSubmit(onValid)} />
        </AuthLayout>
    );
}
