"use client";

import { useCallback, useEffect, useState } from "react";
import { Handle, Position } from "@xyflow/react";
import { SERVER_URL } from "~/env";

const handleStyle = { left: 10 };

function StandardNode(props: any) {
  console.log("props-data", props);
  /* states*/
  const [nodeId, setNodeId] = useState<any>("");
  const [currentNode, setCurrentNode] = useState<any>();
  const [modifiedNodes, setModifiedNodes] = useState<any>();
  const [actionInputs, setActionInputs] = useState<any>();
  async function loadActionInputs(action: any) {
    const res = await fetch(`${SERVER_URL}/action/${action}`);
    const data = await res.json();
    return data;
  }
  useEffect(() => {
    async function fetchActionInputsAsync() {
      let actionInputs = await loadActionInputs(props.data.action);
      setActionInputs(actionInputs);
    }
    fetchActionInputsAsync();
    let nodeId = props.id;
    let currentNode = props.nodes.find((node: any) => node.id == nodeId);
    let modifiedNodes =
      props.nodes.filter((node: any) => node.id != nodeId) || [];
    console.log("MODIFIED NODES", modifiedNodes);
    setNodeId(nodeId);
    setCurrentNode(currentNode);
    setModifiedNodes(modifiedNodes);
  }, []);
  const onChange = () => {
    let x = modifiedNodes;
    x.push({
      ...currentNode,
      data: { ...currentNode.data, text: "hello world" },
    });
    setModifiedNodes(x);
    props.setNodes(x);
  };

  return (
    <div className="standard-node">
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={props.isConnectable}
      />
      <div>
        <label htmlFor="text">Text:</label>
        <input id="text" name="text" onChange={onChange} className="nodrag" />
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        id="a"
        style={handleStyle}
        isConnectable={props.isConnectable}
      />
    </div>
  );
}

export default StandardNode;
