import { useCallback, useEffect } from "react";
import { Handle, Position } from "@xyflow/react";

function TextUpdaterNode(props: any) {
  const isConnectable = props.isConnectable;
  useEffect(() => {
    console.log("PROPS", props);
  });
  function updateNodeInputs(event: any, name: any, type: any) {
    let currentNode = props.nodes.find((node: any) => node.id == props.id);
    let nodesWithoutCurrentNode = props.nodes.filter(
      (node: any) => node.id != props.id,
    );
    let inputs = currentNode.data.inputs.filter((i: any) => {
      return i.name != name;
    });
    inputs.push({ name, value: event.target.value, type });
    nodesWithoutCurrentNode.push({
      ...currentNode,
      data: {
        ...currentNode.data,
        inputs,
      },
    });
    props.setNodes(nodesWithoutCurrentNode);
  }

  return (
    <div className="text-updater-node">
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
      />
      <div className="flex flex-col bg-gray-500">
        {props.data.action}{" "}
        {props.data.inputs.map((input: any) => (
          <div>
            <label style={{ color: "black" }}>{input.name}</label>{" "}
            <input
              key={input.name}
              type={input.type}
              value={input.value}
              placeholder={input.name}
              onChange={(event) =>
                updateNodeInputs(event, input.name, input.type)
              }
              autoFocus={true}
            />
          </div>
        ))}{" "}
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable={isConnectable}
      />
    </div>
  );
}

export default TextUpdaterNode;
