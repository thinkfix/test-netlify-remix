import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
    width: '100%',
    height: '400px'
};

const center = {
    lat: 59.9279679,
    lng: 10.7896515
};

export default function ContactMap() {

    return (
        <>
            <LoadScript
                googleMapsApiKey="AIzaSyCZfgdz04wgqT4zZd8F_D_J0GI1CEi3lIE"
            >
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={17}
                >
                    <Marker position={center} label={"TinyElephant"} title={"TinyElephant"}/>
                </GoogleMap>
            </LoadScript>
        </>
    )

}