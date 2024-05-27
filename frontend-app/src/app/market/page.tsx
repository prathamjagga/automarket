"use client";

import React, { useState, useEffect } from "react";
import SidebarWrapper from "../_components/sidebar";
import OutputModal from "../_components/output-component";

function Market() {
  const [show, setShow] = useState(false);
  // const [nodeNumber, setNodeNumber] = useState(0);
  const [outputText, setOutputText] = useState("");
  function saveFlow(save: Boolean, nodes: any, inputs: any) {
    let nodeArray = nodes;
    let nodeInputs = inputs;
    let app_name;
    if (save) {
      app_name = prompt("enter app name");
    }
    // if (nodes.length <= 0) {
    //   alert("invalid workflow");
    //   return;
    // }

    // let firstInput = nodeInputs[0];

    let body = { nodes: nodeArray, input: nodeInputs };
    // fetch("https://starfish-app-qfx4x.ondigitalocean.app/add-flow", {
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

    fetch(
      `https://starfish-app-qfx4x.ondigitalocean.app/${save ? "save-flow" : "run-flow"}`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(body),
      },
    )
      .then((res) => res.json())
      .then((res) => {
        if (!save) {
          if (res.output.type == "json") setOutputText(res.output.content.text);
          else setOutputText(res.output.content);
          setShow(true);
        } else {
          alert("Wohooo🥳🎉 -- Your is app is published to AUTOMARKET 🚀👜");
        }
      });
  }

  const [apps, setApps] = useState([]);
  useEffect(() => {
    fetch("https://starfish-app-qfx4x.ondigitalocean.app/apps")
      .then((res) => res.json())
      .then((res) => setApps(res));
  }, []);
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <OutputModal show={show} setShow={setShow} text={outputText} />
      <SidebarWrapper />
      <div style={{ display: "flex", flexDirection: "column" }}>
        <h1>Market</h1>
        <div>
          {apps.map((app: any, idx) => (
            <div
              key={idx}
              className="m-4 w-[500px] bg-gray-500 p-2"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              {app.app_name}
              <button
                onClick={() =>
                  saveFlow(
                    false,
                    JSON.parse(app.flow_string).nodes,
                    JSON.parse(app.flow_string).inputs,
                  )
                }
                className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
              >
                Run App
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Market;
