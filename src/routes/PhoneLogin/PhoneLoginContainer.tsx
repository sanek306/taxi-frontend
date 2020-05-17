import React from "react";

import PhoneLoginPresenter from "./PhoneLoginPresenter";
import { RouteComponentProps } from "react-router-dom";
import {toast} from "react-toastify";

interface IState {
    countryCode: string;
    phoneNumber: string;
}
class PhoneLoginContainer extends React.Component<RouteComponentProps<any>, IState> {

    defaultPhoneNumber =  "333070149"

    public state = {
        countryCode: "+375",
        phoneNumber: "",
        loading: false
    }

    onInputChange: React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement> = (event) => {
        const { target: { name, value } } = event;

        this.setState({
            [name]: value
        } as any)
    };

    onSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        const { countryCode, phoneNumber } = this.state;

        const isValid = /^\+[1-9]{1}[0-9]{7,11}$/.test(
            `${countryCode}${phoneNumber}`
        )
        // @ts-ignore
        this.setState({loading: true });
        if (isValid) {
            // @ts-ignore
            setTimeout(() => this.setState({ loading: false }), 1000);
            toast.info("Данные были отправлены!");
        } else {
            // @ts-ignore
            setTimeout(() => this.setState({ loading: false }), 1000);
            toast.error("Пожалуйста введите правильный номер");
        }
        console.log(`${countryCode} ${phoneNumber}`)
    }

    render() {
        const {countryCode, phoneNumber, loading} = this.state;
        return (
            <PhoneLoginPresenter countryCode={countryCode} phoneNumber={phoneNumber} defaultPhoneNumber={this.defaultPhoneNumber} loading={loading} onInputChange={this.onInputChange} onSubmit={this.onSubmit} />
        );
    }
}

export default PhoneLoginContainer;
