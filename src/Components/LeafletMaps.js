import React from 'react'
import { Map as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet';
import './css/LeafletMaps.css'

function Map(props) {
    return (
      <LeafletMap
        center={props.center ? props.center : [35, 10]}
        zoom={props.zoom ? props.zoom : 1.5}
        maxZoom={10}
        attributionControl={true}
        zoomControl={true}
        doubleClickZoom={true}
        scrollWheelZoom={true}
        dragging={true}
        animate={true}
        easeLinearity={0.35}
      >
        <TileLayer
          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
        />
        {props.MarkerData ? props.MarkerData.map((e, i) => <Marker key={i} position={[e.location.coordinates[1], e.location.coordinates[0]]}>
          <Popup>
            {e.name}
          </Popup>
        </Marker>) : ""}
      </LeafletMap>
    );
  }

export default Map