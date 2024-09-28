"use client";

import { useEffect, useState } from "react";
import { SERVER_URL } from "../../env";
import ConnectionsForm from "./token-form";

export default function Connections() {
  const [connections, setConnections] = useState([]);
  const [showAddConnectionPopup, setShowAddConnectionPopup] = useState(false);
  useEffect(() => {
    fetch(`${SERVER_URL}/connections`)
      .then((res) => res.json())
      .then((res) => setConnections(res));
  }, []);
  return (
    <>
      <h1>Connections</h1>
      <button onClick={() => setShowAddConnectionPopup(true)}>
        Add a connection
      </button>
      {/* connections list */}
      {/* {connections.map((conn: any) => {
        <li>{conn.name}</li>;
      })} */}
      {/* Add connection Popup */}
      {showAddConnectionPopup && (
        <ConnectionsForm
          setShowAddConnectionPopup={setShowAddConnectionPopup}
        />
      )}
    </>
  );
}
