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
import StandardNode from "./nodes/StandardNode";
import { useSearchParams } from "next/navigation";
import WorkflowResultPopup from "./result";

function Page() {
  /* initialise the UI bitch */

  const params = useSearchParams();

  useEffect(() => {
    fetchActions();
    if (params.get("id")) {
      fetchFlowAndSetNodesAndEdges(params.get("id"));
    }
  }, []);

  async function fetchFlowAndSetNodesAndEdges(id: any) {
    let flow: any = await fetch(`${SERVER_URL}/flow?id=${id}`);
    flow = await flow.json();
    // now we have to make changes to the given flow to get it in the required format
    flow = JSON.parse(flow.flow_string);

    // generate nodes
    let generatedNodes: any = [];
    let y = -17;
    for (let i = 0; i < flow.nodes.length; i++) {
      let obj: any = {};
      obj.id = crypto.randomUUID();
      obj.position = { x: 360, y };
      y += 110;
      obj.type = "standardNode";
      obj.data = {};
      obj.data.action = flow.nodes[i];
      obj.data.inputs = [];
      for (let key in flow.inputs[i]) {
        let x: any = {};
        x.name = key;
        x.value = flow.inputs[i][key];
        x.type = "text"; // TODO: change this type dynamically
        obj.data.inputs.push(x);
      }
      generatedNodes.push(obj);
    }
    console.log("generatedNodes", generatedNodes);
    setNodes(generatedNodes);

    // generate edges now
    debugger;
    if (generatedNodes.length < 2) return;
    let prevId = generatedNodes[0].id;
    for (let i = 1; i < generatedNodes.length; i++) {
      let edge: any = { sourceHandle: null, targetHandle: null };
      edge.source = prevId;
      edge.target = generatedNodes[i].id;
      prevId = generatedNodes[i].id;
      onConnect(edge);
    }
  }

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

  /* ui logic */
  const [actions, setActions] = useState([]);
  const [runs, setRuns] = useState<any>([]);
  const [workflowResult, setWorkflowResult] = useState<any>("");
  const [workflowRunning, setWorkflowRunning] = useState(false);
  const [showResult, setShowResult] = useState(false);
  async function fetchActions() {
    const res = await fetch(`${SERVER_URL}/actions`);
    const data = await res.json();
    let uniqueActionNames = data.map((action: any) => action.action_name);
    uniqueActionNames = new Set(uniqueActionNames);
    setActions(Array.from(uniqueActionNames));
  }
  function getNodesInOrder(edges: any) {
    const inDegree = new Map();
    const outDegree = new Map();
    const nodes = new Set();
    const result = [];

    // Populate in-degree, out-degree and all nodes
    edges.forEach(({ source, target }: any) => {
      nodes.add(source);
      nodes.add(target);

      // Calculate in-degree
      inDegree.set(target, (inDegree.get(target) || 0) + 1);
      inDegree.set(source, inDegree.get(source) || 0); // ensure source is in the map
    });

    // Topological sort using Kahn's Algorithm
    const zeroInDegreeQueue = [];
    for (let [node, degree] of inDegree.entries()) {
      if (degree === 0) zeroInDegreeQueue.push(node);
    }

    while (zeroInDegreeQueue.length) {
      const node = zeroInDegreeQueue.shift();
      result.push(node);

      for (let { source, target } of edges) {
        if (source === node) {
          inDegree.set(target, inDegree.get(target) - 1);
          if (inDegree.get(target) === 0) {
            zeroInDegreeQueue.push(target);
          }
        }
      }
    }

    // If all nodes are in the result, it's a valid ordering
    return result.length === nodes.size ? result : null;
  }

  function isLinearAcyclicGraph(edges: any) {
    const inDegree = new Map();
    const outDegree = new Map();
    const nodes = new Set();

    // Populate in-degree, out-degree and all nodes
    edges.forEach(({ source, target }: any) => {
      nodes.add(source);
      nodes.add(target);

      // Calculate in-degree
      inDegree.set(target, (inDegree.get(target) || 0) + 1);
      inDegree.set(source, inDegree.get(source) || 0); // ensure source is in the map

      // Calculate out-degree
      outDegree.set(source, (outDegree.get(source) || 0) + 1);
      outDegree.set(target, outDegree.get(target) || 0); // ensure target is in the map
    });

    // Check that no node has more than one incoming or outgoing edge
    for (let node of nodes) {
      if (inDegree.get(node) > 1 || outDegree.get(node) > 1) {
        return false; // not a linear graph if any node has more than one in or out degree
      }
    }

    // Detect cycles using a topological sort (Kahn's Algorithm)
    const zeroInDegreeQueue = [];
    for (let [node, degree] of inDegree.entries()) {
      if (degree === 0) zeroInDegreeQueue.push(node);
    }

    let visitedCount = 0;

    while (zeroInDegreeQueue.length) {
      const node = zeroInDegreeQueue.shift();
      visitedCount++;

      for (let { source, target } of edges) {
        if (source === node) {
          inDegree.set(target, inDegree.get(target) - 1);
          if (inDegree.get(target) === 0) {
            zeroInDegreeQueue.push(target);
          }
        }
      }
    }

    // If the number of visited nodes is equal to the number of nodes, it's acyclic
    return visitedCount === nodes.size;
  }

  function saveToMarket() {
    let nodesInOrder: any;
    if (isLinearAcyclicGraph(edges)) {
      nodesInOrder = getNodesInOrder(edges);
      nodesInOrder = nodesInOrder.map((node: any) =>
        nodes.find((n: any) => n.id == node),
      );
      console.log(nodesInOrder);
    } else {
      return;
    }
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
  function generateFlowFromEdges() {}
  function runNodesInOrder(nodes: any) {
    setShowResult(true);
    setWorkflowRunning(true);
    if (!params.get("id")) {
      alert("please save the app first");
      setWorkflowRunning(false);
      return;
    }
    let nodeNames: any = [];
    let nodeInputs: any = [];
    nodes.forEach((node: any) => {
      nodeNames.push(node.data.action);
      let x = node.data.inputs.reduce((acc: any, { name, value }: any) => {
        acc[name] = value;
        return acc;
      }, {});
      nodeInputs.push(x);
    });
    console.log("running nodes in order", {
      nodes: nodeNames,
      input: nodeInputs,
    });
    fetch(`${SERVER_URL}/run-flow`, {
      method: "POST",
      body: JSON.stringify({
        nodes: nodeNames,
        input: nodeInputs,
        workflow_id: params.get("id"),
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        setWorkflowRunning(false);
        setWorkflowResult(JSON.stringify(res));
        refreshRuns();
      });
  }
  function runFlow() {
    let nodesInOrder: any;
    if (nodes.length == 1) {
      runNodesInOrder(nodes);
      return;
    }
    if (isLinearAcyclicGraph(edges)) {
      nodesInOrder = getNodesInOrder(edges);
      nodesInOrder = nodesInOrder.map((node: any) =>
        nodes.find((n: any) => n.id == node),
      );
      console.log("nodes in order", nodesInOrder);
    } else {
      return;
    }
    runNodesInOrder(nodesInOrder);
  }
  function scheduleWf() {
    let nodeNames: any = [];
    let nodeInputs: any = [];
    nodes.forEach((node: any) => {
      nodeNames.push(node.data.action);
      let x = node.data.inputs.reduce((acc: any, { name, value }: any) => {
        acc[name] = value;
        return acc;
      }, {});
      nodeInputs.push(x);
    });
    fetch(`${SERVER_URL}/add-cron-run`, {
      method: "POST",
      body: JSON.stringify({
        interval: 10,
        endTime: Date.now() + 24 * 60 * 60 * 1000,
        inputs: nodeInputs,
        nodes: nodeNames,
      }),
    });
  }
  function refreshRuns() {}
  useEffect(() => {
    console.log("edges change", edges);
  }, [edges]);
  useEffect(() => {
    console.log("nodes change", nodes);
  }, [nodes]);

  /*auth and session */
  const { data: sessionData, status } = useSession();
  useEffect(() => {
    console.log("show result change", showResult);
  }, [showResult]);
  return (
    <div>
      {showResult == true && (
        <WorkflowResultPopup
          setShow={setShowResult}
          result={workflowResult}
          loading={workflowRunning}
        />
      )}
      <div className="w-100 flex items-center justify-between shadow-md">
        <div>
          <Image
            className="center pl-3"
            src="/logo.png"
            alt="logo"
            width={180}
            height={100}
          />
        </div>
        <div className="flex items-center gap-3 pr-3">
          <div className="p-2 font-semibold">
            👋 Hello! {sessionData?.user?.name}
          </div>
          {status === "unauthenticated" ? (
            <div>
              <button
                onClick={() => signIn("google", { callbackUrl: "/" })}
                className="rounded bg-[#5072A7] px-[6px] py-[2px] text-white hover:bg-[#6699CC]"
              >
                Sign in
              </button>
            </div>
          ) : (
            <div>
              <button
                onClick={() => signOut()}
                className="rounded bg-[#5072A7] px-[6px] py-[2px] text-white hover:bg-[#6699CC]"
              >
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-4 pt-5">
        <div className="pl-3">
          <SidebarWrapper />
        </div>
        <div className=" flex flex-col" style={{ width: "100%" }}>
          <div className="canvas-and-runs w-100 flex gap-5 pr-3">
            <div
              style={{
                width: "75%",
                height: "84vh",
                background: "#F3F4F6",
                borderRadius: "10px",
              }}
            >
              {!showResult && (
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
              )}
              <div className="action-buttons flex flex-row gap-5 p-5">
                <button
                  className="rounded bg-[#5072A7] px-[6px] py-[2px] text-white hover:bg-[#6699CC]"
                  onClick={() => saveToMarket()}
                >
                  Save to Market
                </button>
                <button
                  className="rounded bg-[#5072A7] px-[6px] py-[2px] text-white hover:bg-[#6699CC]"
                  onClick={runFlow}
                >
                  Run Flow
                </button>
                <button
                  className="rounded bg-[#5072A7] px-[6px] py-[2px] text-white hover:bg-[#6699CC]"
                  onClick={scheduleWf}
                >
                  Schedule
                </button>
              </div>
            </div>

            <div style={{ width: "25%" }}>
              <div className="actions-container rounded-lg shadow-md">
                <h1 className="w-100 rounded-t-lg bg-gray-500 p-2 text-white">
                  Add More Actions
                </h1>
                <div
                  className="actions pl-2"
                  style={{ height: "400px", overflowY: "scroll" }}
                >
                  {actions.map((action: any) => {
                    return (
                      <>
                        {" "}
                        <button
                          className="action mb-1 w-[98%] p-2 text-left hover:text-[#5072A7]"
                          onClick={() => addNode(action)}
                        >
                          <p className="transition-transform duration-300 ease-in-out hover:translate-x-3">
                            {action}
                          </p>
                        </button>
                        <div className="border-b-2"></div>
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
