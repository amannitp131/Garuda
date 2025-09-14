"use client";
import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import "leaflet-defaulticon-compatibility";

// Custom CSS for modern dark look
const mapStyle = {
    height: '100vh',
    width: '100%',
    borderRadius: '16px',
    boxShadow: '0 4px 24px rgba(0,0,0,0.6)',
    overflow: 'hidden',
    border: '2px solid #222',
};

const Map = () => {
    return (
        <div style={{ background: '#181818', padding: '24px', minHeight: '100vh' }}>
            <MapContainer center={[28.6139, 77.2090]} zoom={13} style={mapStyle}>
                <TileLayer
                    url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                    attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
                />
            </MapContainer>
        </div>
    );
};

export default Map;
