"use client";

import React, { useState, useContext } from "react";
import FlowBuilder, {
  NodeContext,
  INode,
  IRegisterNode,
} from "react-flow-builder";
import ConfigForm from "./ConfigForm";
import { DrawerComponent, PopconfirmComponent, PopoverComponent } from "./antd";

import "./index.css";

import OutputModal from "../_components/output-component";

const StartNodeDisplay: React.FC = () => {
  const node = useContext(NodeContext);
  return <div className="start-node">{node.name}</div>;
};

const EndNodeDisplay: React.FC = () => {
  const node = useContext(NodeContext);
  return <div className="end-node">{node.name}</div>;
};

const NodeDisplay: React.FC = () => {
  const node = useContext(NodeContext);
  return (
    <div
      className={`other-node ${node.configuring ? "node-configuring" : ""} ${
        node.validateStatusError ? "node-status-error" : ""
      }`}
    >
      {node.data ? node.data.name : node.name}
    </div>
  );
};

const ConditionNodeDisplay: React.FC = () => {
  const node = useContext(NodeContext);
  return (
    <div
      className={`condition-node ${
        node.configuring ? "node-configuring" : ""
      } ${node.validateStatusError ? "node-status-error" : ""}`}
    >
      {node.data ? node.data.name : node.name}
    </div>
  );
};

const registerNodes: IRegisterNode[] = [
  {
    type: "start",
    name: "start node display",
    displayComponent: StartNodeDisplay,
    isStart: true,
  },
  {
    type: "end",
    name: "end node display",
    displayComponent: EndNodeDisplay,
    isEnd: true,
  },
  {
    type: "node",
    name: "Add Action in Sequence",
    displayComponent: NodeDisplay,
    configComponent: ConfigForm,
  },
];

const defaultNodes = [
  {
    id: "node-0d9d4733-e48c-41fd-a41f-d93cc4718d97",
    type: "start",
    name: "start",
    path: ["0"],
  },

  {
    id: "node-b106675a-5148-4a2e-aa86-8e06abd692d1",
    type: "end",
    name: "end",
    path: ["1"],
  },
];

const NodeForm = () => {
  const [nodes, setNodes] = useState<INode[]>(defaultNodes);
  const [show, setShow] = useState(false);
  const [outputText, setOutputText] = useState("");

  const handleChange = (nodes: INode[]) => {
    console.log("nodes change", nodes);
    setNodes(nodes);
  };
  function saveFlow() {
    let nodeArray = [];
    let nodeInputs = [];
    if (nodes.length <= 2) alert("Can't save - invalid workflow");
    for (let val of nodes) {
      if (val.data != null) {
        console.log(val.data);
        nodeArray.push(val.data.name);
        nodeInputs.push(val.data.input);
      }
    }

    let firstInput = nodeInputs[0];

    let body = { nodes: nodeArray, input: firstInput };
    // fetch("http://localhost:8000/add-flow", {
    //   method: "POST",
    //   headers: {
    //     "Content-type": "application/json",
    //   },
    //   body: JSON.stringify(body),
    // })
    // .then((res) => res.json())
    // .then((res) => {
    //   console.log("DONE", res);
    // });

    fetch("http://localhost:8000/run-flow", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((res) => {
        setOutputText(res.output.content);
        setShow(true);
      });
  }
  return (
    <div className="w-[80vw]">
      <OutputModal show={show} setShow={setShow} text={outputText} />
      <FlowBuilder
        nodes={nodes}
        onChange={handleChange}
        registerNodes={registerNodes}
        historyTool
        zoomTool
        DrawerComponent={DrawerComponent}
        PopoverComponent={PopoverComponent}
        PopconfirmComponent={PopconfirmComponent}
      />
      <button
        className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
        onClick={() => saveFlow()}
      >
        Save Flow
      </button>
      <button
        className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
        onClick={() => saveFlow()}
      >
        Run Flow
      </button>
    </div>
  );
};

export default NodeForm;
