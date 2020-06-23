import React from 'react'

interface IProps {
   tags: string[]
   removeTag: (index: number) => void
   clearTags: () => void
}

export const Filter: React.FC<IProps> = ({ tags, removeTag, clearTags }) => {
   if (!tags.length) return null

   const tagsJSX = tags.map((tag, index) => (
      <span className="filter__tag" onClick={() => removeTag(index)} key={index}>
         {tag}
      </span>)
   )

   return (
      <div className="filter">
         <span>Filtered by tags: </span>
         {tagsJSX}
         <button className="filter__clear" onClick={clearTags}>(clear)</button>
      </div>
   )
}