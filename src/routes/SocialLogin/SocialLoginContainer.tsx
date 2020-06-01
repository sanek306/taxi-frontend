import React from 'react';

import SocialLoginPresenter from './SocialLoginPresenter';
import { Mutation } from 'react-apollo';
import { FACEBOOK_CONNECT } from './SocialLoginQueries';
import { RouteComponentProps } from 'react-router-dom';
import { toast } from 'react-toastify';
import { LOG_USER_IN } from '../../sharedQueries.local';

interface IState {
    firstName: string;
    lastName: string;
    email?: string;
    fbId: string;
}

interface IProps extends RouteComponentProps<any> {}

class SocialLoginContainer extends React.Component<IProps, IState> {
    mutation;
    onCompleted = (data, logUserIn) => {
        const { FacebookConnect } = data;
        if (FacebookConnect.ok) {
            logUserIn({
                variables: {
                    token: FacebookConnect.token,
                },
            });
            this.props.history.push('/');
            toast.success('Вы авторизованы!');
        } else {
            toast.error(FacebookConnect.error);
        }
    };

    loginCallback = (fbResponse) => {
        const {
            email,
            id,
            first_name: firstName,
            last_name: lastName,
            accessToken,
        } = fbResponse;
        if (accessToken) {
            toast.success(`Добро пожаловать, ${firstName}`);
            this.mutation({
                variables: {
                    email,
                    fbId: id,
                    firstName,
                    lastName,
                },
            });
        } else {
            toast.error('Вы не смогли залогиниться :(');
        }
    };

    public render() {
        return (
            <Mutation mutation={LOG_USER_IN}>
                {(logUserIn) => (
                    <Mutation
                        mutation={FACEBOOK_CONNECT}
                        onCompleted={(mutationResponse) =>
                            this.onCompleted(mutationResponse, logUserIn)
                        }
                    >
                        {(facebookConnectMutation) => {
                            this.mutation = facebookConnectMutation;
                            return (
                                <SocialLoginPresenter
                                    loginCallback={this.loginCallback}
                                />
                            );
                        }}
                    </Mutation>
                )}
            </Mutation>
        );
    }
}

export default SocialLoginContainer;
