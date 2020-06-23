import React from 'react';

import 'normalize.css'
import './styles/style.scss'

import { IBook, ITab } from './types';
import { Navbar } from './components/Navbar';
import { Filter } from './components/Filter';


interface IState {
   allBooks: IBook[],
   booksInProgressIds: number[],
   booksDoneIds: number[],
   currentTab: ITab,
   tags: string[]
}

class App extends React.Component<{}, IState> {
   state: IState = {
      allBooks: [],
      booksInProgressIds: [],
      booksDoneIds: [],
      currentTab: 'toread' as ITab,
      tags: []
   }


   componentDidMount() {
      fetch('./data/30000-items.json')
         .then(response => response.json())
         .then(data => this.setState({ allBooks: data.items }))

      const newUrl = new URL(window.location.href)
      newUrl.search = ''
      const urlParams = new URLSearchParams(window.location.search);

      const tab = urlParams.get('tab');
      if (tab === 'toread' || tab === 'inprogress' || tab === 'done') {
         newUrl.searchParams.set('tab', tab)
         this.setState({ currentTab: tab })
      }

      const tags = urlParams.get('tags')
      if (tags) {
         newUrl.searchParams.set('tags', tags)
         this.setState({ tags: tags.split(',') })
      }

      window.history.pushState('', '', newUrl.toString())
   }


   changeTab = (tab: ITab) => {
      this.setState({ currentTab: tab })
      
      const newUrl = new URL(window.location.href)
      newUrl.searchParams.set('tab', tab)
      window.history.pushState('', '', newUrl.toString())
   }

   removeTag = (index: number) => {
      let tags = [...this.state.tags]
      tags = [...tags.slice(0, index), ...tags.slice(index + 1)]
      this.setState({ tags })

      const newUrl = new URL(window.location.href)
      newUrl.searchParams.set('tags', tags.join(','))
      window.history.pushState('', '', newUrl.toString())
   }

   clearTags = () => {
      this.setState({ tags: [] })

      const newUrl = new URL(window.location.href)
      newUrl.searchParams.delete('tags')
      window.history.pushState('', '', newUrl.toString())
   }


   render() {
      const { currentTab, allBooks, booksInProgressIds, booksDoneIds, tags } = this.state

      const toReadCount = allBooks.filter((book) => !book.moved).length
      const inProgressCount = booksInProgressIds.length
      const doneCount = booksDoneIds.length

      return (
         <div className="app">
            <Navbar currentTab={currentTab} changeTab={this.changeTab} toRead={toReadCount} inProgress={inProgressCount} done={doneCount} />
            <Filter tags={tags} removeTag={this.removeTag} clearTags={this.clearTags} />
         </div>
      )
   }
}

export default App;
