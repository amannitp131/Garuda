import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AuthorityDashboard = () => {
  const data = {
    labels: ['Junction A', 'Junction B', 'Junction C', 'Junction D'],
    datasets: [
      {
        label: 'Average Wait Time (s)',
        data: [45, 60, 30, 75],
        backgroundColor: 'rgba(99, 179, 237, 0.7)',
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100 p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-blue-400">Signal Control</h2>
          <div className="space-y-4">
            <p>
              Junction A:{' '}
              <button className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded transition">Go</button>{' '}
              <button className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded transition">Stop</button>
            </p>
            <p>
              Junction B:{' '}
              <button className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded transition">Go</button>{' '}
              <button className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded transition">Stop</button>
            </p>
          </div>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-blue-400">Emergency Priority</h2>
          <p className="mb-2">🚑 Ambulance EN-ROUTE to City Hospital</p>
          <p className="text-green-400">Green corridor activated.</p>
        </div>
        <div className="md:col-span-2 bg-gray-800 p-6 rounded-lg shadow-lg mt-6">
          <h2 className="text-2xl font-bold mb-4 text-blue-400">Analytics</h2>
          <Bar data={data} options={{
            plugins: {
              legend: { labels: { color: '#fff' } },
              title: { color: '#fff' }
            },
            scales: {
              x: { ticks: { color: '#fff' }, grid: { color: 'rgba(255,255,255,0.1)' } },
              y: { ticks: { color: '#fff' }, grid: { color: 'rgba(255,255,255,0.1)' } }
            }
          }} />
        </div>
      </div>
    </div>
  );
};

export default AuthorityDashboard;
