"use client";

import React, { useEffect } from "react";

export default function OlympicTable({ data }: {
    data: [string, string, number, number, number, number, number][];
}) {
  useEffect(() => {
    setTimeout(function() {
      console.log("Reloading page...");
      window.location.reload();
    }, 60000);
  }, []);
  const elemsize = "px-6 py-6"
  return (
    // make font size of everything 20% bigger
    <div className="overflow-x-auto text-2xl">
      <table className="min-w-full table-auto">
        <thead>
          <tr>
            <th className={`${elemsize} min-w-9`}>Logo</th>
            <th className={`${elemsize}`}>Country</th>
            <th className={`${elemsize} text-yellow-500`}>Gold</th>
            <th className={`${elemsize} text-gray-400`}>Silver</th>
            <th className={`${elemsize} text-orange-500`}>Bronze</th>
            <th className={`${elemsize}`}>Total</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td className={`border ${elemsize}`}><img
                src={row[0]}
                alt={`${row[1]} Flag`}
                width={22}
                height={15}
              /></td>
              <td className={`border ${elemsize}`}>{row[1]}</td>
              <td className={`border ${elemsize} text-yellow-500 font-bold`}>{row[3]}</td>
              <td className={`border ${elemsize} text-gray-400 font-bold`}>{row[4]}</td>
              <td className={`border ${elemsize} text-orange-500 font-bold`}>{row[5]}</td>
              <td className={`border ${elemsize} font-bold` }>{row[6]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}