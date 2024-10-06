import SpotifyApi from '#services/apis/spotify/spotify_api'
import DeezerApi from '#services/apis/deezer/deezer_api'

export default class Services {
  // the service class is to stock service class, and stock it

  private static services: Record<string, any> = {
    'deezer': new DeezerApi('https://api.deezer.com', {
      'Content-Type': 'application/json'
    }),

    'spotify': new SpotifyApi('https://api.spotify.com/v1', {
      'Content-Type': 'application/json'
    })
  }

  public static register<T>(name: string, service: T) {
    this.services[name] = service
  }

  public static resolve<T>(name: string): T {
    return this.services[name]
  }
}
