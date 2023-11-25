"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export const ToDoInput = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");

  async function createToDo() {
    const res = await fetch("https://v1.appbackend.io/v1/rows/O70zcH27AlTh", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify([{"title": title,"desc":"4"}]),
    });
    
    const {data} = await res.json();
    console.log(data);
    router.refresh();
  }

  return (
    <div className="mb-5">
      <h3 className="mb-2">Input Todo :</h3>
      <input className="mr-2 px-2" onChange={(e) => setTitle(e.target.value)} />
      <button className="px-2 items-center bg-blue-500 hover:bg-blue-700 text-white rounded" onClick={createToDo}>Save</button>
    </div>
  );
};
