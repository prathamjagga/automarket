"use client";

import React, { useContext, useState } from "react";
import { BuilderContext, useDrawer } from "react-flow-builder";
import { Form, Button, Input } from "antd";

const ConfigForm: React.FC = () => {
  const { selectedNode: node } = useContext(BuilderContext);

  const { closeDrawer: cancel, saveDrawer: save } = useDrawer();
 const [name, setName] = useState<string | null>("select an action");

 const handleSubmit = async (data: any) => {
   save({ name: data });
   cancel()
 };

 return (
   <div>
     <select
       value={name == null ? "select an action" : name}
       onChange={(e) => setName(e.target.value)}
     >
       <option value={"readTextFile"} style={{ color: "black" }}>
         {" "}
         select an action{" "}
       </option>
       <option value={"readTextFile"} style={{ color: "black" }}>
         {" "}
         readTextFile{" "}
       </option>

       <option value={"textSummarizer"} style={{ color: "black" }}>
         {" "}
         textSummarizer
       </option>
     </select>
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
