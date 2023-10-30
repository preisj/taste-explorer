import { HeaderTemplate } from "../../templates/HeaderTemplate";
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

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

export function FindNearbyMarkets() {
    return (
        <HeaderTemplate>
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-4">Find Nearby Markets</h1>
                <p className="mb-4">
                    Explore the local markets in your area and discover fresh ingredients for your culinary adventures.
                </p>
                <p className="mb-2">Visit us at:</p>
                <p className="mb-4">Rua Bento Gonçalves 991, Lajeado, RS, Brazil</p>
                <p className="mb-2">Working hours:</p>
                <ul className="list-disc pl-6 mb-6">
                    <li>Monday: 7:00 AM - 6:30 PM</li>
                    <li>Tuesday: 7:00 AM - 6:30 PM</li>
                    <li>Wednesday: 7:00 AM - 6:30 PM</li>
                    <li>Thursday: 7:00 AM - 6:30 PM</li>
                    <li>Friday: 7:00 AM - 6:30 PM</li>
                    <li>Saturday: 7:00 AM - 12:00 PM</li>
                </ul>
                <div className="w-full h-96">
                    <LoadScript googleMapsApiKey="YOUR_API_KEY">
                        <GoogleMap
                            mapContainerStyle={containerStyle}
                            center={center}
                            zoom={15}
                        >
                            <Marker position={center} />
                        </GoogleMap>
                    </LoadScript>
                </div>
            </div>
        </HeaderTemplate>
    );
}

export default FindNearbyMarkets;