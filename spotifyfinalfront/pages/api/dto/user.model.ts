export interface User {
    id: number;
    mail: string;
    password: string;
    // artist: Artist;
  
    //TODO : Relation : ManyToMany or OneToMany
    //Bibliothèque d'écoute
    // songList: Song[];
    // albumList: Album[];
}