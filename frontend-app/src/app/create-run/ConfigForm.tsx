"use client";

import React, { useContext, useEffect, useState } from "react";
import { BuilderContext, useDrawer } from "react-flow-builder";
import { Form, Button, Input } from "antd";

const ConfigForm: React.FC = () => {
  useEffect(() => {
    fetch("http://localhost:8000/actions")
      .then((res) => res.json())
      .then((res) => {
        setActionItems(res);
      });
  }, []);
  const { selectedNode: node } = useContext(BuilderContext);

  const { closeDrawer: cancel, saveDrawer: save } = useDrawer();
  const [name, setName] = useState<string | null>("select an action");
  const [actionItems, setActionItems] = useState<any[]>([]);
  const [actionInput, setActionInput] = useState<string>("");

  const handleSubmit = async (data: any) => {
    save({ name: data, input: actionInput });
    cancel();
  };

  return (
    <div>
      <select
        value={name == null ? "select an action" : name}
        onChange={(e) => setName(e.target.value)}
      >
        {actionItems.map((item) => {
          return <option value={item.name}>{item.name}</option>;
        })}
      </select>

      <input
        type="text"
        value={actionInput}
        onChange={(e) => setActionInput(e.target.value)}
        placeholder="enter action input"
      />
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
