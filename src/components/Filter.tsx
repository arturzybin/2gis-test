import React from 'react'

interface IProps {
   tags: Set<string>
   removeTag: (tag: string) => void
   clearTags: () => void
}

export const Filter: React.FC<IProps> = ({ tags, removeTag, clearTags }) => {
   if (!tags.size) return null

   const tagsJSX = Array.from(tags).map((tag) => (
      <span className="filter__tag" onClick={() => removeTag(tag)} key={tag}>
         #{tag}
      </span>)
   )

   return (
      <div className="filter">
         <span>Filtered by tags: </span>
         {tagsJSX}
         (<button className="filter__clear" onClick={clearTags}>clear</button>)
      </div>
   )
}