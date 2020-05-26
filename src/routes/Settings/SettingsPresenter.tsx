import React from "react";
import { MutationFunction } from "react-apollo";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Header from "../../Components/Header";
import Place from "../../Components/Place";
import styled from "styled-components";

const Container = styled.div`
  padding: 0 40px;
`;

const Image = styled.img`
  height: 60px;
  width: 60px;
  border-radius: 50%;
`;

const GridLink = styled(Link)`
  display: grid;
  grid-template-columns: 1fr 4fr;
  grid-gap: 10px;
  margin-bottom: 10px;
`;

const Keys = styled.div``;

const Key = styled.span`
  display: block;
  margin-bottom: 5px;
`;

const FakeLink = styled.span`
  text-decoration: underline;
  cursor: pointer;
`;

const SLink = styled(Link)`
  display: block;
  text-decoration: underline;
  margin: 20px 0;
`;

interface IProps {
  logUserOut: MutationFunction;
  userData?: any;
  placesData?: any;
  userDataLoading: boolean;
  placesLoading: boolean;
}

const SettingsPresenter: React.SFC<IProps> = ({
  logUserOut,
  userData: { GetMyProfile: { user = null } = {} } = {},
  placesData: { GetMyPlaces: { places = null } = {} } = {},
  userDataLoading,
  placesLoading
}) => (
  <React.Fragment>
    <Helmet>
      <title>Настройки | FastTaxi</title>
    </Helmet>
    <Header title={"Настройки пользователя"} backTo={"/"} />
    <Container>
      <GridLink to={"/edit-account"}>
        {!userDataLoading &&
          user &&
          user.profilePhoto &&
          user.email &&
          user.fullName && (
            <React.Fragment>
              <Image src={user.profilePhoto} />
              <Keys>
                <Key>{user.fullName}</Key>
                <Key>{user.email}</Key>
              </Keys>
            </React.Fragment>
          )}
      </GridLink>
      {!placesLoading &&
        places &&
        places.map(place => (
          <Place
            key={place!.id}
            id={place!.id}
            fav={place!.isFav}
            name={place!.name}
            address={place!.address}
          />
        ))}
      <SLink to={"/places"}>Ваши места</SLink>
      <FakeLink onClick={logUserOut as any}>Выход</FakeLink>
    </Container>
  </React.Fragment>
);

export default SettingsPresenter;
