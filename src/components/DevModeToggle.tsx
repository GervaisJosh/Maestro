import React from 'react';

const DevModeToggle = ({ userRole, setUserRole }) => {
  return (
    <div className="z-50">
      <select
        value={userRole || 'customer'}
        onChange={(e) => setUserRole(e.target.value)}
        className="bg-gray-700 text-white px-3 py-2 rounded-md"
      >
        <option value="customer">Customer View</option>
        <option value="admin">Admin View</option>
      </select>
    </div>
  );
};

export default DevModeToggle;