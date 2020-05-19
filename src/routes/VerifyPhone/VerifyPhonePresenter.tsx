import React from 'react';
import { MutationFunction } from 'react-apollo';
import { Helmet } from 'react-helmet';
import Button from '../../Components/Button';
import Form from '../../Components/Form';
import Header from '../../Components/Header';
import Input from '../../Components/Input';
import styled from 'styled-components';

const Container = styled.div``;

const ExtendedForm = styled(Form)`
    padding: 0 40px;
`;

const ExtendedInput = styled(Input)`
    margin-bottom: 20px;
`;

interface IProps {
    verificationKey: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: MutationFunction;
    loading: boolean;
}

const VerifyPhonePresenter: React.FC<IProps> = ({
    verificationKey,
    onChange,
    onSubmit,
    loading,
}) => (
    <Container>
        <Helmet>
            <title>Verify Phone | Number</title>
        </Helmet>
        <Header backTo={'/phone-login'} title={'Авторизация по мобильному телефону'} />
        <ExtendedForm submitFn={onSubmit}>
            <ExtendedInput
                value={verificationKey}
                placeholder={'Введите код с телефона'}
                onChange={onChange}
                name={'verificationKey'}
            />
            <Button
                disabled={loading}
                value={loading ? 'Загрузка...' : 'Отправить'}
                onClick={null}
            />
        </ExtendedForm>
    </Container>
);

export default VerifyPhonePresenter;
