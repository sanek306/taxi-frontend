import React, { forwardRef } from 'react';
import { Helmet } from 'react-helmet';
import Sidebar from 'react-sidebar';
import AddressBar from '../../Components/AddressBar';
import Button from '../../Components/Button';
import Menu from '../../Components/Menu';
import RidePopUp from '../../Components/RidePopUp';
import styled from 'styled-components';
import Loader from 'react-loader-spinner';

const Container = styled.div``;

const LoaderContainer = styled.div`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
`;

const MenuButton = styled.button`
    appearance: none;
    padding: 10px;
    position: absolute;
    top: 10px;
    left: 10px;
    text-align: center;
    font-weight: 800;
    border: 0;
    cursor: pointer;
    font-size: 20px;
    transform: rotate(90deg);
    z-index: 2;
    background-color: transparent;
`;

const Map = styled.div`
    position: absolute;
    height: 100%;
    width: 100%;
    z-index: 1;
`;

const ExtendedButton = styled(Button)`
    position: absolute;
    bottom: 50px;
    left: 0;
    right: 0;
    margin: auto;
    z-index: 10;
    height: auto;
    width: 80%;
`;

const RequestButton = styled(Button)`
    position: absolute;
    left: 0;
    right: 0;
    margin: auto;
    z-index: 10;
    height: auto;
    width: 80%;
    bottom: 250px;
`;

interface IProps {
    isMenuOpen: boolean;
    toggleMenu: () => void;
    loading: boolean;
    mapRef: any;
    ref: any;
    toAddress: string;
    onAddressSubmit: () => void;
    price?: string;
    data?: any;
    onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    requestRideFn?: any;
    acceptRideFn?: any;
    nearbyRide?: any;
    loadMap: any;
}

const HomePresenter: React.FC<IProps> = forwardRef(
    (
        {
            isMenuOpen,
            toggleMenu,
            loading,
            toAddress,
            mapRef,
            onInputChange,
            onAddressSubmit,
            price,
            data: { GetMyProfile: { user = null } = {} } = {},
            nearbyRide: { GetNearbyRide: { ride = null } = {} } = {},
            requestRideFn,
            acceptRideFn,
            loadMap,
        },
        ref
    ) => (
        <Container>
            <Helmet>
                <title>Home | Number</title>
            </Helmet>
            <Sidebar
                sidebar={<Menu toggleMenu={toggleMenu} />}
                open={isMenuOpen}
                onSetOpen={toggleMenu}
                styles={{
                    sidebar: {
                        backgroundColor: 'white',
                        width: '80%',
                        zIndex: '10',
                    },
                }}
            >
                {!loading && <MenuButton onClick={toggleMenu}>|||</MenuButton>}
                {user && !user.isDriving && (
                    <React.Fragment>
                        <AddressBar
                            name={'toAddress'}
                            onChange={onInputChange}
                            value={toAddress}
                            onBlur={null}
                        />
                        <ExtendedButton
                            onClick={onAddressSubmit}
                            disabled={toAddress === ''}
                            value={price ? 'Изменить адрес' : 'Выбрать адрес'}
                        />
                    </React.Fragment>
                )}
                {price && (
                    <RequestButton
                        onClick={requestRideFn}
                        disabled={toAddress === ''}
                        value={`Запросить водителя (${price}р.)`}
                    />
                )}
                {ride && (
                    <RidePopUp
                        id={ride.id}
                        pickUpAddress={ride.pickUpAddress}
                        dropOffAddress={ride.dropOffAddress}
                        price={ride.price}
                        distance={ride.distance}
                        passengerName={ride.passenger.fullName!}
                        passengerPhoto={ride.passenger.profilePhoto!}
                        acceptRideFn={acceptRideFn}
                    />
                )}
                <Map
                    ref={(el) => {
                        // @ts-ignore
                        if (!ref.current) {
                            // @ts-ignore
                            ref.current = el as any;
                            loadMap();
                        }
                    }}
                />
                <LoaderContainer>
                    <Loader
                        type="Puff"
                        color="#00BFFF"
                        height={100}
                        width={100}
                    />
                </LoaderContainer>
            </Sidebar>
        </Container>
    )
);

export default React.memo(HomePresenter);
