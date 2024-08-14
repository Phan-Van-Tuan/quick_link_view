import React, { useState } from "react";
import Form from "./Form";
import Auth from "./Auth";
import Table from "./TableManagrment";
import IUrl from "./IUrl.interface";

const Home: React.FC = () => {
  const [list, setList] = useState<IUrl[]>([]);
  // include component into container
  const [component, setComponent] = useState("home");

  function redirectComponent(component: string) {
    setComponent(component);
  }

  function callData(key: string) {
    console.log("Calling API...");
    fetch("https://quick-link-puce.vercel.app/all", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ secretKey: key }),
    })
      .then((res) => {
        if (res.ok) return res.json();
        if (res.status === 400) throw new Error("Your secret key is wrong!!");
        if (res.status === 500) throw new Error("Server Error");
        throw new Error(`Something went wrong: ${res.status}`);
      })
      .then((data) => {
        setList(data);
        redirectComponent("table");
      })
      .catch((error) => {
        alert(error.message);
      })
      .finally(() => {});
  }

  return (
    <div className="container">
      {
        {
          home: <Form />,
          management: <Auth callApi={callData} />,
          table: <Table list={list} />,
        }[component]
      }

      <div className="flex justify-between my-6">
        <button
          onClick={() => redirectComponent("home")}
          className="w-full mr-2 font-bold flex items-center appearance-none bg-[#fcfcfd] rounded-md border-0 shadow-[rgba(45,35,66,0.4)_0px_2px_4px,rgba(45,35,66,0.3)_0px_7px_13px_-3px,#d6d6e7_0_-3px_0_inset] box-border text-[#36395a] cursor-pointer font-mono h-12 justify-center leading-none list-none overflow-hidden px-4 relative text-left no-underline transition-shadow transition-transform select-none touch-manipulation whitespace-nowrap will-change-[box-shadow,transform] text-lg focus:shadow-[#d6d6e7_0px_0px_0px_1.5px_inset,rgba(45,35,66,0.4)_0px_2px_4px,rgba(45,35,66,0.3)_0px_7px_13px_-3px,#d6d6e7_0px_-3px_0px_inset] hover:shadow-[rgba(45,35,66,0.4)_0px_4px_8px,rgba(45,35,66,0.3)_0px_7px_13px_-3px,#d6d6e7_0px_-3px_0px_inset] hover:-translate-y-0.5 active:shadow-[#d6d6e7_0px_3px_7px_inset] active:translate-y-0.5"
        >
          Home
        </button>
        <button
          onClick={() => redirectComponent("management")}
          className="w-full ml-2 font-bold flex items-center appearance-none bg-[#fcfcfd] rounded-md border-0 shadow-[rgba(45,35,66,0.4)_0px_2px_4px,rgba(45,35,66,0.3)_0px_7px_13px_-3px,#d6d6e7_0_-3px_0_inset] box-border text-[#36395a] cursor-pointer font-mono h-12 justify-center leading-none list-none overflow-hidden px-4 relative text-left no-underline transition-shadow transition-transform select-none touch-manipulation whitespace-nowrap will-change-[box-shadow,transform] text-lg focus:shadow-[#d6d6e7_0px_0px_0px_1.5px_inset,rgba(45,35,66,0.4)_0px_2px_4px,rgba(45,35,66,0.3)_0px_7px_13px_-3px,#d6d6e7_0px_-3px_0px_inset] hover:shadow-[rgba(45,35,66,0.4)_0px_4px_8px,rgba(45,35,66,0.3)_0px_7px_13px_-3px,#d6d6e7_0px_-3px_0px_inset] hover:-translate-y-0.5 active:shadow-[#d6d6e7_0px_3px_7px_inset] active:translate-y-0.5"
        >
          Management
        </button>
      </div>
    </div>
  );
};
export default Home;
