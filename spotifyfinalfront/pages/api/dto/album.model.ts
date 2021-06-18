import { Artist } from "./artist.model";

export interface Album {
    id: number;
    title: string;
    year: string; //Todo date format
    cover: string; //Todo voir couverture image
    // songList: Song[];
    artist?: Artist[];
  }
  