"use client";

import SidebarWrapper from "../_components/sidebar";

import { ReactFlow, Background, Controls } from "@xyflow/react";

import "@xyflow/react/dist/style.css";
import { useEffect, useState } from "react";
import { SERVER_URL } from "~/env";

export default function Page() {
  /* states for nodes and edges */
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [actions, setActions] = useState([]);
  async function fetchActions() {
    const res = await fetch(`${SERVER_URL}/actions`);
    const data = await res.json();
    let uniqueActionNames = data.map((action: any) => action.action_name);
    uniqueActionNames = new Set(uniqueActionNames);
    setActions(Array.from(uniqueActionNames));
  }
  useEffect(() => {
    fetchActions();
  }, []);
  return (
    <div className="flex flex-row">
      <SidebarWrapper />
      <div style={{ width: "600px", height: "80vh", background: "#F3F4F6" }}>
        <ReactFlow nodes={nodes} edges={edges}>
          <Background />
          <Controls />
        </ReactFlow>
        <div className="action-buttons m-5 flex flex-row">
          <button className="mr-5 bg-blue-500 p-2 hover:bg-blue-400">
            Save to Market
          </button>
          <button className="bg-blue-500 p-2 hover:bg-blue-400">
            Run Flow
          </button>
        </div>
      </div>
      <div className="ml-5 w-80">
        <div className="actions-container">
          <h1 className="w-100 mb-3 bg-gray-500">Add More Actions</h1>
          <div
            className="actions"
            style={{ height: "370px", overflow: "scroll" }}
          >
            {actions.map((action: any) => {
              return (
                <>
                  {" "}
                  <button className="action mb-2 bg-blue-300 hover:bg-blue-400 ">
                    <p>{action}</p>
                  </button>
                  <br></br>
                </>
              );
            })}
          </div>
        </div>
        <div className="workflow-runs">
          <h1 className="w-100 mb-10 bg-gray-500">Workflow Runs</h1>
          <div className="recent-run bg-gray-200">
            <p>Run ID: 1</p>
            <p>Status: Success</p>
          </div>
        </div>
      </div>
    </div>
  );
}
