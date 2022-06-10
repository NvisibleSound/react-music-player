import React, { createContext, useEffect, useReducer, useRef } from 'react'
import { initialState, reducer } from './reducers/index'

import Topbar from './Topbar'
// import Sidebar from './Sidebar'
// import Content from './Content'
// import Playbar from './Playbar'


export const StoreContext = createContext(null)

	const Index = () => {
		
		const [state, dispatch] = useReducer(reducer, initialState)

		const audioRef = useRef()

		useEffect(() => {
				if (state.playing) {
				audioRef.current.load()
				audioRef.current.play()
				} else audioRef.current.pause()
		}, [state.playing, state.currentSongId])

		useEffect(() => {
				audioRef.current.volume = state.volume
		}, [state.volume])

		const song = state.media[state.currentSongId]

			return (
					<StoreContext.Provider value={{ state, dispatch }}>
					<div css={CSS}>
							<Topbar />
							{/* <Sidebar />
							<Content />
							<Playbar /> */}
					</div>
					</ StoreContext.Provider>

			)
 	}



export default Index