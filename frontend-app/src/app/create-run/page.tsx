"use client";

import SidebarWrapper from "../_components/sidebar";

import {
  ReactFlow,
  Background,
  Controls,
  applyEdgeChanges,
  applyNodeChanges,
  addEdge,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";
import { useEffect, useCallback, useState } from "react";
import { SERVER_URL } from "~/env";
import StandardNode from "./nodes/StandardNode";
import "./nodes/standardnode.css";

export default function Page() {
  /* states for nodes and edges */
  const nodeTypes = {
    standardNode: (props: any) => (
      <StandardNode {...props} nodes={nodes} setNodes={setNodes} />
    ),
  };
  const [nodes, setNodes] = useState<any>([]);
  useEffect(() => {
    console.log("nodes changed", nodes);
  }, [nodes]); // listen for nodes changes
  const [edges, setEdges] = useState<any>([]);
  const onNodesChange = useCallback(
    (changes: any) => setNodes((nds: any) => applyNodeChanges(changes, nds)),
    [],
  );
  const onEdgesChange = useCallback(
    (changes: any) => setEdges((eds: any) => applyEdgeChanges(changes, eds)),
    [],
  );
  const onConnect = useCallback(
    (params: any) => setEdges((eds: any) => addEdge(params, eds)),
    [],
  );
  /* nodes and edges logic */
  async function addNode(action: any) {
    let id = crypto.randomUUID();
    setNodes((nodes: any) => [
      ...nodes,
      {
        id,
        data: { action },
        position: { x: 0, y: 0 },
        type: "standardNode",
      },
    ]);
  }
  const [actions, setActions] = useState([]);
  async function fetchActions() {
    const res = await fetch(`${SERVER_URL}/actions`);
    const data = await res.json();
    let uniqueActionNames = data.map((action: any) => action.action_name);
    uniqueActionNames = new Set(uniqueActionNames);
    setActions(Array.from(uniqueActionNames));
  }

  function isValidLinearGraph(edges: any) {
    return true;
  }
  function saveToMarket() {
    isValidLinearGraph(edges);
    let ids = edges.map((edge: any) => edge.source);
    let ids2 = edges.map((edge: any) => edge.target);
    let input = [...new Set([...ids, ...ids2])];
    let nodesData = [];
    for (let id of input) {
      for (let i = 0; i < nodes.length; i++) {
        if (nodes[i].id == id) {
          nodesData.push(nodes[i]);
        }
      }
    }
    console.log(nodesData);
  }
  function runFlow() {
    console.log("nodes", nodes);
    fetch(`${SERVER_URL}/run-flow`, {
      method: "POST",
      body: JSON.stringify({
        nodes: ["textSummarizer"],
        input: [{ text: "hello world" }],
      }),
    });
  }
  useEffect(() => {
    fetchActions();
  }, []);
  useEffect(() => {
    console.log("edges change");
  }, [edges]);
  useEffect(() => {
    console.log("nodes change", nodes);
  }, [nodes]);
  return (
    <div className="flex flex-row">
      <SidebarWrapper />
      <div>
        <div className="w-100 text-center">Automarket</div>

        <div className="flex flex-row">
          <div
            style={{ width: "900px", height: "90vh", background: "#F3F4F6" }}
          >
            <ReactFlow
              nodes={nodes}
              onNodesChange={onNodesChange}
              edges={edges}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              nodeTypes={nodeTypes}
            >
              <Background />
              <Controls />
            </ReactFlow>
            <div className="action-buttons m-5 flex flex-row">
              <button
                className="mr-5 bg-blue-500 p-2 hover:bg-blue-400"
                onClick={() => saveToMarket()}
              >
                Save to Market
              </button>
              <button
                className="bg-blue-500 p-2 hover:bg-blue-400"
                onClick={runFlow}
              >
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
                      <button
                        className="action mb-2 bg-blue-300 hover:bg-blue-400"
                        onClick={() => addNode(action)}
                      >
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
      </div>
    </div>
  );
}
