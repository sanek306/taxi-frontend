import React from "react";
import { MutationFunction } from "react-apollo";
import { Helmet } from "react-helmet";
import Button from "../../Components/Button";
import Form from "../../Components/Form";
import Header from "../../Components/Header";
import Input from "../../Components/Input";
import PhotoInput from "../../Components/PhotoInput";
import styled from "styled-components";

const Container = styled.div``;

const ExtendedForm = styled(Form)`
  padding: 0 40px;
`;

const ExtendedInput = styled(Input)`
  margin-bottom: 30px;
`;

interface IProps {
  firstName: string;
  lastName: string;
  email: string;
  profilePhoto: string;
  onSubmit: MutationFunction;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  loading: boolean;
  uploading: boolean;
}

const EditAccountPresenter: React.SFC<IProps> = ({
  firstName,
  lastName,
  email,
  onSubmit,
  profilePhoto,
  onInputChange,
  loading,
  uploading
}) => (
  <Container>
    <Helmet>
      <title>Редактирование пользователя</title>
    </Helmet>
    <Header title={"Edit Account"} backTo={"/"} />
    <ExtendedForm submitFn={onSubmit}>
      <PhotoInput
        uploading={uploading}
        fileUrl={profilePhoto}
        onChange={onInputChange}
      />
      <ExtendedInput
        onChange={onInputChange}
        type={"text"}
        value={firstName}
        placeholder={"Имя"}
        name={"firstName"}
      />
      <ExtendedInput
        onChange={onInputChange}
        type={"text"}
        value={lastName}
        placeholder={"Фамилия"}
        name={"lastName"}
      />
      <ExtendedInput
        onChange={onInputChange}
        type={"email"}
        value={email}
        placeholder={"Email"}
        name={"email"}
      />
      <Button onClick={null} value={loading ? "Загрузка" : "Обновить"} />
    </ExtendedForm>
  </Container>
);

export default EditAccountPresenter;
