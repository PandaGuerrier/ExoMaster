export default class SpotifyPlaylist {
  public id: string
  public name: string
  public description: string
  public tracks: number
  public public: boolean
  public collaborative: boolean
  public owner: {
    id: string
    name: string
    type: string
  }
  public images: {
    url: string
    width: number
    height: number
  }[]
  public type: string

  constructor(data: any) {
    this.id = data.id
    this.name = data.name
    this.description = data.description
    this.tracks = data.tracks.total
    this.public = data.public
    this.collaborative = data.collaborative
    this.owner = data.owner
    this.images = data.images
    this.type = data.type
  }

  public static fromArray(data: any[]) {
    return data.map((item) => new SpotifyPlaylist(item))
  }
}
