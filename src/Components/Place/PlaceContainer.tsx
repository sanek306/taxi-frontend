import React from "react";
import { Mutation } from "react-apollo";
import { GET_PLACES } from "../../sharedQueries";
import PlacePresenter from "./PlacePresenter";
import { EDIT_PLACE } from "./PlaceQueries";

interface IProps {
  fav: boolean;
  name: string;
  address: string;
  id: number;
}

class PlaceContainer extends React.Component<IProps> {
  public render() {
    const { id, fav, name, address } = this.props;

    return (
      <Mutation
        mutation={EDIT_PLACE}
        variables={{
          isFav: !fav,
          placeId: id,
          name
        }}
        refetchQueries={[{ query: GET_PLACES }]}
      >
        {editPlaceFn => (
          <PlacePresenter
            onStarPress={editPlaceFn}
            fav={fav}
            name={name}
            address={address}
          />
        )}
      </Mutation>
    );
  }
}

export default PlaceContainer;
