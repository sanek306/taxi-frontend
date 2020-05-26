import React from "react";
import { MutationFunction } from "react-apollo";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Button from "../../Components/Button";
import Form from "../../Components/Form";
import Header from "../../Components/Header";
import Input from "../../Components/Input";
import styled from "styled-components";

const Container = styled.div`
  padding: 0 40px;
`;

const ExtendedInput = styled(Input)`
  margin-bottom: 40px;
`;

const ExtendedLink = styled(Link)`
  text-decoration: underline;
  margin-bottom: 20px;
  display: block;
`;

interface IProps {
  address: string;
  name: string;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  loading: boolean;
  onSubmit: MutationFunction;
  pickedAddress: boolean;
}

const AddPlacePresenter: React.SFC<IProps> = ({
  onInputChange,
  address,
  name,
  loading,
  onSubmit,
  pickedAddress
}) => (
  <React.Fragment>
    <Helmet>
      <title>Добавить место | FastTaxi</title>
    </Helmet>
    <Header title={"Добавить место"} backTo={"/"} />
    <Container>
      <Form submitFn={onSubmit}>
        <ExtendedInput
          placeholder={"Название"}
          type={"text"}
          onChange={onInputChange}
          value={name}
          name={"name"}
        />
        <ExtendedInput
          placeholder={"Адресс"}
          type={"text"}
          onChange={onInputChange}
          value={address}
          name={"address"}
        />
        <ExtendedLink to={"/find-address"}>Указать место на карте</ExtendedLink>
        {pickedAddress && (
          <Button
            onClick={null}
            value={loading ? "Добавление места" : "Добавить место"}
          />
        )}
      </Form>
    </Container>
  </React.Fragment>
);

export default AddPlacePresenter;
