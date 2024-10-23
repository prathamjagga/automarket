import React from "react";

import { Sidebar } from "flowbite-react";
import { HiChartPie, HiViewBoards } from "react-icons/hi";
import { MdOutlineDeveloperMode } from "react-icons/md";
import { GiRobotHelmet } from "react-icons/gi";
import { FaShoppingBag } from "react-icons/fa";
import { PiPlugsConnectedFill } from "react-icons/pi";
import Link from "next/link";

function SidebarWrapper() {
  return (
    <div className="w-fit px-2 ">
      <Sidebar
        style={{ height: "92vh", boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.2)" }}
        aria-label="Default sidebar example"
        className="rounded-lg shadow-md"
      >
        <Sidebar.Items style={{ borderRadius: "10px" }}>
          <Sidebar.ItemGroup>
            <Link href="apps">
              <Sidebar.Item
                icon={MdOutlineDeveloperMode}
                className="hover:text-[#5072A7] hover:shadow-lg"
              >
                <div className="flex transform-gpu flex-row items-center justify-between transition-transform duration-300 ease-in-out hover:translate-x-3">
                  <p>App Builder</p>
                  {/* <p>👷‍♂️</p> */}
                </div>
              </Sidebar.Item>
            </Link>
            <Link href="market">
              <Sidebar.Item
                icon={FaShoppingBag}
                className="hover:text-[#5072A7] hover:shadow-lg"
              >
                <div className="flex transform-gpu flex-row items-center justify-between transition-transform duration-300 ease-in-out hover:translate-x-3">
                  <p>AutoMarket</p>
                  {/* <p>👜</p> */}
                </div>
              </Sidebar.Item>{" "}
            </Link>
            <Link href="connections">
              <Sidebar.Item
                icon={PiPlugsConnectedFill}
                className="hover:text-[#5072A7] hover:shadow-lg"
              >
                <div className="flex transform-gpu flex-row items-center justify-between transition-transform duration-300 ease-in-out hover:translate-x-3">
                  <p>Connections</p>
                  {/* <p>🔌</p> */}
                </div>
              </Sidebar.Item>{" "}
            </Link>
            <Link href="connections">
              <Sidebar.Item
                icon={GiRobotHelmet}
                className="hover:text-[#5072A7] hover:shadow-lg"
              >
                <div className="flex transform-gpu flex-row items-center justify-between transition-transform duration-300 ease-in-out hover:translate-x-3">
                  <p>Generate with AI</p>
                  {/* <p>🔌</p> */}
                </div>
              </Sidebar.Item>{" "}
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
    </div>
  );
}

export default SidebarWrapper;
