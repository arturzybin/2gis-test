export interface IBook {
   id: string
   author: string
   title: string
   description: string
   tags: string[]
   moved?: boolean
}

export type ITab = 'toread' | 'done' | 'inprogress'