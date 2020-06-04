import React from 'react';
import styled from 'styled-components';

const Ride = styled.div`
    display: flex;
    border: 2px solid #7f8c8d;
    border-radius: 8px;
    padding: 12px;
    margin-bottom: 25px;
    & i {
        font-size: 12px;
    }
`;

const Container = styled.div`
    margin-left: 10px;
`;

const Name = styled.span`
    display: block;
    padding-bottom: 5px;
`;

const Address = styled.span`
    color: ${(props) => props.theme.greyColor};
    font-size: 14px;
`;

const RidePresenter: React.FC<any> = ({
    status,
    price,
    distance,
    dropOffAddress,
    pickUpAddress,
}) => (
    <Ride>
        <Container>
            <Name>Откуда</Name>
            <Address>{pickUpAddress}</Address>
        </Container>
        <Container>
            <Name>Куда</Name>
            <Address>{dropOffAddress}</Address>
        </Container>
        <Container>
            <Name>Цена</Name>
            <Address>{price}</Address>
        </Container>
        <Container>
            <Name>Расстояние</Name>
            <Address>{distance}</Address>
        </Container>
        <Container>
            <Name>Статус</Name>
            <Address>{status}</Address>
        </Container>
    </Ride>
);

export default RidePresenter;
