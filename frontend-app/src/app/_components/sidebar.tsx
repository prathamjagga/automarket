import React from "react";

import { Sidebar } from "flowbite-react";
import { HiChartPie, HiViewBoards } from "react-icons/hi";
import Link from "next/link";

function SidebarWrapper() {
  return (
    <Sidebar style={{ height: "100vh" }} aria-label="Default sidebar example">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Link href="create-run">
            <Sidebar.Item icon={HiChartPie}>App Builder 👷‍♂️</Sidebar.Item>
          </Link>
          <Link href="market">
            <Sidebar.Item icon={HiChartPie}>AutoMarket 🚀👜</Sidebar.Item>{" "}
          </Link>
          <Link href="connections">
            <Sidebar.Item icon={HiChartPie}>Connections 🔌</Sidebar.Item>{" "}
          </Link>

          {/* <Sidebar.Item
            href="/run-apps"
            icon={HiViewBoards}
            // label="Pro"
            labelColor="dark"
          >
            Run Apps 🚀
          </Sidebar.Item> */}
        </Sidebar.ItemGroup>
        <Sidebar.ItemGroup
          style={{ position: "absolute", bottom: "10px", left: "20px" }}
        >
          {/* <Sidebar.Item
            href="#"
            icon={HiViewBoards}
            // label="Pro"
            labelColor="dark"
            onClick={() => {
              alert("Flow saved as app");
            }}
          >
            Save flow as App
          </Sidebar.Item> */}
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}

export default SidebarWrapper;
