import { HeaderTemplate } from "../../templates/HeaderTemplate";
import {GoogleMap, LoadScript, MarkerF} from '@react-google-maps/api';

const containerStyle = {
    width: '100%',
    height: '100%',
    border: '2px solid #000',
    borderRadius: '8px',
    overflow: 'hidden'
};

const center = {
    lat: -29.464304,
    lng: -51.968327
};

export function FindUs() {
    return (
        <HeaderTemplate>
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-4">Find Us</h1>
                <p className="mb-4">
                    Our address is: Rua Bento Gonçalves 991, Lajeado, RS, Brazil. Feel
                    welcomed to visit us!
                </p>
                <p className="mb-2">Working hours:</p>
                <ul className="list-disc pl-6 mb-6">
                    <li>Monday: 7:00 - 18:30</li>
                    <li>Tuesday: 7:00 - 18:30</li>
                    <li>Wednesday: 7:00 - 18:30</li>
                    <li>Thursday: 7:00 - 18:30</li>
                    <li>Friday: 7:00 - 18:30</li>
                    <li>Saturday: 7:00 - 12:00</li>
                </ul>
                <div className="w-full h-96">
                    <LoadScript googleMapsApiKey="AIzaSyAwOlQ6qDXwbz0b-ZIT74ETr9LB2hSIyIw">
                        <GoogleMap
                            mapContainerStyle={containerStyle}
                            center={center}
                            zoom={15}
                        >
                            <MarkerF position={center} />
                        </GoogleMap>
                    </LoadScript>
                </div>
            </div>
        </HeaderTemplate>
    );
}

export default FindUs;