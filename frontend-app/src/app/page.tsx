import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  let router = useRouter();
  useEffect(() => {
    router.push("/create-run");
  }, []);
  return <div>Setting up, please wait 🙂</div>;
}
