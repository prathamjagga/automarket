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
    name: "node display",
    displayComponent: NodeDisplay,
    configComponent: ConfigForm,
  },
  {
    type: "condition",
    name: "condition node display",
    displayComponent: ConditionNodeDisplay,
    configComponent: ConfigForm,
  },
  {
    type: "branch",
    name: "condition",
    conditionNodeType: "condition",
  },
  {
    type: "loop",
    name: "node display",
    displayComponent: NodeDisplay,
    isLoop: true,
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

  const handleChange = (nodes: INode[]) => {
    console.log("nodes change", nodes);
    setNodes(nodes);
  };

  return (
    <div className="w-[80vw]">
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
    </div>
  );
};

export default NodeForm;
