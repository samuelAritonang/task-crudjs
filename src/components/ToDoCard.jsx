"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export const ToDoCard = ({ _id, title, desc }) => {
  const router = useRouter();
  const [onEdit, setOnEdit] = useState(false);
  const [currentTitle, setCurrentTitle] = useState(title);
  const [currentDesc, setCurrentDesc] = useState(desc);

  async function handleDelete() {
    await fetch("https://v1.appbackend.io/v1/rows/O70zcH27AlTh", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify([_id]),
    });

    router.refresh();
  }

  async function handleUpdate() {
    const res = await fetch("https://v1.appbackend.io/v1/rows/O70zcH27AlTh", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        _id: _id,
        title: currentTitle,
        desc: currentDesc,
      }),
    });

    const data = await res.json();
    setOnEdit(false);
    router.refresh();
  }

  return (
    <div className="flex flex-col gap-2 p-2 pt-5 border-2 rounded-lg relative bg-yellow-200">
      {onEdit ? (
        <>
          <p>Title</p>
          <input
            value={currentTitle}
            onChange={(e) => setCurrentTitle(e.target.value)}
            className="border-2 p-2 rounded-lg"
          />
          <p>Description</p>
          <textarea
            rows={3}
            value={currentDesc}
            onChange={(e) => setCurrentDesc(e.target.value)}
            className="border-2 p-2 rounded-lg"
          />
        </>
      ) : (
        <>
          <div className="text-center">
            <h3>{currentTitle}</h3>
          </div>
          <div>
            <p>{currentDesc}</p>
          </div>
        </>
      )}
      {onEdit ? (
        <button
          className="text-xs bg-emerald-300 text-black p-1 rounded-lg"
          onClick={handleUpdate}
        >
          Update
        </button>
      ) : (
        <button
          className="text-xs bg-yellow-500 text-black p-1 rounded-lg"
          onClick={() => setOnEdit(true)}
        >
          Edit
        </button>
      )}
      <button
        className="text-center absolute text-xs bg-rose-300 text-black w-4 h-4 rounded-full top-1 right-1"
        onClick={handleDelete}
      >
        X
      </button>
    </div>
  );
};
