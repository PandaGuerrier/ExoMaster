
export default class DeezerPlaylist {
  public id: number
  public title: string
  public duration: number
  public public: boolean
  public nb_tracks: number
  public fans: number
  public link: string
  public picture: string
  public picture_small: string
  public creation_date: string
  ///public tracks: Song[]  = []
  public creator: {
    id: number
    name: string
    tracklist: string
    type: string
  }
  public type: string

  constructor(data: any) {
    this.id = data.id
    this.title = data.title
    this.duration = data.duration
    this.public = data.public
    this.nb_tracks = data.nb_tracks
    this.fans = data.fans
    this.link = data.link
    this.picture = data.picture
    this.picture_small = data.picture_small
    this.creation_date = data.creation_date
    this.creator = data.creator
    this.type = data.type
  }

  public static fromArray(data: any[]) {
    return data.map((item) => new DeezerPlaylist(item))
  }
}
