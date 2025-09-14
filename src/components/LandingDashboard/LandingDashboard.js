import React, { useState } from 'react';
import dynamic from 'next/dynamic';
const Map = dynamic(() => import('../Map/Map'), { ssr: false });

// Sample data for city junctions
const junctionsData = [
  {
    id: 'A',
    name: 'Junction A',
    flow: 'High',
    vehiclesWaiting: 12,
    avgWaitTime: 45,
  },
  {
    id: 'B',
    name: 'Junction B',
    flow: 'Medium',
    vehiclesWaiting: 45,
    avgWaitTime: 30,
  },
  {
    id: 'C',
    name: 'Junction C',
    flow: 'Low',
    vehiclesWaiting: 5,
    avgWaitTime: 10,
  },
  {
    id: 'D',
    name: 'Junction D',
    flow: 'High',
    vehiclesWaiting: 30,
    avgWaitTime: 50,
  },
];

const flowColors = {
  Low: 'text-green-400',
  Medium: 'text-yellow-400',
  High: 'text-red-400',
};

const sortOptions = [
  { label: 'Congestion (Flow)', value: 'flow' },
  { label: 'Vehicles Waiting', value: 'vehiclesWaiting' },
  { label: 'Average Wait Time', value: 'avgWaitTime' },
];

function getFlowRank(flow) {
  // For sorting: High = 3, Medium = 2, Low = 1
  return flow === 'High' ? 3 : flow === 'Medium' ? 2 : 1;
}

const LandingDashboard = () => {
  const [sortBy, setSortBy] = useState('flow');
  const [sortAsc, setSortAsc] = useState(false);

  const sortedJunctions = [...junctionsData].sort((a, b) => {
    if (sortBy === 'flow') {
      return sortAsc
        ? getFlowRank(a.flow) - getFlowRank(b.flow)
        : getFlowRank(b.flow) - getFlowRank(a.flow);
    } else {
      return sortAsc
        ? a[sortBy] - b[sortBy]
        : b[sortBy] - a[sortBy];
    }
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-gray-900 min-h-screen p-4">
      <div className="md:col-span-2">
        <Map />
      </div>
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col">
        <h2 className="text-2xl font-bold mb-6 text-white">Live Indicators</h2>
        <div className="space-y-6 mb-8">
          <div>
            <h3 className="font-semibold text-gray-300">Signal Phases</h3>
            <p>Junction A: <span className="text-green-400 font-bold">Green</span></p>
            <p>Junction B: <span className="text-red-400 font-bold">Red</span></p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-300">Vehicles Waiting</h3>
            <p>Junction A: <span className="text-white">12</span></p>
            <p>Junction B: <span className="text-white">45</span></p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-300">Emergency Vehicles</h3>
            <p>Active: <span className="text-yellow-400 font-bold">2</span></p>
          </div>
        </div>
        {/* Crowd Flow List Feature */}
        <div className="mt-4">
          <h3 className="text-xl font-bold text-white mb-4">City Crowd Flow List</h3>
          <div className="flex items-center mb-2">
            <label className="text-gray-300 mr-2">Sort by:</label>
            <select
              className="bg-gray-700 text-white rounded px-2 py-1"
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
            >
              {sortOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            <button
              className="ml-2 px-2 py-1 bg-gray-700 text-white rounded"
              onClick={() => setSortAsc(!sortAsc)}
              title="Toggle sort order"
            >
              {sortAsc ? '↑' : '↓'}
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left">
              <thead>
                <tr className="bg-gray-700 text-gray-200">
                  <th className="px-2 py-2">Junction</th>
                  <th className="px-2 py-2">Flow</th>
                  <th className="px-2 py-2">Vehicles Waiting</th>
                  <th className="px-2 py-2">Avg Wait Time (s)</th>
                </tr>
              </thead>
              <tbody>
                {sortedJunctions.map(j => (
                  <tr key={j.id} className="border-b border-gray-600">
                    <td className="px-2 py-2 text-white">{j.name}</td>
                    <td className={`px-2 py-2 font-bold ${flowColors[j.flow]}`}>{j.flow}</td>
                    <td className="px-2 py-2 text-white">{j.vehiclesWaiting}</td>
                    <td className="px-2 py-2 text-white">{j.avgWaitTime}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingDashboard;
