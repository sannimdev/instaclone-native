import React, { useEffect, useRef } from 'react';

import { gql, useMutation } from '@apollo/client';
import { useForm } from 'react-hook-form';
import AuthButton from '../components/auth/AuthButton';
import AuthLayout from '../components/auth/AuthLayout';
import { TextInput } from '../components/auth/AuthShared';

const CREATE_ACCOUNT_MUTATION = gql`
    mutation createAccount(
        $firstName: String!
        $lastName: String
        $username: String!
        $email: String!
        $password: String!
    ) {
        createAccount(
            firstName: $firstName
            lastName: $lastName
            username: $username
            email: $email
            password: $password
        ) {
            ok
            error
        }
    }
`;

export default function CreateAccount({ navigation }) {
    const { register, handleSubmit, setValue, getValues } = useForm();
    const onCompleted = (data) => {
        const {
            createAccount: { ok },
        } = data;
        if (ok) {
            const { username, password } = getValues();
            navigation.navigate('LogIn', { username, password });
        }
    };
    const [createAccountMutation, { loading }] = useMutation(CREATE_ACCOUNT_MUTATION, { onCompleted });
    const lastNameRef = useRef();
    const usernameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();

    const onNext = (nextOne) => {
        nextOne?.current?.focus();
    };

    const onValid = (data) => {
        if (!loading) {
            createAccountMutation({
                variables: {
                    ...data,
                },
            });
        }
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
            <AuthButton text="Create Account" loading={loading} onPress={handleSubmit(onValid)} />
        </AuthLayout>
    );
}
