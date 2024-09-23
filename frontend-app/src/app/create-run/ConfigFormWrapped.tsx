"use client";

import { list } from "postcss";
import React, { useContext, useEffect, useState } from "react";
import { BuilderContext, useDrawer } from "react-flow-builder";

export default function ConfigFormWrapped(
  nodes: any,
  nodeNumber: any,
): React.FC {
  const ConfigForm: React.FC = () => {
    console.log("NODES", nodes);
    useEffect(() => {
      fetch("https://automarket.onrender.com//actions")
        .then((res) => res.json())
        .then((res) => {
          // setActionItems(res);
          setActionItems(["textSummarizer", "readFile"]);
          setFieldValues(res);
        });
    }, []);

    async function handleSelectionChange(e: any) {
      setName(e.target.value);
      setFields(null);
      setFieldValues(null);
      let inputs = await fetch(
        "https://automarket.onrender.com//action/" + e.target.value,
      );
      inputs.json().then((res) => {
        setFields(res.inputs);
        setFieldValues({});
      });
    }

    const { selectedNode: node } = useContext(BuilderContext);
    const { closeDrawer: cancel, saveDrawer: save } = useDrawer();
    const [name, setName] = useState<string | null>("select an action");
    const [actionItems, setActionItems] = useState<any[]>([]);
    const [actionInput, setActionInput] = useState<string>("");
    const [fields, setFields] = useState<any[] | null>(null);
    const [fieldValues, setFieldValues] = useState<any | null>(null);

    useEffect(() => {
      console.log("SELECTED NODE", node);
    }, [node]);

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
  return ConfigForm;
}
