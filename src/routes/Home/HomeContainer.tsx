import {SubscribeToMoreOptions} from 'apollo-client';
import React from 'react';
import {graphql, Mutation, Query} from 'react-apollo';
import {RouteComponentProps} from 'react-router-dom';
import {toast} from 'react-toastify';
import {geoCode, reverseGeoCode} from '../../mapHelpers';
import {USER_PROFILE} from '../../sharedQueries';
import HomePresenter from './HomePresenter';
import {
    ACCEPT_RIDE,
    GET_NEARBY_DRIVERS,
    GET_NEARBY_RIDE,
    REPORT_LOCATION,
    REQUEST_RIDE,
    SUBSCRIBE_NEARBY_RIDES,
} from './HomeQueries';

interface IState {
    isMenuOpen: boolean;
    toAddress: string;
    toLat: number;
    toLng: number;
    lat: number;
    lng: number;
    distance: string;
    duration?: string;
    price?: string;
    fromAddress: string;
    isDriving: boolean;
}

interface IProps extends RouteComponentProps<any> {
    google: any;
    reportLocation: any;
}

export let latitude = 45;
export let longitude = 45;
export let drivers: any = [];

class HomeContainer extends React.PureComponent<IProps, IState> {
    public mapRef: any = React.createRef();
    public map: any;
    public userMarker: any;
    public toMarker: any;
    public directions: any;
    public state = {
        distance: '',
        duration: undefined,
        fromAddress: '',
        isDriving: true,
        isMenuOpen: false,
        lat: 0,
        lng: 0,
        price: undefined,
        toAddress:
            '',
        toLat: 0,
        toLng: 0,
    };

    constructor(props) {
        super(props);
    }
    public componentDidMount() {
        navigator.geolocation.getCurrentPosition(
            this.handleGeoSucces,
            this.handleGeoError
        );
    }
    public render() {
        const {
            isMenuOpen,
            toAddress,
            price,
            distance,
            fromAddress,
            lat,
            lng,
            toLat,
            toLng,
            duration,
            isDriving,
        } = this.state;
        return (
            <Query query={USER_PROFILE} onCompleted={this.handleProfileQuery}>
                {({ data: dataUserProfile, loading }) => (
                    <Query
                        query={GET_NEARBY_DRIVERS}
                        skip={isDriving}
                        pollInterval={5000}
                    >
                        {({ data }) => {
                            this.handleNearbyDrivers(data, dataUserProfile);

                            return (
                            <Mutation
                                mutation={REQUEST_RIDE}
                                onCompleted={this.handleRideRequest}
                                variables={{
                                    distance,
                                    dropOffAddress: toAddress,
                                    dropOffLat: toLat,
                                    dropOffLnd: toLng,
                                    duration: duration || '',
                                    pickUpAddress: fromAddress,
                                    pickUpLat: lat,
                                    pickUpLnd: lng,
                                    price: Number(price) || 0,
                                }}
                            >
                                {(requestRideFn) => <Query
                                    query={GET_NEARBY_RIDE}
                                    skip={!isDriving}
                                >
                                    {({
                                          subscribeToMore,
                                          data: nearbyRide,
                                      }) => {
                                        const rideSubscriptionOptions: SubscribeToMoreOptions = {
                                            document: SUBSCRIBE_NEARBY_RIDES,
                                            updateQuery: (prev, { subscriptionData }) => {
                                                if (!subscriptionData.data) {
                                                    return prev;
                                                }
                                                return Object.assign({}, prev, {
                                                    GetNearbyRide: {
                                                        ...prev.GetNearbyRide,
                                                        ride: subscriptionData.data.NearbyRideSubscription
                                                    }
                                                });
                                            }
                                        };
                                        if (isDriving) {
                                            subscribeToMore(
                                                rideSubscriptionOptions
                                            );
                                        }
                                        return (
                                            <Mutation
                                                mutation={ACCEPT_RIDE}
                                                update={this.handleRideAcceptance as any}
                                            >
                                                {(acceptRideFn) => (
                                                    <HomePresenter
                                                        loading={loading}
                                                        isMenuOpen={
                                                            isMenuOpen
                                                        }
                                                        toggleMenu={
                                                            this.toggleMenu
                                                        }
                                                        mapRef={this.mapRef}
                                                        toAddress={
                                                            toAddress
                                                        }
                                                        onInputChange={
                                                            this
                                                                .onInputChange
                                                        }
                                                        price={price}
                                                        data={dataUserProfile}
                                                        onAddressSubmit={
                                                            this.onAddressSubmit
                                                        }
                                                        requestRideFn={
                                                            requestRideFn
                                                        }
                                                        nearbyRide={
                                                            nearbyRide
                                                        }
                                                        acceptRideFn={
                                                            acceptRideFn
                                                        }
                                                        ref={this.mapRef}
                                                        loadMap={() => this.loadMap(latitude, longitude)}
                                                    />
                                                )}
                                            </Mutation>
                                        );
                                    }}
                                </Query>}
                            </Mutation>
                        )}}
                    </Query>
                )}
            </Query>
        );
    }
    public toggleMenu = () => {
        this.setState((state) => {
            return {
                isMenuOpen: !state.isMenuOpen,
            };
        });
    };
    public handleGeoSucces = (positon: Position) => {
        const {
            coords: { latitude: latitudeNew, longitude: longitudeNew },
        } = positon;
        this.setState({
            lat: latitudeNew,
            lng: longitudeNew,
        });
        latitude = latitudeNew;
        longitude = longitudeNew;
        this.getFromAdress(latitudeNew, longitudeNew);
    };
    public getFromAdress = async (lat: number, lng: number) => {
        const address = await reverseGeoCode(lat, lng);
        if (address) {
            this.setState({
                fromAddress: address,
            });
        }
    };
    public loadMap = (lat, lng) => {
        const { google } = this.props;
        const maps = google.maps;
        const mapNode = this.mapRef.current;
        if (!mapNode) {
            return;
        }
        const mapConfig = {
            center: {
                lat,
                lng,
            },
            disableDefaultUI: true,
            zoom: 13,
        };
        this.map = new maps.Map(mapNode, mapConfig);
        const userMarkerOptions = {
            icon: {
                path: maps.SymbolPath.CIRCLE,
                scale: 7,
            },
            position: {
                lat,
                lng,
            },
        };
        this.userMarker = new maps.Marker(userMarkerOptions);
        this.userMarker.setMap(this.map);
        setTimeout(() => this.renderDrivers(drivers, true), 100);
        const watchOptions: PositionOptions = {
            enableHighAccuracy: true
        };
        navigator.geolocation.watchPosition(
            this.handleGeoWatchSuccess,
            this.handleGeoWatchError,
            watchOptions
        );
    };
    public handleGeoWatchSuccess = (position: Position) => {
        const { reportLocation } = this.props;
        const {
            coords: { latitude: latitudeNew, longitude: longitudeNew },
        } = position;
        latitude = latitudeNew;
        longitude = longitudeNew;
        this.userMarker.setPosition({ lat: latitude, lng: longitude });
        this.map.panTo({ lat: latitude, lng: longitude });
        reportLocation({
            variables: {
                lat: parseFloat(latitude.toFixed(10)),
                lng: parseFloat(longitude.toFixed(10)),
            },
        });
    };
    public handleGeoWatchError = () => {
        console.log('Нет геолокации');
    };
    public handleGeoError = () => {
        console.log('Нет геолокации');
    };
    public onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {
            target: { name, value },
        } = event;
        this.setState({
            [name]: value,
        } as any);
    };
    public onAddressSubmit = async () => {
        const { toAddress } = this.state;
        const { google } = this.props;
        const maps = google.maps;
        const result = await geoCode(toAddress);

        if (result !== false) {
            const { lat, lng, formatted_address: formatedAddress } = result;
          if (!result) {
            this.setState({
              address: ""
            } as any);
            toast.info("Не было найдено подходящий мест");
            return;
          }
            if (this.toMarker) {
                this.toMarker.setMap(null);
            }
            const toMarkerOptions = {
                position: {
                    lat,
                    lng,
                },
            };
            this.toMarker = new maps.Marker(toMarkerOptions);
            this.toMarker.setMap(this.map);
            const bounds = new maps.LatLngBounds();
            bounds.extend({ lat, lng });
            bounds.extend({ lat: this.state.lat, lng: this.state.lng });
            this.map.fitBounds(bounds);
            this.setState(
                {
                    toAddress: formatedAddress,
                    toLat: lat,
                    toLng: lng,
                },
                this.createPath
            );
        }
    };
    public createPath = () => {
        const { toLat, toLng, lat, lng } = this.state;
        const { google } = this.props;
        if (this.directions) {
            this.directions.setMap(null);
        }
        const renderOptions = {
            polylineOptions: {
                strokeColor: '#000',
            },
            suppressMarkers: true,
        };
        this.directions = new google.maps.DirectionsRenderer(renderOptions);
        const directionsService = new google.maps.DirectionsService();
        const to = new google.maps.LatLng(toLat, toLng);
        const from = new google.maps.LatLng(lat, lng);
        const directionsOptions = {
            destination: to,
            origin: from,
            travelMode: google.maps.TravelMode.DRIVING,
        };
        directionsService.route(directionsOptions, this.handleRouteRequest);
    };
    public handleRouteRequest = (result, status) => {
        const { google } = this.props;
        if (status === google.maps.DirectionsStatus.OK) {
            const { routes } = result;
            const {
                distance: { text: distance },
                duration: { text: duration },
            } = routes[0].legs[0];
            this.directions.setDirections(result);
            this.directions.setMap(this.map);
            this.setState(
                {
                    distance,
                    duration,
                },
                this.setPrice
            );
        } else {
            toast.error('Здесь нету дороги ');
        }
    };
    public setPrice = () => {
        const { distance } = this.state;
        if (distance) {
            this.setState({
                price: Number(
                    parseFloat(distance.replace(',', '')) * 0.3 + 3
                ).toFixed(2),
            });
        }
    };
    renderDrivers = (newDrivers = drivers as any, init = false) => {
        const { google } = this.props;

        if (!init) {
            const removedDrivers = drivers.filter((driver) => !newDrivers.find(({ id }) => id === driver.id));
            if (removedDrivers) {
                removedDrivers.forEach(({driverMarker}) => {
                    driverMarker.setMap(null);
                })
            }
        }
        for (const driver of newDrivers) {
            if (driver && driver.lastLat && driver.lastLng) {
                const exisitingDriver: any = drivers.find(
                    ({driverMarker}: any) => {
                        const markerID = driverMarker.get('ID');
                        return markerID === driver.id;
                    }
                );
                if (exisitingDriver) {
                    const { driverMarker } = exisitingDriver;
                    driverMarker.setPosition({
                        lat: driver.lastLat,
                        lng: driver.lastLng,
                    });
                    driverMarker.setMap(this.map);
                } else {
                    const markerOptions = {
                        icon: {
                            path:
                            google.maps.SymbolPath
                                .BACKWARD_CLOSED_ARROW,
                            scale: 5,
                        },
                        position: {
                            lat: driver.lastLat,
                            lng: driver.lastLng,
                        },
                    };
                    const newMarker: any = new google.maps.Marker(
                        markerOptions
                    );
                    drivers.push({ ...driver, driverMarker: newMarker});
                    newMarker.set('ID', driver.id);
                    newMarker.setMap(this.map);
                }
            }
        }
    };
    public handleNearbyDrivers = (data, dataUserProfile) => {
        if (data && dataUserProfile) {
            const {
                GetNearbyDrivers: { drivers, ok },
            } = data;
            const { GetMyProfile: { user: { id }}} = dataUserProfile;
            if (ok && drivers) {
                this.renderDrivers(drivers.filter(({ id: driverId}) => driverId !== id));
            }
        }
    };
    public handleRideRequest = (data) => {
        const { history } = this.props;
        const { RequestRide } = data;
        if (RequestRide.ok) {
            toast.success('Поиск водителя...');
            history.push(`/ride/${RequestRide.ride!.id}`);
        } else {
            toast.error(RequestRide.error);
        }
    };
    public handleProfileQuery = (data) => {
        const { GetMyProfile } = data;
        if (GetMyProfile.user) {
            const {
                user: { isDriving },
            } = GetMyProfile;
            this.setState({
                isDriving,
            });
        }
    };
    public handleRideAcceptance = (cache, {data}) => {
        const { history } = this.props;
        const { UpdateRideStatus } = data;
        if (UpdateRideStatus.ok) {
            history.push(`/ride/${UpdateRideStatus.rideId}`);
        }
        else {

            const query = cache.readQuery({
                query: GET_NEARBY_RIDE
            });
            if (query) {
                const {
                    GetNearbyRide
                } = query;
                GetNearbyRide.ok = false;
                GetNearbyRide.ride = null;
            }
            cache.writeQuery({ query: USER_PROFILE, data: query });
            toast.error("Пользователь отменил поездку");
        }
    };
}

export default graphql<any, any>(REPORT_LOCATION, {
    name: 'reportLocation',
})(HomeContainer);
