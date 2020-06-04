import React from 'react';
import {graphql} from "react-apollo";
import {IS_LOGGED_IN} from "./AppQueries.local";
import AppPresenter from "./AppPresenter";
import firebase from 'firebase/app';
import 'firebase/auth';

//https://console.firebase.google.com/project/
firebase.initializeApp({
    apiKey: "AIzaSyDY-iMCCvCEiRT76nxx9y2wAikW2bydoSM",
    authDomain: "veryfi-phone.firebaseapp.com",
    databaseURL: "https://veryfi-phone.firebaseio.com",
    projectId: "veryfi-phone",
    storageBucket: "veryfi-phone.appspot.com",
    messagingSenderId: "444778495386",
    appId: "1:444778495386:web:b4d38b9def8dfc82004e23"
});

const AppContainer: React.FunctionComponent<any> = ({data}) => {
    const { auth } = data;

    return (
        <>
            <AppPresenter isLoggedIn={auth.isLoggedIn}/>
        </>
    );
};

export default graphql(IS_LOGGED_IN)(AppContainer);
