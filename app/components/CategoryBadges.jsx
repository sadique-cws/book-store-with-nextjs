import Link from 'next/link'
import React from 'react'

const CategoryBadges = ({data}) => {
  return (
    <div className="flex flex-1 gap-3">
        {data.map((cat, i) => <Link key={i} href={`/category/${cat._id}`} className="bg-white border border-slate-400 px-3 py-1 text-md hover:bg-slate-300 rounded-full capitalize">{cat.catTitle}</Link>)}
  </div>
  )
}

export default CategoryBadges