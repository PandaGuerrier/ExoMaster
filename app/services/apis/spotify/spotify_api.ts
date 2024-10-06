import Http from '../contracts/http.js'
import SpotifyPlaylist from '#services/objects/spotify_playlist'
import Song from '#services/objects/song'

export default class SpotifyApi extends Http {
  public async getPlaylists(accessToken: string) {
    const response = await this.get(`/me/playlists?limit=50`, {
      Authorization: `Bearer ${accessToken}`
    })

    const payload = await response.json()
    // @ts-ignore
    return SpotifyPlaylist.fromArray(payload.items)
  }

  public async getTracks(accessToken: string, playlist: SpotifyPlaylist) {
      const pages = Math.ceil(playlist.tracks / 50)
      const tracks = []
    console.log(accessToken)

    console.log(pages)

      for (let i = 0; i < pages; i++) {
        console.log(i)
        const response = await this.get(`/playlists/${playlist.id}/tracks?fields=total&limit=50`, {
          Authorization: `Bearer ${accessToken}`
        })
        const payload = await response.json() as any
        console.log(`Page ${i + 1}`)
        console.log(payload)
        tracks.push(...payload.items)
    }

    return Song.fromArray(tracks)
  }

  public async deleteAllPlaylists(accessToken: string) {
    const playlists = await this.getPlaylists(accessToken)

    for (const playlist of playlists) {
      const tracks = await this.getTracks(accessToken, playlist)
      const body = {
        tracks: tracks.map((track) => {
          return {
            uri: `spotify:track:${track.id}`
          }
        })
      }

      const response = await this.delete(`/playlists/${playlist.id}/tracks`, {
          Authorization: `Bearer ${accessToken}`
        },
        body
      )
      console.log(response.statusText)

      const payload = await response.json()
      console.log(payload)
    }
  }
}


