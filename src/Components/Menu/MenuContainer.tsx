import React from "react";
import { Mutation, Query } from "react-apollo";
import { toast } from "react-toastify";
import { USER_PROFILE } from "../../sharedQueries";
import MenuPresenter from "./MenuPresenter";
import { TOGGLE_DRIVING } from "./MenuQueries";

class MenuContainer extends React.Component {
  public render() {

    return (
      <Mutation
        mutation={TOGGLE_DRIVING}
        update={(cache, response) => {
          const { data } = response;
          if (data) {
            const { ToggleDrivingMode } = data;
            if (!ToggleDrivingMode.ok) {
              toast.error(ToggleDrivingMode.error);
              return;
            }
            const query = cache.readQuery({
              query: USER_PROFILE
            });
            if (query) {
              const {
                GetMyProfile: { user }
              } = query;
              if (user) {
                user.isDriving = !user.isDriving;
              }
            }
            cache.writeQuery({ query: USER_PROFILE, data: query });
          }
        }}
      >
        {toggleDrivingFn => (
          <Query query={USER_PROFILE}>
            {({ data, loading }) => (
              <MenuPresenter
                data={data}
                loading={loading}
                toggleDrivingFn={toggleDrivingFn}
              />
            )}
          </Query>
        )}
      </Mutation>
    );
  }
}

export default MenuContainer;
