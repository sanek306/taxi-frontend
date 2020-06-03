import {SubscribeToMoreOptions} from "apollo-client";
import React from "react";
import {Mutation, Query} from "react-apollo";
import {RouteComponentProps} from "react-router-dom";
import {USER_PROFILE} from "../../sharedQueries";
import ChatPresenter from "./ChatPresenter";
import {GET_CHAT, SEND_MESSAGE, SUBSCRIBE_TO_MESSAGES} from "./ChatQueries";

interface IProps extends RouteComponentProps<any> {}
interface IState {
  message: "";
}

class ChatContainer extends React.Component<IProps, IState> {
  public sendMessageFn: any;
  constructor(props: IProps) {
    super(props);
    if (!props.match.params.chatId) {
      props.history.push("/");
    }
    this.state = {
      message: ""
    };
  }
  public render() {
    const {
      match: {
        params: { chatId: chatIdParams, rideId }
      }
    } = this.props;
    const chatId = Number(chatIdParams);
    const { message } = this.state;
    return (
      <Query query={USER_PROFILE}>
        {({ data: userData }) => (
          <Query query={GET_CHAT} variables={{ chatId }}>
            {({ data, loading, subscribeToMore }) => {
              const subscribeToMoreOptions: SubscribeToMoreOptions = {
                document: SUBSCRIBE_TO_MESSAGES,
                updateQuery: (prev, { subscriptionData }) => {
                  if (!subscriptionData.data) {
                    return prev;
                  }
                  const {
                    data: { MessageSubscription }
                  } = subscriptionData;
                  const {
                    GetChat: {
                      chat: { messages }
                    }
                  } = prev;
                  const newMessageId = MessageSubscription.id;
                  const latestMessageId = messages[messages.length - 1]?.id;

                  if (newMessageId === latestMessageId) {
                    return;
                  }

                  return Object.assign({}, prev, {
                    GetChat: {
                      ...prev.GetChat,
                      chat: {
                        ...prev.GetChat.chat,
                        messages: [
                          ...prev.GetChat.chat.messages,
                          MessageSubscription
                        ]
                      }
                    }
                  });
                }
              };
              subscribeToMore(subscribeToMoreOptions);
              return (
                <Mutation mutation={SEND_MESSAGE}>
                  {sendMessageFn => {
                    this.sendMessageFn = sendMessageFn;
                    return (
                      <ChatPresenter
                        data={data}
                        loading={loading}
                        userData={userData}
                        messageText={message}
                        path={`/ride/${rideId}`}
                        onInputChange={this.onInputChange}
                        onSubmit={this.onSubmit}
                      />
                    );
                  }}
                </Mutation>
              );
            }}
          </Query>
        )}
      </Query>
    );
  }
  public onInputChange: React.ChangeEventHandler<HTMLInputElement> = event => {
    const {
      target: { name, value }
    } = event;
    this.setState({
      [name]: value
    } as any);
  };
  public onSubmit = () => {
    const { message } = this.state;
    const {
      match: {
        params: { chatId: chatIdParams }
      }
    } = this.props;
    const chatId = Number(chatIdParams);
    if (message !== "") {
      this.setState({
        message: ""
      });
      this.sendMessageFn({
        variables: {
          chatId,
          text: message
        }
      });
    }
    return;
  };
}

export default ChatContainer;
