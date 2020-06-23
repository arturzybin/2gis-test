export interface IBook {
   id: string,
   index: number,
   author: string
   title: string
   description: string
   tags: string[]
   moved?: boolean // true equals book in progress or done
}

export type ITab = 'toread' | 'done' | 'inprogress'