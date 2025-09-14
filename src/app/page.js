"use client";
import React, { useState } from 'react';
import LandingDashboard from '../components/LandingDashboard/LandingDashboard';
import CommuterDashboard from '../components/CommuterDashboard/CommuterDashboard';
import AuthorityDashboard from '../components/AuthorityDashboard/AuthorityDashboard';

export default function Home() {
  const [activeDashboard, setActiveDashboard] = useState('landing');

  const renderDashboard = () => {
    switch (activeDashboard) {
      case 'landing':
        return <LandingDashboard />;
      case 'commuter':
        return <CommuterDashboard />;
      case 'authority':
        return <AuthorityDashboard />;
      default:
        return <LandingDashboard />;
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-4 bg-gray-900 text-gray-100 transition-colors duration-300">
      <h1 className="text-4xl font-bold mb-8 text-blue-400 drop-shadow-lg">Garuda Netra</h1>
      <nav className="flex gap-4 mb-8">
        <button
          onClick={() => setActiveDashboard('landing')}
          className={`px-4 py-2 rounded-lg shadow-md transition-colors duration-200 ${
            activeDashboard === 'landing'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          }`}
        >
          City Overview
        </button>
        <button
          onClick={() => setActiveDashboard('commuter')}
          className={`px-4 py-2 rounded-lg shadow-md transition-colors duration-200 ${
            activeDashboard === 'commuter'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          }`}
        >
          Commuter
        </button>
        <button
          onClick={() => setActiveDashboard('authority')}
          className={`px-4 py-2 rounded-lg shadow-md transition-colors duration-200 ${
            activeDashboard === 'authority'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          }`}
        >
          Authority
        </button>
      </nav>
      <div className="w-full bg-gray-800 rounded-xl p-6 shadow-lg">
        {renderDashboard()}
      </div>
    </main>
  );
}
