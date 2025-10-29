import React from 'react'
import Image from 'next/image';
interface Column<T> {
    key: keyof T;
    label: string;
}


interface TableProps<T> {
    columns: Column<T>[];
    data: T[]
}

export default function Table<T>({columns,data}: TableProps<T>) {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
      <table className="min-w-full border-collapse">
        <thead className="bg-gray-100   text-gray-700">
          <tr>
            {columns.map((col) => (
              <th key={String(col.key)} className="px-4 py-2 text-left font-medium">
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((row, i) => (
              <tr key={i} className="border-t hover:bg-gray-50">
                {columns.map((col) => (

                  
                  <td key={String(col.key)} className="px-4 py-2">
                      { col.key === "imageUrl" ? (
                        row[col.key] ?(
                                <Image 
                                src={`/uploads/${String(row[col.key])}`}
                                alt="Images"
                                width={100}
                                height={100} 
                                className="rounded-md object-cover opacity-70"
                                />

                        ):
                        (
                                <Image
                                 src="/globe.svg"
                                 alt='no Image'
                                 height={100}
                                 width={100}
                                 className="rounded-md object-cover"
                                 />
                        )

                      ):
                      (
                        String(row[col.key])
                      )}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="px-4 py-3 text-center text-gray-400">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
    
  )
}
