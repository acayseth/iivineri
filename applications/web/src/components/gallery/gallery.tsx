'use client'

const Gallary = () => {
  const items = new Array(8).fill(
    <img
      className='h-full w-full aspect-square bg-gray-700 rounded-lg object-cover'
      src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmAaODzguLeuOBD9P5DvGUPCx0YWRBuoP4WQ&s'
      alt='vineri'
    />,
  )

  return (
    <ul className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3'>
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  )
}

export { Gallary }
