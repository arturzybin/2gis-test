import React from 'react'
import { ITab } from '../types'

interface IProps {
   currentTab: ITab,
   changeTab: (tab: ITab) => void
   toRead: number
   inProgress: number
   done: number
}

export const Navbar: React.FC<IProps> = ({ currentTab, changeTab, toRead, inProgress, done }) => {
   const toReadClassName = 'navbar__item' + (currentTab === 'toread' ? ' navbar__item_active' : '')
   const inProgressClassName = 'navbar__item' + (currentTab === 'inprogress' ? ' navbar__item_active' : '')
   const doneClassName = 'navbar__item' + (currentTab === 'done' ? ' navbar__item_active' : '')

   return (
      <nav className="navbar">
         <div
            className={toReadClassName}
            onClick={() => changeTab('toread')}
         >
            To read <span className="navbar__count">({toRead})</span>
         </div>

         <div
            className={inProgressClassName}
            onClick={() => changeTab('inprogress')}
         >
            In progress <span className="navbar__count">({inProgress})</span>
         </div>

         <div
            className={doneClassName}
            onClick={() => changeTab('done')}
         >
            Done <span className="navbar__count">({done})</span>
         </div>
      </nav>
   )
}