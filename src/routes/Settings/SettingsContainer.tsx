import React from "react";
import { Mutation, Query } from "react-apollo";
import { GET_PLACES, USER_PROFILE } from "../../sharedQueries";
import { LOG_USER_OUT } from "../../sharedQueries.local";
import SettingsPresenter from "./SettingsPresenter";


class SettingsContainer extends React.Component {
  public render() {
    return (
      <Mutation mutation={LOG_USER_OUT}>
        {logUserOut => (
          <Query query={USER_PROFILE}>
            {({ data: userData, loading: userDataLoading }) => (
              <Query query={GET_PLACES}>
                {({ data: placesData, loading: placesLoading }) => (
                  <SettingsPresenter
                    userDataLoading={userDataLoading}
                    placesLoading={placesLoading}
                    userData={userData}
                    placesData={placesData}
                    logUserOut={logUserOut}
                  />
                )}
              </Query>
            )}
          </Query>
        )}
      </Mutation>
    );
  }
}

export default SettingsContainer;
