import React from 'react';
import RidePresenter from './RidePresenter';

class RideContainer extends React.Component<any> {
    public render() {
        const {
            duration,
            status,
            price,
            distance,
            dropOffAddress,
            pickUpAddress,
        } = this.props;

        return (
            <RidePresenter
                duration={duration}
                status={status}
                price={price}
                distance={distance}
                dropOffAddress={dropOffAddress}
                pickUpAddress={pickUpAddress}
            />
        );
    }
}

export default RideContainer;
