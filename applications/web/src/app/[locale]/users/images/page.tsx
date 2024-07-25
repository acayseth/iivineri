'use client'

import { MdDeleteForever } from 'react-icons/md'

export default function Home() {
  const items = new Array(8).fill(
    <div className="group h-full w-full">
      <div className="relative aspect-square h-full w-full rounded-xl shadow-xl transition-all duration-75 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
        <div className="absolute inset-0">
          <img
            className="h-full w-full rounded-xl object-cover shadow-xl shadow-black/40"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmAaODzguLeuOBD9P5DvGUPCx0YWRBuoP4WQ&s"
            alt="vineri"
          />
        </div>
        <div
          className="absolute inset-0 h-full w-full rounded-xl bg-black/80 px-3 text-center text-slate-200 [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <div className="flex min-h-full flex-col items-center justify-center">
            <h2>image.name</h2>
            <button
              className="mt-8 w-full rounded-md bg-red-600 py-2 text-white flex items-center justify-center">
              <MdDeleteForever className="mr-2 h-6 w-6" /> Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
      {items.map((item, index) => (
        <li key={index}>
          {item}
        </li>
      ))}
    </ul>
  )
}

