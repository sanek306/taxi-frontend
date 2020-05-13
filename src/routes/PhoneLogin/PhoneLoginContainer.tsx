import React from "react";

import PhoneLoginPresenter from "./PhoneLoginPresenter";
import { RouteComponentProps } from "react-router-dom";

interface IState {
    countryCode: string;
    phoneNumber: string;
}
class PhoneLoginContainer extends React.Component<RouteComponentProps<any>, IState> {

    defaultPhoneNumber =  "333070149"

    public state = {
        countryCode: "+375",
        phoneNumber: ""
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
        console.log(`${countryCode} ${phoneNumber}`)
    }

    render() {
        const {countryCode, phoneNumber} = this.state;
        return (
            <PhoneLoginPresenter countryCode={countryCode} phoneNumber={phoneNumber} defaultPhoneNumber={this.defaultPhoneNumber} onInputChange={this.onInputChange} onSubmit={this.onSubmit} />
        );
    }
}

export default PhoneLoginContainer;
