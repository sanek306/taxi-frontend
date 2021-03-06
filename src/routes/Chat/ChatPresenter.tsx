import React from 'react';
import Header from '../../Components/Header';
import Input from '../../Components/Input';
import Message from '../../Components/Message';
import styled from 'styled-components';
import Button from "../../Components/Button";

const Container = styled.div``;

const Chat = styled.div`
    height: 65vh;
    overflow: scroll;
    padding: 0 20px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;

const InputCont = styled.div`
    padding: 0 20px;
`;

interface IProps {
    data?: any;
    userData?: any;
    loading: boolean;
    messageText: string;
    path: string;
    onSubmit: () => void;
    onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ChatPresenter: React.FC<IProps> = ({
    loading,
    data: { GetChat: { chat = null } = {} } = {},
    userData: { GetMyProfile: { user = null } = {} } = {},
    messageText,
    onInputChange,
    onSubmit,
    path
}) => (
    <Container>
        <Header title={'Чат'} backTo={path} />
        {!loading && chat && user && (
            <React.Fragment>
                <Chat>
                    {chat.messages &&
                        chat.messages.map((message) => {
                            if (message) {
                                return (
                                    <Message
                                        key={message.id}
                                        text={message.text}
                                        mine={user.id === message.userId}
                                    />
                                );
                            }
                            return null;
                        })}
                </Chat>
                <InputCont>
                    <Input
                        value={messageText}
                        placeholder={'Введите сообщение'}
                        onChange={onInputChange}
                        name={'message'}
                    />
                    <Button
                        onClick={onSubmit}
                        value={'Отправить'}
                    />
                </InputCont>
            </React.Fragment>
        )}
    </Container>
);

export default ChatPresenter;
