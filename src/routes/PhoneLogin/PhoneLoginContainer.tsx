import React, { FormEvent } from 'react';

import PhoneLoginPresenter from './PhoneLoginPresenter';
import { RouteComponentProps } from 'react-router-dom';
import { toast } from 'react-toastify';
import { PHONE_SIGN_IN } from './PhoneQueries.query';
import { Mutation } from 'react-apollo';
import { startPhoneVerification } from 'src/types/api';

interface IState {
    countryCode: string;
    phoneNumber: string;
}

export interface OnSubmit {
    (event: FormEvent<HTMLFormElement>, startPhoneVerification: any): void;
}

class PhoneLoginContainer extends React.Component<
    RouteComponentProps<any>,
    IState
> {
    defaultPhoneNumber = '';
    history;

    public state = {
        countryCode: '+375',
        phoneNumber: '',
    };

    getPhone = () => {
        const { countryCode, phoneNumber } = this.state;
        return `${countryCode}${phoneNumber}`;
    };

    constructor(props) {
        super(props);
        const { history } = props;
        this.history = history;
    }

    onInputChange: React.ChangeEventHandler<
        HTMLInputElement | HTMLSelectElement
    > = (event) => {
        const {
            target: { name, value },
        } = event;

        this.setState({
            [name]: value,
        } as any);
    };

    onSubmit: OnSubmit = (event, startPhoneVerification) => {
        event.preventDefault();
        const phone = this.getPhone();

        const isValid = /^(\+375|80)(29|25|44|33)(\d{3})(\d{2})(\d{2})$/.test(
            phone
        );

        if (isValid) {
            startPhoneVerification({
                variables: { phoneNumber: phone },
            });
            toast.success('Вам был выслан код на указанный номер');
        } else {
            toast.error('Пожалуйста введите правильный номер');
        }
    };

    onCompleted: (data: startPhoneVerification) => void = (data) => {
        const {
            StartPhoneVerification: { ok, error },
        } = data;
        const phone = this.getPhone();

        if (ok) {
            setTimeout(
                () =>
                    this.history.push({
                        pathname: '/verify-phone',
                        state: {
                            phone,
                        },
                    }),
                2000
            );
        } else {
            toast.error(error);
        }
    };

    render(): React.ReactElement {
        const { countryCode, phoneNumber } = this.state;
        return (
            <Mutation mutation={PHONE_SIGN_IN} onCompleted={this.onCompleted}>
                {(startPhoneVerification, { loading }) => (
                    <PhoneLoginPresenter
                        countryCode={countryCode}
                        phoneNumber={phoneNumber}
                        defaultPhoneNumber={this.defaultPhoneNumber}
                        loading={loading}
                        onInputChange={this.onInputChange}
                        onSubmit={(e) =>
                            this.onSubmit(e, startPhoneVerification)
                        }
                    />
                )}
            </Mutation>
        );
    }
}

export default PhoneLoginContainer;
