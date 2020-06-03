import React from 'react';
import { Mutation } from 'react-apollo';
import { toast } from 'react-toastify';
import { LOG_USER_IN } from '../../sharedQueries.local';
import VerifyPhonePresenter from './VerifyPhonePresenter';
import { VERIFY_PHONE } from './VerifyPhoneQueries.query';

interface IState {
    verificationKey: string;
    phoneNumber: string;
}

class VerifyPhoneContainer extends React.Component<any, IState> {
    constructor(props) {
        super(props);
        const phone = props?.location?.state?.phone;
        if (!phone) {
            props.history.push('/');
        }
        this.state = {
            phoneNumber: phone,
            verificationKey: '',
        };
    }

    onCompleted = (data, logUserIn) => {
        const { CompletePhoneVerification } = data;
        if (CompletePhoneVerification.ok) {
            if (CompletePhoneVerification.token) {
                logUserIn({
                    variables: {
                        token: CompletePhoneVerification.token,
                    },
                });
                this.props.history.push('/');
                toast.success('Вы авторизованы!');
            }
            else {
                this.props.history.push(`/create-user/${this.state.phoneNumber}`);
            }
        } else {
            toast.error(CompletePhoneVerification.error);
        }
    };

    public render() {
        const { verificationKey, phoneNumber } = this.state;
        return (
            <Mutation mutation={LOG_USER_IN}>
                {(logUserIn) => (
                    <Mutation
                        mutation={VERIFY_PHONE}
                        variables={{
                            key: verificationKey,
                            phoneNumber,
                        }}
                        onCompleted={(data) =>
                            this.onCompleted(data, logUserIn)
                        }
                    >
                        {(mutation, { loading }) => (
                            <VerifyPhonePresenter
                                onSubmit={mutation}
                                onChange={this.onInputChange}
                                verificationKey={verificationKey}
                                loading={loading}
                            />
                        )}
                    </Mutation>
                )}
            </Mutation>
        );
    }

    public onInputChange: React.ChangeEventHandler<HTMLInputElement> = (
        event
    ) => {
        const {
            target: { name, value },
        } = event;
        this.setState({
            [name]: value,
        } as any);
    };
}

export default VerifyPhoneContainer;
