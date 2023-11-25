"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export const ToDoInput = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [error, setError] = useState("");

  async function createToDo() {
    if (title === "") {
      setError("Title cannot be empty.");
    } else {
      const res = await fetch("https://v1.appbackend.io/v1/rows/O70zcH27AlTh", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify([{ title: title, desc: desc }]),
      });

      const { data } = await res.json();
      setTitle("");
      setDesc("");
      router.refresh();
    }
  }

  return (
    <div className="mb-5 space-y-1 w-full">
      <h3 className="mb-2">Input Todo :</h3>
      <div className="flex flex-col">
        <div>
          <p>Title</p>
          <input
            value={title}
            className="w-full resize-none rounded pr-2 pl-2"
            onChange={(e) => {
              setTitle(e.target.value);
              setError("");
            }}
          />
        </div>
        <div className="pt-2">
          <p>Description</p>
          <textarea
            value={desc}
            rows={3}
            className="w-full resize-none rounded pr-2 pl-2"
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>
      </div>

      <button
        className="w-full items-center bg-blue-500 hover:bg-blue-700 text-white rounded"
        onClick={createToDo}
      >
        Add
      </button>
      <p className="text-red-500">{error}</p>
    </div>
  );
};
