import React from 'react'
import { IBook, ITab } from '../types'


interface IProps {
   tab: ITab
   book: IBook
   moveBook: (index: number) => void
   addTag: (tag: string) => void
}

export const Book: React.FC<IProps> = ({ tab, book, moveBook, addTag }) => (
   <div className="book" key={book.id}>
      <h3 className="book__author">{book.author}</h3>
      <div className="book__title-and-button">
         <h2 className="book__title">{book.title}</h2>
         {createMoveBookButton(tab, () => moveBook(book.index))}
      </div>
      <p className="book__description">{book.description}</p>

      {book.tags.map((tag, tagIndex) => (
         <span
            className="book__tag"
            key={tagIndex}
            onClick={() => addTag(tag)}
         >
            #{tag}
         </span>
      ))}
   </div>
)


function createMoveBookButton(tab: ITab, callback: () => void): JSX.Element {
   if (tab === 'toread') {
      return (
         <button
            className="book__move-button"
            onClick={callback}
         >
         <span className="book__move-button-text">start reading</span> →</button>
      )
   }

   if (tab === 'inprogress') {
      return (
         <button
            className="book__move-button"
            onClick={callback}
         >
         <span className="book__move-button-text">finish reading</span> →</button>
      )
   }

   return (
      <button
         className="book__move-button"
         onClick={callback}
      >
      <span className="book__move-button-text">return in "to read"</span> ↵</button>
   )
}