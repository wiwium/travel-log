import React, { useEffect } from 'react';
import { useState } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import {listLogEntries} from './API';

function App() {
  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '100vh',
    latitude: 18.74806,
    longitude: 73.407219,
    zoom: 4
  });

  const [showPopup, setShowPopup] = useState({});
 
  const [logEntries, setLogEntries] = useState([]);

  const [doubleClickPopup, setDoubleClickPopup] = useState(null);

  useEffect(() => {
    (async ()=> {
      setLogEntries(await listLogEntries());
    })()
  },[]);
  
  function handleDoubleClick(data){
    console.log(data);
    const [longitude, latitude] = data.lngLat;

    setDoubleClickPopup({
      longitude: longitude,
      latitude: latitude,
    })

  }

  return (
  <>
    <ReactMapGL
      {...viewport}
      onViewportChange={nextViewport => setViewport(nextViewport)}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      mapStyle='mapbox://styles/mapbox/streets-v11'
      doubleClickZoom={false}
      onDblClick={(data) => handleDoubleClick(data)}
    >
      {
        logEntries.map(entry => (
          <React.Fragment key={entry._id}>
            <Marker
              
              latitude={entry.latitude} 
              longitude={entry.longitude} 
              offsetLeft={-20}
              offsetTop={-10}>
              <svg onClick={() => {
                setShowPopup({[entry._id]: true});
              }} 
              xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>

            </Marker>
            {showPopup[entry._id] ?
            <Popup
              latitude={entry.latitude}
              longitude={entry.longitude}
              closeButton={true}
              closeOnClick={false}
              onClose={() => setShowPopup({})}
              anchor="top" >
              <div>You are here</div>
            </Popup>
            
            :null
            }
          </React.Fragment>
        ))
      }

      {
        doubleClickPopup ? 
          <Popup
            latitude={doubleClickPopup.latitude}
            longitude={doubleClickPopup.longitude}
            closeButton={true}
            closeOnClick={false}
            onClose={() => setDoubleClickPopup(null)}
            anchor="top" >
            <div>You are here</div>
          </Popup>
        :null
      
      }


    </ReactMapGL>
  </>
  );
}

export default App;
