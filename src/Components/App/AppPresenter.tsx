import React from 'react';
import {BrowserRouter, Switch, Route, Redirect} from "react-router-dom";
import PhoneLogin from "../../routes/PhoneLogin";
import Login from "../../routes/Login";
import VerifyPhone from "../../routes/VerifyPhone";
import SocialLogin from "../../routes/SocialLogin";
import Home from "../../routes/Home";
import Ride from "../../routes/Ride";
import EditAccount from "../../routes/EditAccount";
import Settings from "../../routes/Settings";
import Places from "../../routes/Places";
import Trips from "../../routes/Trips";
import AddPlace from "../../routes/AddPlace";
import FindAddress from "../../routes/FindAddress";
import Chat from "../../routes/Chat";
import CreateUserContainer from "../../routes/CreateUser";

interface IProps {
    isLoggedIn: boolean
}

const AppPresenter: React.FC<IProps> = ({ isLoggedIn }) => (
    <BrowserRouter>
        {isLoggedIn ? <LoggedInRouters/> : <LoggedOutRouters/>}
    </BrowserRouter>
);

const LoggedOutRouters: React.FC = () => (
    <Switch>
        <Route path={"/"} exact={true} component={Login} />
        <Route path={"/phone-login"} exact={true} component={PhoneLogin} />
        <Route path={"/verify-phone"} exact={true} component={VerifyPhone} />
        <Route path={"/social-login"} exact={true} component={SocialLogin} />
        <Route path={"/create-user/:phoneNumber"} exact={true} component={CreateUserContainer} />
        <Redirect from={"*"} to={"/"} />
    </Switch>
);

const LoggedInRouters: React.FC = () => (
    <Switch>
        <Route path={"/"} exact={true} component={Home} />
        <Route path={"/ride/:rideId"} exact={true} component={Ride} />
        <Route path={"/chat/:chatId/:rideId"} exact={true} component={Chat} />
        <Route path={"/edit-account"} exact={true} component={EditAccount} />
        <Route path={"/settings"} exact={true} component={Settings} />
        <Route path={"/places"} exact={true} component={Places} />
        <Route path={"/trips"} exact={true} component={Trips} />
        <Route path={"/add-place"} exact={true} component={AddPlace} />
        <Route path={"/find-address"} exact={true} component={FindAddress} />
    </Switch>
);

export default AppPresenter;