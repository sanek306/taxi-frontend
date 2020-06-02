import React from "react";
import { MutationFunction } from "react-apollo";
import { Link } from "react-router-dom";
import Button from "../../Components/Button";
import styled from "styled-components";

const Container = styled.div`
  padding: 40px;
`;

const Title = styled.h4`
  font-weight: 800;
  margin-top: 30px;
  margin-bottom: 10px;
  &:first-child {
    margin-top: 0;
  }
`;

const Data = styled.span`
  color: ${props => props.theme.blueColor};
`;

const Img = styled.img`
  border-radius: 50%;
  margin-right: 20px;
  width: 50px;
  max-height: 50px;
`;

const Passenger = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const Buttons = styled.div`
  margin: 30px 0;
`;

const ExtendedButton = styled(Button)`
  margin-bottom: 30px;
`;

interface IProps {
  data?: any;
  userData?: any;
  loading: boolean;
  updateRideFn: MutationFunction;
}

const statusTranslate = {
  ACCEPTED: 'Принят',
  FINISHED: 'Завершен',
  CANCELED: 'Отменен',
  REQUESTING: 'Ожидание',
  ONROUTE: 'В пути'
};

const RidePresenter: React.FC<IProps> = ({
  data: { GetRide: { ride = null } = {} } = {},
  userData: { GetMyProfile: { user = null } = {} } = {},
  updateRideFn
}) => (
  <Container>
    {ride &&
      user && (
        <React.Fragment>
          <Title>Пассажир</Title>
          <Passenger>
            <Img src={ride.passenger.profilePhoto!} />
            <Data>{ride.passenger.fullName!}</Data>
          </Passenger>
          {ride.driver && (
            <React.Fragment>
              <Title>Водитель</Title>
              <Passenger>
                <Img src={ride.driver.profilePhoto!} />
                <Data>{ride.driver.fullName!}</Data>
              </Passenger>
            </React.Fragment>
          )}
          <Title>Откуда</Title>
          <Data>{ride.pickUpAddress}</Data>
          <Title>Куда</Title>
          <Data>{ride.dropOffAddress}</Data>
          <Title>Цена</Title>
          <Data>{`${ride.price} р.`}</Data>
          <Title>Расстояние</Title>
          <Data>{ride.distance}</Data>
          <Title>Время прибытия</Title>
          <Data>{ride.duration.replace('mins','минут')}</Data>
          <Title>Статус</Title>
          <Data>{statusTranslate[ride.status]}</Data>
          <Buttons>
            {ride.driver &&
              ride.driver.id === user.id &&
              ride.status === "ACCEPTED" && (
                <ExtendedButton
                  value={"В путь"}
                  onClick={() =>
                    updateRideFn({
                      variables: {
                        rideId: ride.id,
                        status: "ONROUTE"
                      }
                    })
                  }
                />
              )}
            {ride.driver &&
              ride.driver.id === user.id &&
              ride.status === "ONROUTE" && (
                <ExtendedButton
                  value={"Завершить"}
                  onClick={() =>
                    updateRideFn({
                      variables: {
                        rideId: ride.id,
                        status: "FINISHED"
                      }
                    })
                  }
                />
              )}

            {ride.status !== "REQUESTING" && (
              <Link to={`/chat/${ride.chatId}/${ride.id}`}>
                <ExtendedButton value={"Чат"} onClick={null} />
              </Link>
            )}
          </Buttons>
        </React.Fragment>
      )}
  </Container>
);

export default RidePresenter;
