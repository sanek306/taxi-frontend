import React from 'react';
import { Helmet } from 'react-helmet';
import { Link, RouteComponentProps } from 'react-router-dom';
import bgImage from '../../images/bg.png';
import styled from 'styled-components';

const Container = styled.div`
    height: 100vh;
`;

const Header = styled.header`
    height: 60%;
    background: no-repeat center url(${bgImage});
    background-size: contain;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Logo = styled.div`
    animation: blink 2s linear infinite; 
    width: 150px;
    height: 110px;
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;

    text-transform: uppercase;
    font-weight: 500;
    font-size: 25px;

    @keyframes blink {  
        0% { color: black; }
        50% { color: gray; }
        100% { color: black; } 
    }
`;

const Title = styled.h1``;

const Footer = styled.div``;
const FakeInput = styled.div`
    margin: 50px 0;
    font-size: 25px;
    font-weight: 300;
`;

const PhoneLogin = styled.div`
    padding: 20px;
    cursor: pointer;
`;

const Grey = styled.span`
    color: ${(props) => props.theme.greyColor};
    margin-left: 10px;
`;

const SocialLogin = styled.div`
    border-top: 1px solid ${(props) => props.theme.greyColor};
    padding: 30px 20px;
`;

const SocialLink = styled.span`
    color: ${(props) => props.theme.blueColor};
    font-size: 20px;
    cursor: pointer;
`;

interface IProps extends RouteComponentProps<any> {}

const OutHomePresenter: React.FC<IProps> = () => (
    <Container>
        <Helmet>
            <title>Авторизация | FastTaxi</title>
        </Helmet>
        <Header>
            <Logo>
                <Title>FastTaxi</Title>
            </Logo>
        </Header>
        <Footer>
            <Link to={'/phone-login'}>
                <PhoneLogin>
                    <FakeInput>
                        🇧🇾 +375 <Grey>Введите ваш мобильный телефон</Grey>
                    </FakeInput>
                </PhoneLogin>
            </Link>
            <Link to={'/social-login'}>
                <SocialLogin>
                    <SocialLink>Или пройдите авторизацию Facebook</SocialLink>
                </SocialLogin>
            </Link>
        </Footer>
    </Container>
);

export default OutHomePresenter;
