import React from 'react';
import { Helmet } from 'react-helmet';
import Sidebar from 'react-sidebar';
import styled from 'styled-components';
import MenuContainer from "../../Components/Menu";

const Container = styled.div``;
const Button = styled.button`
  position: absolute;
`;

interface IProps {
    isMenuOpen: boolean;
    loading: boolean;
    toggleMenu: () => void;
}

const HomePresenter: React.FC<IProps> = ({ isMenuOpen, toggleMenu, loading }) => (
    <Container>
        <Helmet>
            <title>Home | FasTaxi</title>
        </Helmet>
        <Sidebar
            sidebar={<MenuContainer />}
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
            <></>
        </Sidebar>
        {!loading && <Button onClick={() => toggleMenu()}>dqwd</Button>}
    </Container>
);

export default HomePresenter;
