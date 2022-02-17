import React from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { colors } from '../colors';

const Container = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
    background-color: black;
    padding: 0 40px;
`;

const Logo = styled.Image`
    max-width: 50%;
    height: 100px;
`;

const CreateAccount = styled.TouchableOpacity`
    background-color: ${colors.blue};
    margin-top: 20px;
    padding: 13px 10px;
    border-radius: 5px;
    font-weight: 600;
    width: 100%;
    opacity: ${(props) => (props.disabled ? '0.5' : '1')};
`;

/* text 관련 속성은 Text에서만 사용하도록 */
const CreateAccountText = styled.Text`
    color: white;
    font-size: 16px;
    text-align: center;
`;

const LoginLink = styled.Text`
    color: ${colors.blue};
    font-weight: 600;
    margin-top: 10px;
`;

export default function Welcome({ navigation }) {
    const goToCreateAccount = () => navigation.navigate('CreateAccount');
    const goToLogin = () => navigation.navigate('LogIn', { username: 'nomad', password: '1234' });
    return (
        <Container>
            <Logo resizeMode="contain" source={require('../assets/logo.png')} />
            <CreateAccount disabled={false} onPress={goToCreateAccount}>
                <CreateAccountText>Create Account</CreateAccountText>
            </CreateAccount>
            <TouchableOpacity onPress={goToLogin}>
                <LoginLink>Log in</LoginLink>
            </TouchableOpacity>
        </Container>
    );
}
