/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from "react";
import IUrl from "./IUrl.interface";

interface TableProps {
  list: IUrl[];
}

export default function Table({ list }: TableProps) {
  const [urls, setUrls] = useState(list);
  const [isDel, setIsDel] = useState(false);
  useEffect(() => {
    if (isDel) {
      setIsDel(false);
    }
  }, [isDel]);

  const del = (id: string) => {
    fetch(`https://quick-link-puce.vercel.app/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) return res.json();
        if (res.status === 500) throw new Error("Server Error");
        throw new Error(`Something went wrong: ${res.status}`);
      })
      .then((data) => {
        console.log(data);
        setIsDel(true);
        setUrls(urls.filter((url) => url._id !== id));
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg my-6">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
          <tr>
            <th scope="col" className="px-6 py-3">
              URL
            </th>
            <th scope="col" className="px-6 py-3">
              <div className="flex items-center">
                Date
                <a href="#">
                  <svg
                    className="w-3 h-3 ms-1.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                  </svg>
                </a>
              </div>
            </th>
            <th scope="col" className="px-6 py-3">
              <div className="flex items-center">
                Click
                <a href="#">
                  <svg
                    className="w-3 h-3 ms-1.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                  </svg>
                </a>
              </div>
            </th>
            <th scope="col" className="px-6 py-3">
              <span className="sr-only">Handles</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {urls.map((row) => {
            return (
              <tr key={row._id} className="bg-white">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                >
                  {row.shortUrl}
                </th>
                <td className="px-6 py-4">
                  {JSON.stringify(new Date(row.date)).slice(1, 20)}
                </td>
                <td className="px-6 py-4">{row.clicks}</td>
                <td className="px-6 py-4 text-right cursor-pointer ">
                  <a
                    onClick={() => {
                      del(row._id);
                    }}
                    className="cursor-pointer font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Delete
                  </a>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
