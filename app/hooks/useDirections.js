import MapViewDirections from "react-native-maps-directions";
import useLocation from "./useLocation";


export default function  useDirections(destination){ //Pass in destionation as prop w/ coords.
    const Location = useLocation();
    const [destination, setDestionation] = useState({
        destination={
            latitude: destination.latitude,
            longitude: destination.longitude
        }
    });
    return(
        <MapViewDirections
            origin={location}
            destination={destination}
            apikey={'AIzaSyB65lV0eONvq5_rGwaZm7pMHOJZYM4gVMk'}
            strokeWidth={5} 
       ></MapViewDirections>
    );
}