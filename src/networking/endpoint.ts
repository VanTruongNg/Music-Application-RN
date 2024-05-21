const endpoints = {
    auth: {
        token: 'api/token'
    },

    home: {
        getPlaylist: 'v1/browse/categories/$type_id/playlists?country=VN',
        getFeaturedPlaylist: 'v1/browse/featured-playlists?country=VN&locale=sv_SV&limit=50',
        search: 'v1/search?q=$type%3A$keyword&type=$type&limit=10&offset=$offset'
    },

    player: {
        getRecommend: 'v1/recommendations?market=VN&seed_artists=$artists&seed_tracks=$tracks&limit=10',
    },
    artist: {
        topTrack: 'v1/artists/$id/top-tracks?market=VN',
        relatedArtist: 'v1/artists/$id/related-artists',
        artistAlbum: 'v1/artists/$id/albums?include_groups=album%2Csingle&market=VN&limit=$limit&offset=$offset',
        relatedAlbum:
        'v1/artists/$id/albums?include_groups=appears_on&market=VN&limit=10&offset=0',
        getArtist: 'v1/artists/$id',
        getSeveralArtists: 'v1/artists?ids=$ids'
    },
    album: {
        getAlbum: 'v1/albums/$id?market=VN'
    },
    playlists:{
        getPlaylist:'v1/playlists/$id'
    }
}

export {endpoints}