import { PlayFromState, TrackDataFields } from "src/models/Track";

export interface PlayerProps {
    from: PlayFromState
    info: TrackDataFields
}

export interface ChangeTrackProps {
    option: 'next' | 'previous'
    callback: (TrackInfo: TrackDataFields | string) => void
}