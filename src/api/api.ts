import { Track } from "./type";
import { Album } from "../pages/home/albums/albums";

const clientId = "c39d7345";
const clientSecret = "7ea7bd4a6d0feab592e6525c8cf5b8d6";

const enum BaseRequest {
  ArtistTrack = "https://api.jamendo.com/v3.0/artists/tracks",
  MusicInfo = "https://api.jamendo.com/v3.0/artists/musicinfo",
  ArtistAlbums = "https://api.jamendo.com/v3.0/artists/albums",
  ArtistLocation = "https://api.jamendo.com/v3.0/artists/locations",
  Playlist = "https://api.jamendo.com/v3.0/playlists",
  Albums = "https://api.jamendo.com/v3.0/albums",
  Tracks = "https://api.jamendo.com/v3.0/tracks",
}

export let storeTracks = {
  limit: "10",
  artistName: "",
  artistId: "",
  artistImage: "",
  tracks: [
    { audio: "", audiodownload: "", duration: "", name: "", image: "", id: 0 },
  ],
  description: "",
  tags: [],
  audio: "",
  trackId: 0,
  trackName: "",
};

export let storeAlbums = {
  albumId: "",
  albumName: "",
  albumImage: "",
  albums: [{ id: "", image: "", name: "", releasedate: "" }],
  artistNameAlbum: "",
};

// опции для сортировки треков
enum sortOrder {
  byName = "name",
  byPopularityTotal = "popularity_total",
  byPopularityMonth = "popularity_month",
  byPopularityWeek = "popularity_week",
  byTrackName = "track_name",
  byTrackReleaseDate = "track_releasedate",
  byAlbumName = "album_name",
  byAlbumReleaseDate = "album_releasedate",
}
type sortOrderStrings = keyof typeof sortOrder;

// выбор страны
enum allLocation {
  belarus = "BLR",
  russia = "RUS",
  ukraine = "UKR",
  poland = "POL",
  germany = "DEU",
  usa = "USA",
  italy = "ITA",
  france = "FRA",
}
type allLocationStrings = keyof typeof allLocation;

export const allGenres = [
  "pop",
  "rock",
  "electronic",
  "hiphop",
  "jazz",
  "indie",
  "punk",
  "metal",
  "chillout",
  "house",
  "classical",
  "blues",
];

export const allMood = ["Angry", "Bright", "Dark", "Funky", "Horror", "Happy", "Inspiration", "Romantic", "Sad", "Dramatic", "Calm"];

export const allTheme = ["Music for Vlog", "Music for Film", "Cinematic Music", "Music for Podcast", "Background Music"];

//получать описание и тэги
export const getMusicInfo = async () => {
  const response = await fetch(
    `${BaseRequest.MusicInfo}/?client_id=${clientId}&format=jsonpretty&limit=${storeTracks.limit}&name=${storeTracks.artistName}`
  );
  const data = await response.json();
  const {
    results: [
      {
        musicinfo: { description, tags },
      },
    ],
  } = data;

  storeTracks = {
    ...storeTracks,
    description,
    tags,
  };
  return await data;
};

// получать трек конкретного исполнителя
export const getArtistTracks = async (order: sortOrderStrings) => {
  const response = await fetch(
    `${BaseRequest.ArtistTrack}/?client_id=${clientId}&format=jsonpretty&limit=${storeTracks.limit}&name=${storeTracks.artistName}&order=${sortOrder[order]}`
  );
  const data = await response.json();
  const {
    results: [
      {
        // name: artistName,
        // id: artistId,
        image: artistImage,
        tracks,
      },
    ],
  } = data;

  const track = tracks.map((track: Track) => track);

  // const [
  //   {
  //   audio,
  //   audiodownload,
  //   duration,
  //   name: trackName,
  //   image: trackImage,
  //   id: trackId
  //   },
  // ] = track;

  storeTracks = {
    ...storeTracks,
    artistImage,
    tracks: track,
  };
  return await data;
};

// получать альбом конкретного исполнителя
export const getArtistAlbums = async (order: sortOrderStrings) => {
  const response = await fetch(
    `${BaseRequest.ArtistAlbums}/?client_id=${clientId}&format=jsonpretty&name=${storeTracks.artistName}&order=${sortOrder[order]}`
  );
  const data = await response.json();
  const {
    results: [
      {
        id: albumId,
        // name: albumName,
        image: albumImage,
        albums,
      },
    ],
  } = data;

  const album = albums.map((album: Album) => album);

  storeAlbums = {
    ...storeAlbums,
    albumId,
    // albumName,
    albumImage,
    albums: album,
  };
  return await data;
};

// получать исполнителей по локации
export const getArtistLocation = async (
  country: allLocationStrings,
  limit: number
) => {
  const response = await fetch(
    `${BaseRequest.ArtistLocation}/?client_id=${clientId}&format=jsonpretty&limit=${limit}&haslocation=true&location_country=${allLocation[country]}`
  );
  const data = await response.json();
  const {
    results: [{ name: artistName, image }],
  } = data;
  // console.log(data);
  return await data;
};

// получать плейлист по названию
export const getPlaylist = async (name: string) => {
  const response = await fetch(
    `${BaseRequest.Playlist}/?client_id=${clientId}&format=jsonpretty&namesearch=${name}&datebetween=2021-01-01_2023-02-01`
  );
  const data = await response.json();
  const {
    results: [{ name: playlistName, shareurl, zip }],
  } = data;
  return await data;
};

// получать альбомы по названию
export const getAlbums = async () => {
  const response = await fetch(
    `${BaseRequest.Albums}/?client_id=${clientId}&format=jsonpretty&name=${storeAlbums.albumName}`
  );
  const data = await response.json();
  const {
    results: [
      {
        // name: albumName,
        image: albumImage,
        releasedate,
        zip,
      },
    ],
  } = data;

  storeAlbums = {
    ...storeAlbums,
    // albumName,
    albumImage,
  };
};

export let storeTrackCategorie = {
  tracks: [{ artist_name: "", image: "", name: "", releasedate: "", id: "", audiodownload: ""}],
};

// получать треки по тэгам
export const getTracksByTag = async (tag: string[], limit: number) => {
  const response = await fetch(
    `${BaseRequest.Tracks}/?client_id=${clientId}&format=jsonpretty&limit=${limit}&tags=${tag}`
  );
  const data = await response.json();

  const {
    results: [{ artist_name, name, image, releasedate, id, audiodownload }],
  } = data;

  let track = data.results.map((track: Track) => track);

  storeTrackCategorie = {
    ...storeTrackCategorie,
    tracks: track,
  };
  return await data;
};

// получать треки
export const getTracks = async (id: number[]) => {
  const response = await fetch(
    `${BaseRequest.Tracks}/?client_id=${clientId}&format=jsonpretty&id=${id}`
  );
  const data = await response.json();
  const {
    results: [{ audio }],
  } = data;

  storeTracks = {
    ...storeTracks,
    audio,
  };

  console.log("getTracks", data);
  return await data;
};
