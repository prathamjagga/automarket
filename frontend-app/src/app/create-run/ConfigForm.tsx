"use client";

import { list } from "postcss";
import React, { useContext, useEffect, useState } from "react";
import { BuilderContext, useDrawer } from "react-flow-builder";
import WorkflowContext from "./WorkflowContext";

const ConfigForm: React.FC = () => {
  // const { nodes, setNodes } = useContext(WorkflowContext);
  let workflowContext: any = useContext(WorkflowContext);
  let [prevNodeOutputs, setPrevNodeOutputs] = useState([]);
  let [prevNodeIdx, setPrevNodeIdx] = useState<number>(0);
  let nodes = workflowContext.nodes;
  let setNodes = workflowContext.setNodes;
  const { selectedNode }: any = useContext(BuilderContext);
  console.log("SELECTED NODE", selectedNode);

  // console.log("NODES", nodes);/
  // console.log("NODES", nodes)
  useEffect(() => {
    fetch("https://starfish-app-qfx4x.ondigitalocean.app/actions")
      .then((res) => res.json())
      .then((res) => {
        // setActionItems(res);
        setActionItems(["textSummarizer", "readFile"]);
        setFieldValues(res);
      });
  }, []);

  useEffect(() => {
    // fetch("https://starfish-app-qfx4x.ondigitalocean.app/output/");
    console.log("moved here");
    if (nodes.length > 3) {
      let idx = 0;
      for (let node of nodes) {
        if (node.id == selectedNode.id) {
          setPrevNodeIdx(idx - 1);
          break;
        }
        idx = idx + 1;
      }

      idx = idx - 1;
      console.log("PREV NODE IDX", idx);
      if (
        !(idx < 0) &&
        nodes[idx].data != null &&
        nodes[idx].data.name != "select an action"
      ) {
        fetch(
          "https://starfish-app-qfx4x.ondigitalocean.app/outputs/" +
            nodes[idx].data.name,
        )
          .then((res) => res.json())
          .then((res) => {
            setPrevNodeOutputs(res.outputs);
            console.log(prevNodeOutputs);
          });
      }
    }
  }, [selectedNode]);

  async function handleSelectionChange(e: any) {
    setName(e.target.value);
    setFields(null);
    setFieldValues(null);
    let inputs = await fetch(
      "https://starfish-app-qfx4x.ondigitalocean.app/action/" + e.target.value,
    );
    inputs.json().then((res) => {
      setFields(res.inputs);
      setFieldValues({});
    });
  }

  const { closeDrawer: cancel, saveDrawer: save } = useDrawer();
  const [name, setName] = useState<string | null>("select an action");
  const [actionItems, setActionItems] = useState<any[]>([]);
  const [actionInput, setActionInput] = useState<string>("");

  const [fields, setFields] = useState<any[] | null>(null);
  const [fieldValues, setFieldValues] = useState<any | null>(null);

  const handleSubmit = async (data: any) => {
    save({ name: data, input: fieldValues });
    cancel();
  };

  return (
    <div>
      <select
        value={name == null ? "select an action" : name}
        onChange={handleSelectionChange}
      >
        <option>Select an action</option>
        {actionItems.map((item) => {
          return <option value={item}>{item}</option>;
        })}
      </select>
      {fields &&
        fields.map((field, index) => (
          <>
            {field.type === "text" && (
              <input
                type="text"
                placeholder={field.name}
                value={fieldValues[field.name]}
                onChange={(e) =>
                  setFieldValues({
                    ...fieldValues,
                    [field.name]: e.target.value,
                  })
                }
              />
            )}
            {field.type === "url" && (
              <input
                type="url"
                placeholder={field.name}
                value={fieldValues[field.name]}
                onChange={(e) =>
                  setFieldValues({
                    ...fieldValues,
                    [field.name]: e.target.value,
                  })
                }
              />
            )}
          </>
        ))}
      <div>
        <button className="m-2 rounded border-solid	 border-zinc-400 bg-zinc-500 px-4 py-2 font-bold text-white hover:bg-yellow-700">
          Cancel
        </button>
        <button
          className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
          onClick={() => handleSubmit(name)}
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default ConfigForm;
