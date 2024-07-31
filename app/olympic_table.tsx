"use client";

import React from "react";

setTimeout(function() {
  console.log("Reloading page...");
  window.location.reload();
}, 60000);

export default function OlympicTable({ data }: {
    data: [string, string, number, number, number, number, number][];
}) {
  return (
    <div className="overflow-x-auto">
    <table className="w-full table-auto">
      <thead>
        <tr>
          <th className="px-2 py-2 min-w-9"></th>
          <th className="px-2 py-2">Country</th>
          <th className="px-2 py-2 text-yellow-500">Gold</th>
          <th className="px-2 py-2 text-gray-400">Silver</th>
          <th className="px-2 py-2 text-orange-500">Bronze</th>
          <th className="px-2 py-2">Total</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
            <tr key={index}>
                <td className="border px-2 py-2"><img
                    src={row[0]}
                    alt={`${row[1]} Flag`}
                    width={22}
                    height={15}
                /></td>
                <td className="border px-2 py-2">{row[1]}</td>
                <td className="border px-2 py-2 text-yellow-500">{row[3]}</td>
                <td className="border px-2 py-2 text-gray-400" >{row[4]}</td>
                <td className="border px-2 py-2 text-orange-500">{row[5]}</td>
                <td className="border px-2 py-2">{row[6]}</td>
            </tr>

        ))}
      </tbody>
    </table>
  </div>
  );
}