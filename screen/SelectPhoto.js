import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import * as MediaLibrary from 'expo-media-library';

const Container = styled.View`
    flex: 1;
    background-color: black;
`;

const Top = styled.View`
    flex: 1;
    background-color: black;
`;

const Bottom = styled.View`
    flex: 1;
    background-color: black;
`;
export default function SelectPhoto() {
    const [ok, setOk] = useState(false);
    const [photos, setPhotos] = useState([]);
    const getPhotos = async () => {
        if (ok) {
            const { assets: photos } = await MediaLibrary.getAssetsAsync();
            setPhotos(photos);
        }
    };
    const getPermissions = async () => {
        const { granted, canAskAgain } = await MediaLibrary.getPermissionsAsync();
        if (!granted && canAskAgain) {
            const { granted } = await MediaLibrary.requestPermissionsAsync();
            granted && setOk(true);
        } else if (granted) {
            setOk(true);
        }
    };

    useEffect(() => {
        getPermissions();
        getPhotos();
    }, [ok]);

    return (
        <Container>
            <Top />
            <Bottom>{/*...*/}</Bottom>
        </Container>
    );
}
