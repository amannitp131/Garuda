import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const Map = dynamic(() => import('../Map/Map'), { ssr: false });

const mockRoutes = [
  {
    id: 'A',
    name: 'Shortest Route',
    traffic: 'Moderate congestion',
    eta: 22,
    color: 'blue',
    coordinates: [[12.9716, 77.5946], [12.9352, 77.6245]], // Example coordinates
  },
  {
    id: 'B',
    name: 'Longer Route',
    traffic: 'Light traffic',
    eta: 25,
    color: 'green',
    coordinates: [[12.9716, 77.5946], [12.9279, 77.6271]],
  },
  {
    id: 'C',
    name: 'Scenic/Backup Route',
    traffic: 'Heavier traffic',
    eta: 30,
    color: 'orange',
    coordinates: [[12.9716, 77.5946], [12.9141, 77.6387]],
  },
];

const CommuterDashboard = () => {
  const [micActive, setMicActive] = useState(false);
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [routes, setRoutes] = useState(mockRoutes);
  const [selectedRoute, setSelectedRoute] = useState('A');
  const [liveEta, setLiveEta] = useState(routes.find(r => r.id === selectedRoute).eta);

  // Auto-detect current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setSource(`${pos.coords.latitude},${pos.coords.longitude}`),
        () => setSource('Unable to detect location')
      );
    }
  }, []);

  // Simulate real-time ETA updates (replace with Socket.IO in production)
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveEta((prevEta) => prevEta + (Math.random() > 0.5 ? 1 : -1));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleMicClick = () => setMicActive((prev) => !prev);

  const handleRouteSelect = (id) => {
    setSelectedRoute(id);
    const route = routes.find(r => r.id === id);
    setLiveEta(route.eta);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-gray-900 min-h-screen text-gray-100">
      <div className="md:col-span-2">
        <Map
          routes={routes}
          highlightedRoute={selectedRoute}
        />
      </div>
      <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-white">Route Planner</h2>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <label htmlFor="source" className="block font-semibold text-gray-300">Mic -mode</label>
            <button
              type="button"
              aria-label={micActive ? "Turn off mic" : "Turn on mic"}
              onClick={handleMicClick}
              className={`ml-2 p-2 rounded-full border ${micActive ? 'bg-green-600' : 'bg-gray-700'} text-white`}
            >
              {micActive ? (
                <span role="img" aria-label="Mic On">🎤</span>
              ) : (
                <span role="img" aria-label="Mic Off">🎙️</span>
              )}
            </button>
          </div>
          <input
            type="text"
            id="source"
            value={source}
            onChange={e => setSource(e.target.value)}
            placeholder="Detecting current location..."
            className="w-full p-2 border border-gray-700 bg-gray-900 text-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div>
            <label htmlFor="destination" className="block font-semibold text-gray-300">Destination</label>
            <input
              type="text"
              id="destination"
              value={destination}
              onChange={e => setDestination(e.target.value)}
              className="w-full p-2 border border-gray-700 bg-gray-900 text-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block font-semibold text-gray-300 mb-2">Choose a Path:</label>
            <div className="space-y-2">
              {routes.map(route => (
                <button
                  key={route.id}
                  className={`w-full p-2 rounded border ${selectedRoute === route.id ? 'border-blue-500 bg-blue-700' : 'border-gray-700 bg-gray-900'} text-left transition`}
                  onClick={() => handleRouteSelect(route.id)}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-bold">{`Path ${route.id} – ${route.name}`}</span>
                    <span className="text-sm text-gray-400">{route.traffic}</span>
                  </div>
                  <div className="text-green-400">{`ETA: ${selectedRoute === route.id ? liveEta : route.eta} mins`}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
        <hr className="my-4 border-gray-700" />
        <div>
          <h3 className="text-lg font-bold text-white">
            Selected Path: <span className="text-blue-400">{selectedRoute}</span>
          </h3>
          <p className="text-green-400">Live ETA: {liveEta} minutes</p>
          <p className="text-gray-400">Traffic: {routes.find(r => r.id === selectedRoute).traffic}</p>
        </div>
      </div>
    </div>
  );
};

export default CommuterDashboard;
