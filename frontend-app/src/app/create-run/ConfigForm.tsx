"use client";

import { list } from "postcss";
import React, { useContext, useEffect, useState } from "react";
import { BuilderContext, useDrawer } from "react-flow-builder";
import WorkflowContext from "./WorkflowContext";
import { SERVER_URL } from "../../env";

const ConfigForm: React.FC = () => {
  // const { nodes, setNodes } = useContext(WorkflowContext);
  let workflowContext: any = useContext(WorkflowContext);
  let [prevNodeOutputs, setPrevNodeOutputs] = useState([]);
  let [prevNodeIdx, setPrevNodeIdx] = useState<number>(0);
  let [showSelectConnection, setShowSelectConnection] = useState(false);
  let [connections, setConnections] = useState([]);
  let [selectedConnection, setSelectedConnection] = useState({
    platform: "",
    token: "",
    username: "",
    password: "",
  });
  let nodes = workflowContext.nodes;
  let setNodes = workflowContext.setNodes;
  const { selectedNode }: any = useContext(BuilderContext);
  console.log("SELECTED NODE", selectedNode);

  // console.log("NODES", nodes);/
  // console.log("NODES", nodes)
  useEffect(() => {
    fetch(`${SERVER_URL}/actions`)
      .then((res) => res.json())
      .then((res) => {
        // setActionItems(res);
        let actions = res.map((item: any) => item.action_name);
        let uniqueActions = [...new Set(actions)];
        setActionItems(uniqueActions);
        setFieldValues(res);
      });
  }, []);

  useEffect(() => {
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
        fetch(`${SERVER_URL}/outputs/` + nodes[idx].data.name)
          .then((res) => res.json())
          .then((res) => {
            setPrevNodeOutputs(res.outputs);
            console.log(prevNodeOutputs);
          });
      }
    }
  }, [selectedNode]);

  async function fetchConnectons() {
    fetch(`${SERVER_URL}/connections`)
      .then((res) => res.json())
      .then((res) => {
        console.log("RECIEVED CONNECTIONS", res);
        setConnections(res);
      });
  }

  function selectConnection(e: any) {
    debugger;
    console.log("SELECTED CONNECTION", e.target.value);
    setSelectedConnection(e.target.value);
    let connectionByName: any = connections.find(
      (x: any) => x.platform == e.target.value,
    );
    setFieldValues({
      ...fieldValues,
      token: connectionByName.token,
    });
  }
  async function handleSelectionChange(e: any) {
    setName(e.target.value);
    setFields(null);
    setFieldValues(null);
    let inputs = await fetch(`${SERVER_URL}/action/` + e.target.value);
    inputs.json().then((res) => {
      console.log("RES INPUTS", res.inputs);
      let resIncludesToken = false;
      res.inputs.map((item: any) => {
        if (item.name == "token") {
          resIncludesToken = true;
        }
      });
      if (resIncludesToken) {
        setShowSelectConnection(true);
        fetchConnectons();
        let fieldsWithoutToken = res.inputs.filter((item: any) => {
          return item.name != "token";
        });
        setFields(fieldsWithoutToken);
      } else {
        setFields(res.inputs);
      }
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
            {showSelectConnection && (
              <>
                <label>Select a connection</label>
                <select
                  value={selectedConnection.platform}
                  onChange={selectConnection}
                >
                  <option>Select an connection</option>
                  {connections.map((c: any) => (
                    <option>{c.platform}</option>
                  ))}
                </select>
              </>
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
