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
import { useEffect, useCallback, useState, useMemo } from "react";
import { SERVER_URL } from "~/env";
import "./nodes/standardnode.css";
import Image from "next/image";
import { SessionProvider, signIn, signOut, useSession } from "next-auth/react";
import StandardNode from "./nodes/TextUpdaterNode";

function Page() {
  const nodeTypes: any = {
    standardNode: (props: any) => (
      <StandardNode {...props} setNodes={setNodes} nodes={nodes} />
    ),
  };
  /* states for nodes and edges */
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
  const onConnect = useCallback((params: any) => {
    console.log("onConnect", params);
    return setEdges((eds: any) => addEdge(params, eds));
  }, []);
  /* nodes and edges logic */
  async function addNode(action: any) {
    let id = crypto.randomUUID();
    let actionInputs: any = await fetch(`${SERVER_URL}/action/${action}`);
    actionInputs = await actionInputs.json();
    setNodes((nodes: any) => [
      ...nodes,
      {
        id,
        data: { action, inputs: actionInputs.inputs },
        position: { x: 50, y: 50 },
        type: "standardNode",
      },
    ]);
  }
  function isValidLinearGraph(edges: any) {
    return true;
  }

  /* ui logic */
  const [actions, setActions] = useState([]);
  const [runs, setRuns] = useState<any>([]);
  async function fetchActions() {
    const res = await fetch(`${SERVER_URL}/actions`);
    const data = await res.json();
    let uniqueActionNames = data.map((action: any) => action.action_name);
    uniqueActionNames = new Set(uniqueActionNames);
    setActions(Array.from(uniqueActionNames));
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
    })
      .then((res) => res.json())
      .then((res) => {
        setRuns([...runs, { id: crypto.randomUUID() }]);
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

  /*auth and session */
  const { data: sessionData, status } = useSession();
  return (
    <div className="flex flex-row">
      <SidebarWrapper />
      <div className=" flex flex-col" style={{ width: "100%" }}>
        <div className="w-100 align-items-center flex flex-row justify-center text-center">
          <div>
            <Image
              className="center"
              src="/logo.png"
              alt="logo"
              width={200}
              height={200}
            />
          </div>
          <div>👋 Hello {sessionData?.user?.name}</div>
          {status === "unauthenticated" ? (
            <div>
              <button
                onClick={() => signIn("google", { callbackUrl: "/" })}
                className="bg-blue-500 p-2 hover:bg-blue-400"
              >
                Sign in
              </button>
            </div>
          ) : (
            <div>
              <button
                onClick={() => signOut()}
                className="bg-blue-500 p-2 hover:bg-blue-400"
              >
                Sign out
              </button>
            </div>
          )}
        </div>

        <div className="canvas-and-runs w-100 flex flex-row">
          <div style={{ width: "70%", height: "80vh", background: "#F3F4F6" }}>
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
          <div style={{ width: "30%" }}>
            <div className="actions-container">
              <h1 className="w-100 mb-3 bg-gray-500">Add More Actions</h1>
              <div
                className="actions"
                style={{ height: "370px", overflowY: "scroll" }}
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
            <div>
              <h1 className=" mt-4 bg-gray-500">Workflow Runs</h1>
              <div className=" h-48 overflow-y-scroll">
                {runs &&
                  runs.map((run: any) => (
                    <div className="pt-2 text-sm">
                      ID: {run.id} <br />
                      Status: Success
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default () => {
  return (
    <SessionProvider>
      <Page />
    </SessionProvider>
  );
};
