import React, { useEffect, useState } from "react";

const App = () => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);

  const fetchItems = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/items");
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      setItems(data);
      setError(null); // Clear any previous errors
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>Items List</h1>

      {error ? (
        <p style={{ color: "red" }}>⚠️ {error}</p>
      ) : (
        <ul>
          {items.map((item, index) => (
            <li key={index}>
              <strong>Name:</strong> {item.name} <br />
              <strong>Roll No:</strong> {item.rollNo} <br />
              <strong>Major:</strong> {item.major}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default App;

