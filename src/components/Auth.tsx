import { useState } from "react";

interface Props {
  callApi: (key: string) => void;
}

export default function Auth({ callApi }: Props) {
  const [key, setKey] = useState("");

  function submit() {
    console.log("submit");
    callApi(key);
  }

  return (
    <div className="relative border-8 border-neutral-900 p-6 rounded-lg grid gap-8 md:flex-1 md:max-w-lg my-2 md:my-8 lg:my-10 bg-white w-full">
      <h2 id="contact" className="text-3xl font-bold">
        Management
      </h2>
      <div className="relative">
        <input
          value={key}
          onChange={(e) => setKey(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              submit();
            }
          }}
          className="peer w-full p-2 border-4 border-amber-400 rounded-md focus:ring-4 focus:ring-amber-400 focus:border-amber-400 focus:outline-none placeholder-transparent"
        />
        <label
          htmlFor="origin-url"
          className="text-neutral-500 text-sm font-bold absolute -top-4 left-2 -translate-y-1/2 transition-all peer-placeholder-shown:left-4 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-neutral-900 peer-focus:-top-4 peer-focus:left-2 peer-focus:text-neutral-600 "
        >
          Your secret key
        </label>
      </div>
      <div className="flex ">
        <button
          onClick={submit}
          className="mr-3 py-2 px-6 bg-neutral-900 text-white w-max cursor-pointer shadow-xl hover:shadow-none transition-shadow focus:outline-none focus-visible:ring-4 ring-neutral-900 rounded-md ring-offset-4 ring-offset-white dark:ring-offset-amber-400 "
        >
          Send
        </button>
        <button
          type="reset"
          onClick={() => setKey("")}
          className="mr-3 py-2 px-6 text-neutral-900 w-max shadow-lg cursor-pointer hover:shadow-2xl hover:bg-neutral-100 transition-shadow focus:outline-none focus-visible:ring-4 ring-neutral-900 rounded-md ring-offset-4 ring-offset-white dark:ring-offset-amber-400 "
        >
          reset
        </button>
      </div>
    </div>
  );
}
