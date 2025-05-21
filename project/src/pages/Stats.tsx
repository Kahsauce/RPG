import React from 'react';

function Stats() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Statistics</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Training Progress</h2>
          <p className="text-gray-600">Training statistics will be displayed here</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Competition Results</h2>
          <p className="text-gray-600">Competition statistics will be displayed here</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Health Metrics</h2>
          <p className="text-gray-600">Health and fitness metrics will be displayed here</p>
        </div>
      </div>
    </div>
  );
}

export default Stats;