import Http from '../contracts/http.js'
import DeezerPlaylist from '#services/objects/deezer_playlist'

export default class DeezerApi extends Http {
  public async getPlaylists(accessToken: string) {
    const response = await this.get(`/user/me/playlists?access_token=${accessToken}`, {
      Authorization: `Bearer `
    })
    const payload = await response.json()

    // @ts-ignore
    return DeezerPlaylist.fromArray(payload.data)
  }

  public async deleteAllPlaylists(accessToken: string) {
    const playlists = await this.getPlaylists(accessToken)

    for (const playlist of playlists) {
      const response = await this.delete(`/user/me/playlists?access_token=${accessToken}&playlist_id=${playlist.id}`)
      const payload = await response.json()

      console.log(payload)
    }
  }
}
