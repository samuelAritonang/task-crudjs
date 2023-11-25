"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export const ToDoCard = ({ _id, title, desc }) => {
  const router = useRouter();
  const [onEdit, setOnEdit] = useState(false);
  const [currentTitle, setCurrentTitle] = useState(title);
  const [currentDesc, setCurrentDesc] = useState(desc);

  async function handleDelete() {
    await fetch("https://v1.appbackend.io/v1/rows/O70zcH27AlTh" , {
      method: "DELETE",
      headers: {
            'Content-Type': 'application/json'
      },
      body: JSON.stringify([_id])
});

        router.refresh();
    }

  async function handleUpdate() {
    const res = await fetch("https://v1.appbackend.io/v1/rows/O70zcH27AlTh", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({"_id":_id,"title":currentTitle,"desc":""}),
    });   
    
    const data = await res.json();
    setOnEdit(false);
    router.refresh();
  }

  return (
    <div className="flex gap-2 p-2 border-2 rounded-lg">
      {onEdit ? (
        <input value={currentTitle} onChange={(e) => setCurrentTitle(e.target.value)} className="border-2 p-2 rounded-lg" />
      ) : (
        <div>{currentTitle}</div>
      )}
      {onEdit ? (
        <button className="text-xs bg-emerald-300 text-emerald-800 p-1 rounded-lg" onClick={handleUpdate}>
          Update
        </button>
      ) : (
        <button className="text-xs bg-yellow-300 text-yellow-800 p-1 rounded-lg" onClick={() => setOnEdit(true)}>
          Edit
        </button>
      )}
      <button className="text-xs bg-rose-300 text-rose-800 p-1 rounded-lg" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
};
