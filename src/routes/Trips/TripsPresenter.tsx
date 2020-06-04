import React from "react";
import { Helmet } from "react-helmet";
import Header from "../../Components/Header";
import styled from "styled-components";
import Ride from "../../Components/Ride";

const Container = styled.div`
  padding: 0 40px;
`;

interface IProps {
  data?: any;
  loading: boolean;
}

const TripsPresenter: React.FC<IProps> = ({
  data: { GetRides: { rides = null } = {} } = {},
  loading
}) => (
  <React.Fragment>
    <Helmet>
      <title>Поездки</title>
    </Helmet>
    <Header title={"Поездки"} backTo={"/"} />
    <Container>
      {!loading && rides && rides.length === 0 && <p>У вас нет поездок</p>}
      {!loading &&
        rides &&
        rides.map(ride => (
          <Ride
            key={ride!.id}
            {...ride}
          />
        ))}
    </Container>
  </React.Fragment>
);

export default TripsPresenter;
