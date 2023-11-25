import { ToDoCard } from "@/components/ToDoCard";
import { ToDoInput } from "@/components/ToDoInput";
import Image from "next/image";

async function getToDo() {
  const res = await fetch("https://v1.appbackend.io/v1/rows/O70zcH27AlTh", {
    cache: "no-store",
  });
  const { data } = await res.json();
  return data;
}

export default async function Page() {
  const items = await getToDo();

  return (
    <body>
      <div className="flex justify-center pt-10">
        <div className="max-w-lg w-full shadow-lg bg-violet-300 p-8 rounded-xl">
          <div className="flex justify-center bg-green-200 rounded-3xl">
            <img
              className="object-cover rounded-full w-16 h-16 m-2"
              src="https://www.imghippo.com/images/1700910258.png"
            />
            <div className="w-full p-3">
              <p className="text-3xl text-grey-600">Todo List</p>
              <p className="text-sm">25 November 2023</p>
            </div>
          </div>
          <div className="flex flex-col items-center m-5">
            <ToDoInput />
            <div className="space-y-3 w-full">
              {items.map(({ _id, title, desc }) => {
                return (
                  <ToDoCard key={_id} _id={_id} title={title} desc={desc} />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </body>
  );
}
