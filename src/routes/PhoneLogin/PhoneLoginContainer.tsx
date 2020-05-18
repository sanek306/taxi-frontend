import React, { FormEvent } from 'react'

import PhoneLoginPresenter from './PhoneLoginPresenter'
import { RouteComponentProps } from 'react-router-dom'
import { toast } from 'react-toastify'
import { PHONE_SIGN_IN } from './PhoneQueries.query'
import { Mutation } from 'react-apollo'
import { startPhoneVerification } from 'src/types/api'

interface IState {
    countryCode: string
    phoneNumber: string
}

export interface OnSubmit {
    (event: FormEvent<HTMLFormElement>, startPhoneVerification: any): void
}

class PhoneLoginContainer extends React.Component<
    RouteComponentProps<any>,
    IState
> {
    defaultPhoneNumber = '333070149';

    public state = {
        countryCode: '+375',
        phoneNumber: '',
    };

    onInputChange: React.ChangeEventHandler<
        HTMLInputElement | HTMLSelectElement
    > = (event) => {
        const {
            target: { name, value },
        } = event;

        this.setState({
            [name]: value,
        } as any)
    };

    onSubmit: OnSubmit = (event, startPhoneVerification) => {
        event.preventDefault();
        const { countryCode, phoneNumber } = this.state;
        const fullPhoneNumber = `${countryCode}${phoneNumber}`;

        const isValid = /^(\+375|80)(29|25|44|33)(\d{3})(\d{2})(\d{2})$/.test(
            fullPhoneNumber
        );

        if (isValid) {
            startPhoneVerification({
                variables: { phoneNumber: fullPhoneNumber },
            })
        } else {
            toast.error('Пожалуйста введите правильный номер')
        }
        console.log(`${countryCode} ${phoneNumber}`)
    };

    onCompleted : (data: startPhoneVerification) => void = (
        data
    ) => {
        const { StartPhoneVerification: { ok, error } } = data;

        if (ok) {
            toast.info('Вам был выслан код на указанный номер')
        } else {
            toast.error(error)
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
        )
    }
}

export default PhoneLoginContainer
