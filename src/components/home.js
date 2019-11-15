import React, { useState, useEffect } from 'react';

const Home = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
  }, []);

  if (!loading) return <p>LOADING</p>;
  return (
    <div className="main">
      <h2 className="title">Stake Pool Management</h2>
      <p className="version">v0.1.0</p>
    </div>
  );
};

export default Home;
