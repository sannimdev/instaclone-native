import React, { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import AuthButton from '../components/auth/AuthButton';
import AuthLayout from '../components/auth/AuthLayout';
import { TextInput } from '../components/auth/AuthShared';
import { gql, useMutation } from '@apollo/client';
import { logUserIn } from '../apollo';

const LOGIN_MUTATION = gql`
    mutation login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            ok
            token
            error
        }
    }
`;

export default function LogIn({ route: { params } }) {
    const { register, handleSubmit, setValue, watch } = useForm({
        defaultValues: {
            username: params?.username,
            password: params?.password,
        },
    });
    const onCompleted = async (data) => {
        const {
            login: { ok, token },
        } = data;
        if (ok) {
            await logUserIn(token);
        }
    };
    const [logInMutation, { loading, error }] = useMutation(LOGIN_MUTATION, { onCompleted });
    const passwordRef = useRef();
    const onNext = (nextOne) => {
        nextOne?.current?.focus();
    };
    const onValid = (data) => {
        if (!loading) {
            logInMutation({
                variables: {
                    ...data,
                },
            });
        }
    };

    useEffect(() => {
        register('username', { required: true });
        register('password', { required: true });
    }, [register]);

    return (
        <AuthLayout>
            <TextInput
                autoFocus
                value={watch('username')}
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
                value={watch('password')}
                placeholder="Password"
                placeholderTextColor="gray"
                secureTextEntry
                returnKeyType="done"
                placeholderTextColor={'rgba(255,255,255,0.6)'}
                lastOne={true}
                onChangeText={(text) => setValue('password', text)}
                onSubmitEditing={handleSubmit(onValid)}
            />
            <AuthButton
                text="Log In"
                disabled={!watch('username') || !watch('password')}
                onPress={handleSubmit(onValid)}
            />
        </AuthLayout>
    );
}
