import { HiDocumentText, HiChartPie } from "react-icons/hi";

export default function RunApps() {
  return (
    <div className="  align-items-center flex  w-[100vw] flex-col justify-center">
      <input type="text" placeholder="search" className="m-10" />
      <br />
      <h3 className="pb-10 text-center">Available Apps</h3>
      <div className="align-items-center flex cursor-pointer flex-row justify-center">
        <HiChartPie size={100} />
        <HiDocumentText size={100} />
      </div>
    </div>
  );
}
