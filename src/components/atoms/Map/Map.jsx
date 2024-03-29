import Map, { Marker, NavigationControl } from 'react-map-gl';
import { useState, useRef } from 'react';
import './style.css';
import mapboxgl from 'mapbox-gl';
import { useEffect } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import ExpendableMenu from '../../molecules/ExpendableMenu/ExpendableMenu';
import PuceList from '../../molecules/PuceList/PuceList';

const Mapbox = () => {

    const mapRef = useRef();
    const maxPoint = 20;

    const [coordinates, setCoordinates] = useState();
    const [addPoint, setAddPoint] = useState(false);
    const [namePoint, setNamePoint] = useState('');
    const [descriptionPoint, setDescriptionPoint] = useState('');
    const [isMapLoaded, setIsMapLoaded] = useState(false);
    const [markers, setMarkers] = useState([]);
    const [markersInfo, setMarkersInfo] = useState([]);

    const addMarker = (e) => {
        if (isMapLoaded) {
            setCoordinates(e.lngLat);
        }
    }

    useEffect(() => {
        fetch('http://localhost:8055/items/points')
            .then((response) => response.json())
            .then((data) => {
                data.data.forEach((item) => {
                    const popup = new mapboxgl.Popup({ offset: 25 }).setHTML('<h3>' + item.name + '</h3>' + '<divider></divider' + '<p>' + item.description + '</p>');
                    const el = document.createElement('div');
                    el.className = 'marker';
                    el.innerHTML = item.name;
                    const newMarker = new mapboxgl.Marker(el).setLngLat([item.long, item.lat]).setPopup(popup).addTo(mapRef.current.getMap());
                    const markerInfo = {
                        name: item.name,
                        description: item.description,
                        long: item.long,
                        lat: item.lat
                    }
                    setMarkersInfo((old) => [...old, markerInfo]);
                    setMarkers([...markers, newMarker]);
                }
                )
            });
    }, []);


    useEffect(() => {
        if (isMapLoaded) {
            const popup = new mapboxgl.Popup({ offset: 25 }).setHTML('<h3>' + namePoint + '</h3>' + '<divider></divider' + '<p>' + descriptionPoint + '</p>');
            if (markers.length < maxPoint && addPoint) {
                const el = document.createElement('div');
                el.className = 'marker';
                el.innerHTML = namePoint;
                const newMarker = new mapboxgl.Marker(el).setLngLat([coordinates.lng, coordinates.lat]).setPopup(popup).addTo(mapRef.current.getMap());
                const markerInfo = {
                    name: namePoint,
                    description: descriptionPoint,
                    long: coordinates.lng,
                    lat: coordinates.lat
                }
                setMarkersInfo((old) => [...old, markerInfo]);
                setAddPoint(false);
                setNamePoint('');
                setDescriptionPoint('');
                setMarkers([...markers, newMarker]);
                var myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");

                var raw = JSON.stringify({
                    "name": namePoint,
                    "description": descriptionPoint,
                    "long": coordinates.lng.toString(),
                    "lat": coordinates.lat.toString()
                });

                var requestOptions = {
                    method: 'POST',
                    headers: myHeaders,
                    body: raw,
                    redirect: 'follow'
                };

                fetch("http://localhost:8055/items/points", requestOptions)
                    .then(response => response.text())
            }

        }
    }, [coordinates]);

    return (
        <>
            <Map
                initialViewState={{
                    longitude: 2.5125731550255925,
                    latitude: 47.443889104089564,
                    zoom: 10
                }}
                style={{ width: 100 + 'vw', height: 400 + 'px', margin: "auto" }}
                mapStyle="mapbox://styles/mapbox/streets-v9"
                mapboxAccessToken={"pk.eyJ1IjoibmlnaHRtYXJlZXYiLCJhIjoiY2t6bXMzZHh3MDFjbzJvcXU4Z2p0a242OCJ9.iIOQHEgW0oCIwNEEHaYKug"}
                onClick={(e) => { addMarker(e) }}
                onLoad={() => { setIsMapLoaded(true) }}
                ref={mapRef}
                attributionControl={true}

            >
                <NavigationControl />

                <div style={{ position: 'absolute', padding: '10px', gap: 5 + 'px', display: 'flex', justifyContent: 'center', alignItems: 'center  ' }}>
                    <button className='bg-white hover:bg-blue-900 bg-blue-800 text-white font-semibold py-2 px-4 border border-gray-400 rounded shadow' onClick={() => {
                        markers.map((marker) => {
                            marker.remove();
                        });
                        setMarkers([]);
                        setMarkersInfo([]);
                        var myHeaders = new Headers();
                        myHeaders.append("Content-Type", "application/json");

                        var raw = JSON.stringify({
                            "query": {
                                "limit": -1
                            }
                        });

                        var requestOptions = {
                            method: 'DELETE',
                            headers: myHeaders,
                            body: raw,
                            redirect: 'follow'
                        };

                        fetch("http://localhost:8055/items/points", requestOptions)
                            .then(response => response.text());
                    }}>Supprimer tout les points</button>
                    <span style={{ display: 'block', background: 'white', color: '#1E40AF', padding: 3 + 'px' }} className="rounded">Vos points : {markersInfo.length}/{maxPoint}</span>
                </div>



            </Map>
            <div className='w-12/12 grid grid-cols-1 md:grid-cols-2'>
                <ExpendableMenu changeAddPointState={setAddPoint} changeDescriptionPoint={setDescriptionPoint} changeNamePoint={setNamePoint} />
                <PuceList items={markersInfo} />
            </div>


        </>

    )
};

export default Mapbox;
