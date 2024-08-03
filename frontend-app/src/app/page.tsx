"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Loader from "./_components/Loader/loader"

export default function Page() {
  let router = useRouter();
  useEffect(() => {
    router.push("/create-run");
  }, []);
  return <div>{<Loader />}</div>;
}
