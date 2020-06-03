import React from 'react';
import { Mutation } from 'react-apollo';
import { RouteComponentProps } from 'react-router-dom';
import { toast } from 'react-toastify';
import CreateUserPresenter from './CreateUserPresenter';
import {CREATE_USER} from './CreateUserQueries';
import { LOG_USER_IN } from '../../sharedQueries.local';

interface IState {
    firstName: string;
    lastName: string;
    email: string;
}

interface IProps extends RouteComponentProps<any> {}

class CreateUserContainer extends React.Component<IProps, IState> {
    public state = {
        email: '',
        firstName: '',
        lastName: '',
    };

    onCompleted = (data, logUserIn) => {
        const { CreateUser } = data;
        if (CreateUser.ok) {
            logUserIn({
                variables: {
                    token: CreateUser.token,
                },
            });
            this.props.history.push('/');
            toast.success('Вы авторизованы!');
        } else {
            toast.error(CreateUser.error);
        }
    };

    public render() {
        const { email, firstName, lastName } = this.state;
        const {
            match: {
                params: { phoneNumber },
            },
        } = this.props;

        return (
            <Mutation mutation={LOG_USER_IN}>
                {(logUserIn) => (
                    <Mutation
                        mutation={CREATE_USER}
                        onCompleted={(data) => this.onCompleted(data, logUserIn)}
                        variables={{
                            email,
                            firstName,
                            lastName,
                            phoneNumber,
                        }}
                    >
                        {(updateProfileFn, { loading }) => (
                            <CreateUserPresenter
                                email={email}
                                firstName={firstName}
                                lastName={lastName}
                                onInputChange={this.onInputChange}
                                loading={loading}
                                onSubmit={updateProfileFn}
                            />
                        )}
                    </Mutation>
                )}
            </Mutation>
        );
    }

    public onInputChange: React.ChangeEventHandler<HTMLInputElement> = async (
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

export default CreateUserContainer;
