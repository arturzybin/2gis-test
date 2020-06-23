import React from 'react'
import { IBook, ITab } from '../types'


interface IProps {
   tab: ITab,
   books: IBook[],
   tags: string[],
   addTag: (tag: string) => void
   moveBook: (index: number) => void
   booksInProgressIds: Set<number>,
   booksDoneIds: Set<number>,
}

interface IState {
   countToDisplay: number
}


export class Books extends React.Component<IProps, IState> {
   booksRef = React.createRef<HTMLDivElement>()
   filteredBooksCount = 0

   state = {
      countToDisplay: 50
   }


   componentDidMount() {
      window.onscroll = () => {
         const books = this.booksRef.current as unknown as HTMLElement

         if (books) {
            const toBooksBottom = books.getBoundingClientRect().bottom - document.documentElement.clientHeight
            if (toBooksBottom < 200 && this.filteredBooksCount > this.state.countToDisplay) {
               this.setState({ countToDisplay: this.state.countToDisplay + 50 })
            }
         }
      }
   }

   componentWillUnmount() {
      window.onscroll = null
   }

   render() {
      const { tab, books, tags, addTag, moveBook, booksInProgressIds, booksDoneIds } = this.props

      const filteredBooks = filterBooks(books, tags, tab, booksInProgressIds, booksDoneIds)
      this.filteredBooksCount = filteredBooks.length

      const booksJSX = filteredBooks
         .slice(0, this.state.countToDisplay)
         .map((book) => (
            <div className="book" key={book.id}>
               <h3 className="book__author">{book.author}</h3>
               <h2 className="book__title">{book.title}</h2>
               <p className="book__description">{book.description}</p>
               {createMoveBookButton(tab, () => moveBook(book.index))}

               <div className="book__tags">
                  {book.tags.map((tag, tagIndex) => (
                     <span
                        className="book__tag"
                        key={tagIndex}
                        onClick={() => addTag(tag)}
                     >
                        {tag}
                     </span>
                  ))}
               </div>
            </div>
         ))

      return (
         <div className="books" ref={this.booksRef}>
            {booksJSX.length ? booksJSX : <div className="list-empty">List is empty</div>}
         </div>
      )
   }
}


function filterBooks(books: IBook[], tags: string[], tab: ITab, progressIds: Set<number>, doneIds: Set<number>): IBook[] {
   return books.filter((book, index) => (
      (
         (tab === 'toread' && !book.moved)
         || (tab === 'inprogress' && progressIds.has(index))
         || (tab === 'done' && doneIds.has(index))
      )
      &&
      (!tags.length || tags.every((tag) => book.tags.includes(tag)))
   ))
}


function createMoveBookButton(tab: ITab, callback: () => void): JSX.Element {
   if (tab === 'toread') {
      return (
         <button
            className="book__move-button"
            onClick={callback}
         >start reading →</button>
      )
   }

   if (tab === 'inprogress') {
      return (
         <button
            className="book__move-button"
            onClick={callback}
         >finish reading →</button>
      )
   }

   return (
      <button
         className="book__move-button"
         onClick={callback}
      >return in "to read" ↵</button>
   )
}