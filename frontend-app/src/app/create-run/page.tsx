"use client";

import { Sidebar } from "flowbite-react";
import { HiChartPie, HiViewBoards } from "react-icons/hi";

export function Component() {
  return (
    <Sidebar aria-label="Default sidebar example">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item href="#" icon={HiChartPie}>
            App Builder 👷‍♂️
          </Sidebar.Item>
          <Sidebar.Item
            href="#"
            icon={HiViewBoards}
            // label="Pro"
            labelColor="dark"
          >
            Run Apps 🚀
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}

function AppBuilderCanvas() {
  const entities = ["Read Text File 📚", "Summarize Text 📃"];

  console.log("Entities", entities);

  const DraggableEntity = ({ id }: any) => {
    const dragStart = (e: any) => {
      console.log("dragging!", e.target.id);
      e.dataTransfer.setData("entity", e.target.id);
    };
    return (
      <div
        className="draggableEntity"
        id={id}
        draggable="true"
        onDragStart={dragStart}
      />
    );
  };

  const DroppableArea = ({ id }: any) => {
    const drop = (e: any) => {
      e.preventDefault();
      const data = e.dataTransfer.getData("entity");
      e.target.appendChild(document.getElementById(data));
      console.log("yep");
    };
    const allowDrop = (e: any) => {
      e.preventDefault();
    };
    return (
      <div className="droppableArea" onDrop={drop} onDragOver={allowDrop}>
        hey
      </div>
    );
  };

  return (
    <main>
      <div className="draggableArea">
        {entities.map((entity) => (
          <DraggableEntity key={entity} id={entity} />
        ))}
      </div>
      <DroppableArea />
    </main>
  );
}

function AppBuilder() {
  return (
    <div>
      <h1>Select actions in correct order.</h1>
      <AppBuilderCanvas />
      <button className="rounded bg-blue-500 p-2 text-white">Create</button>
    </div>
  );
}

function CreateRun() {
  return (
    <div className="flex flex-row">
      <div>
        <Component />
      </div>
      <div>
        <AppBuilder />
      </div>
      <div></div>
    </div>
  );
}

export default CreateRun;
