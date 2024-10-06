export default class Song {
  public id: string
  public name: string

  constructor(id: string, name: string) {
    this.id = id
    this.name = name
  }

  public static fromArray(array: any[]) {
    return array.map((item) => {
      return new Song(
        item.id,
        item.name,
      )
    })
  }
}
