"use client";

import { useEffect, useState } from "react";
import { SERVER_URL } from "../../env";
import ConnectionsForm from "./token-form";
import { Sidebar } from "flowbite-react";
import SidebarWrapper from "../_components/sidebar";

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
      <div className="flex flex-row">
        <div className="connections-left">
          <SidebarWrapper />
        </div>
        <div className="connections-right">
          <h1>Connections</h1>
          <button onClick={() => setShowAddConnectionPopup(true)}>
            Add a connection
          </button>
          {/* connections list */}
          {connections.map((conn: any) => {
            return <li>{conn.platform}</li>;
          })}
          {/* Add connection Popup */}
          {showAddConnectionPopup && (
            <ConnectionsForm
              setShowAddConnectionPopup={setShowAddConnectionPopup}
            />
          )}
        </div>
      </div>
    </>
  );
}
