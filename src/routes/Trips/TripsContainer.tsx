import React from "react";
import { Query } from "react-apollo";
import { GET_TRIPS } from "../../sharedQueries";
import TripsPresenter from "./TripsPresenter";

class TripsContainer extends React.Component {
  public render() {
    return (
      <Query query={GET_TRIPS}>
        {({ data, loading }) => (
          <TripsPresenter data={data} loading={loading} />
        )}
      </Query>
    );
  }
}
export default TripsContainer;
