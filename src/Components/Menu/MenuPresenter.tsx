import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
    height: 100%;
`;

const Header = styled.div`
    background-color: black;
    height: 20%;
    margin-bottom: 30px;
    padding: 0 15px;
    color: white;
`;

const SLink = styled(Link)`
    font-size: 22px;
    display: block;
    margin-left: 15px;
    margin-bottom: 25px;
    font-weight: 400;
`;

const Image = styled.img`
    height: 80px;
    width: 80px;
    background-color: grey;
    border-radius: 40px;
    overflow: hidden;
`;

const Name = styled.h2`
    font-size: 22px;
    color: white;
    margin-bottom: 10px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const Rating = styled.h5`
    font-size: 18px;
    color: white;
`;

const Text = styled.span`
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
`;

const Grid = styled.div`
    display: grid;
    grid-template-columns: 1fr 2fr;
    grid-gap: 10px;
    height: 100%;
    align-items: center;
`;

const Close = styled.div`
    position: absolute;
    right: 0;
    padding: 15px;
    cursor: pointer;
    &:hover {
      color: aqua;
    }
`;

const ToggleDriving = styled<any>('button')`
    -webkit-appearance: none;
    background-color: ${(props) =>
        props.isDriving ? props.theme.yellowColor : props.theme.greenColor};
    width: 100%;
    color: white;
    font-size: 18px;
    border: 0;
    padding: 15px 0;
    cursor: pointer;
`;

interface IProps {
    data?: any;
    loading: boolean;
    toggleDrivingFn: any;
    toggleMenu: any;
}

const MenuPresenter: React.FC<IProps> = ({
    data: { GetMyProfile: { user = null } = {} } = {},
    loading,
    toggleDrivingFn,
    toggleMenu,
}) => (
    <Container>
        {!loading && user && user.fullName && (
            <React.Fragment>
                <Header>
                    <Grid>
                        <Link to={'/edit-account'}>
                            <Image
                                src={
                                    user.profilePhoto ||
                                    'https://lh3.googleusercontent.com/-CTwXMuZRaWw/AAAAAAAAAAI/AAAAAAAAAUg/8T5nFuIdnHE/photo.jpg'
                                }
                            />
                        </Link>
                        <Close onClick={toggleMenu}>
                          Закрыть
                        </Close>
                        <Text>
                            <Name>{user.fullName}</Name>
                            <Rating>4.5</Rating>
                        </Text>
                    </Grid>
                </Header>
                <SLink to="/trips">Ваши поездки</SLink>
                <SLink to="/settings">Настройки</SLink>
                <ToggleDriving
                    onClick={toggleDrivingFn}
                    isDriving={user.isDriving}
                >
                    {user.isDriving ? 'Закончить возить' : 'Стать водителем'}
                </ToggleDriving>
            </React.Fragment>
        )}
    </Container>
);

export default MenuPresenter;
