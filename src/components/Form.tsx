/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from "react";

export default function Form() {
  // States
  const [origin, setOrigin] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  // Effect to handle API call
  useEffect(() => {
    if (isSending) {
      console.log("Calling API...");
      fetch("https://quick-link-puce.vercel.app/short", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ origUrl: origin }),
      })
        .then((res) => {
          if (res.ok) return res.json();
          if (res.status === 400) throw new Error("Invalid Original URL");
          if (res.status === 500) throw new Error("Server Error");
          throw new Error(`Something went wrong: ${res.status}`);
        })
        .then((data) => {
          console.log(data);
          setShortUrl(data.shortUrl);
        })
        .catch((error) => {
          alert(error.message);
        })
        .finally(() => {
          setIsSending(false);
        });
    }
  }, [isSending, origin]);

  // Function to copy the short URL to the clipboard
  const copyToClipboard = () => {
    setIsCopied(true);
    navigator.clipboard.writeText(shortUrl);
    setTimeout(() => setIsCopied(false), 3000);
  };

  return (
    <div className="relative border-8 border-neutral-900 p-6 rounded-lg grid gap-8 md:flex-1 md:max-w-lg my-2 md:my-8 lg:my-10 bg-white w-full">
      <h2 id="contact" className="text-3xl font-bold">
        Create short link
      </h2>
      <div className="relative">
        <input
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              setIsSending(true);
            }
          }}
          placeholder="Origin URL"
          className="peer w-full p-2 border-4 border-amber-400 rounded-md focus:ring-4 focus:ring-amber-400 focus:border-amber-400 focus:outline-none placeholder-transparent"
        />
        <label className="text-neutral-500 text-sm font-bold absolute -top-4 left-2 -translate-y-1/2 transition-all peer-placeholder-shown:left-4 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-neutral-900 peer-focus:-top-4 peer-focus:left-2 peer-focus:text-neutral-600 ">
          Origin URL
        </label>
      </div>
      <div className="relative">
        <input
          disabled
          value={shortUrl}
          placeholder="Short URL"
          className="peer w-full p-2 border-4 font-bold text-neutral-900 text-sm border-amber-400 rounded-md focus:ring-4 focus:ring-amber-400 focus:border-amber-400 focus:outline-none placeholder-transparent"
        />
        <label className="text-neutral-500 text-sm font-bold absolute -top-4 left-2 -translate-y-1/2 transition-all peer-placeholder-shown:left-4 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-neutral-900 peer-focus:-top-4 peer-focus:left-2 peer-focus:text-neutral-600 ">
          Short URL
        </label>
        <button
          onClick={copyToClipboard}
          className="absolute end-2 top-1/2 -translate-y-1/2 text-gray-500 hover:bg-gray-100 rounded-lg p-2 inline-flex items-center justify-center"
        >
          {!isCopied ? (
            <svg
              className="w-3.5 h-3.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 18 20"
            >
              <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z" />
            </svg>
          ) : (
            <svg
              className="w-3.5 h-3.5 text-blue-700 dark:text-blue-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 16 12"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 5.917 5.724 10.5 15 1.5"
              />
            </svg>
          )}
        </button>
      </div>
      <div className="flex ">
        <button
          onClick={() => setIsSending(true)}
          className="mr-3 py-2 px-6 bg-neutral-900 text-white w-max cursor-pointer shadow-xl hover:shadow-none transition-shadow focus:outline-none focus-visible:ring-4 ring-neutral-900 rounded-md ring-offset-4 ring-offset-white dark:ring-offset-amber-400 "
        >
          Send
        </button>
        <button
          type="reset"
          onClick={() => {
            setShortUrl("");
            setOrigin("");
          }}
          className="mr-3 py-2 px-6 text-neutral-900 w-max shadow-lg cursor-pointer hover:shadow-2xl hover:bg-neutral-100 transition-shadow focus:outline-none focus-visible:ring-4 ring-neutral-900 rounded-md ring-offset-4 ring-offset-white dark:ring-offset-amber-400 "
        >
          Reset
        </button>
      </div>
    </div>
  );
}
