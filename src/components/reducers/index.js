// import media from '../media.json'

const DEFAULT_profile = 'home'
const DEFAULT_VOLUME = 0.65

export const initialState = {
  // media,
  addToprofileId: '',
  currentprofile: DEFAULT_profile,
  currentSongId: '',
  currentTime: 0,
  duration: 0,
  playing: false,
  profiles: {
    // home: new Set(media.ids),
    // favorites: new Set()
  },
  volume: DEFAULT_VOLUME
}

export const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_profile':
      return {
        ...state,
        profiles: { ...state.profiles, [action.profile]: new Set() }
      }
    case 'ADD_TO_profile':
      return { ...state, addToprofileId: action.songId }
    case 'ABORT_ADD_TO_profile':
      return { ...state, addToprofileId: '' }
    case 'ADD_FAVORITE':
      state.profiles.favorites.add(action.songId)
      return { ...state }
    case 'PLAY':
      return {
        ...state,
        playing: true,
        currentSongId: action.songId || state.currentSongId
      }
    case 'PAUSE':
      return { ...state, playing: false }
    case 'REMOVE_FAVORITE':
      state.profiles.favorites.delete(action.songId)
      return { ...state }
    case 'SAVE_TO_profile':
      state.profiles[action.profile].add(state.addToprofileId)
      return { ...state, addToprofileId: '' }
    case 'SET_CURRENT_TIME':
      return { ...state, currentTime: action.time }
    case 'SET_DURATION':
      return { ...state, duration: action.duration }
    case 'SET_profile':
      return { ...state, currentprofile: action.profile }
    case 'SET_VOLUME':
      return { ...state, volume: parseFloat(action.volume) }
  }

  return state
}