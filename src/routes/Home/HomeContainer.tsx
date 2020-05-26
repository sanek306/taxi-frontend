import React from "react";
import { RouteComponentProps } from "react-router-dom";
import HomePresenter from "./HomePresenter";
import {USER_PROFILE} from "../../sharedQueries";
import { Query } from "react-apollo";

interface IState {
  isMenuOpen: boolean;
}

interface IProps extends RouteComponentProps<any> {
  google: any;
}

class HomeContainer extends React.Component<IProps, IState> {
  state = {
    isMenuOpen: false,
    isDriving: true,
  };

  render() {
    const { isMenuOpen } = this.state;
    return (
        <Query query={USER_PROFILE} onCompleted={this.handleProfileQuery}>
          {({ loading }) => (
            <HomePresenter loading={loading} isMenuOpen={isMenuOpen} toggleMenu={this.toggleMenu} />
          )}
        </Query>
    );
  }

  handleProfileQuery = (data) => {
    const { GetMyProfile } = data;
    if (GetMyProfile.user) {
      const {
        user: { isDriving }
      } = GetMyProfile;
      this.setState({
        isDriving
      } as any);
    }
  };

  toggleMenu = () => {
    this.setState(state => {
      return {
        isMenuOpen: !state.isMenuOpen
      }
    })
  }
}

export default HomeContainer;
