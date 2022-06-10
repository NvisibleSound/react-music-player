import React, { useState, useRef, useContext } from 'react'
import { css, jsx } from '@emotion/react'
// import { StoreContext } from './MusicPlayer'
import Modal from './modals/modal'
import Toast from './toasts/toast'
// import { StylesProvider } from '@material-ui/core'
import styles from './Sidebar.module.css'
import { useNavigate, Link, BrowserRouter as Router } from 'react-router-dom';


const Sidebar = () => {


  const [sidebarState, setState] = useState({
    modal: false,
    toast: ''
  })

  const playlistRef = useRef(null)
  const addPlaylist = e => {
    e.preventDefault()
    const list = playlistRef.current.value
    setState({
      ...sidebarState,
      modal: false,
      toast: 'Playlist was created successfully!'
    })
  }

  const handleModal = () =>
    setState({ ...sidebarState, modal: !sidebarState.modal })

 
    
  return (
 





    <ul className={styles.sidebar}>
      <ul className={styles.home}>
        <div className={styles.title}>Home
          </div>
            <div className={styles.menuItems}>         
              <Link to="Ether"> Ether </ Link>
              <Link to="Mountpoints"> Mountpoints </ Link>
              <Link to="Library"> Library </ Link>
              <Link to="Venues"> Venues </ Link>
          </div>
          
      </ul>
      
      
      <ul className={styles.library}>
          <div className={styles.title}>Library</div>

      {/* {playlists.map(list => ( */}
          <div onClick={() => alert('Playlist route')}>
            Playlist 1
          </div>

          <div onClick={() => alert('Playlist route')}>
            Playlist 2
          </div>

          <div onClick={() => alert('Playlist route')}>
            Playlist 3
          </div>

          <div onClick={() => alert('Playlist route')}>
            Playlist 4
          </div>

        <div className={styles.newPlaylist} onClick={handleModal}>
         <i className="bi bi-plus-circle" />
          <span className={styles.span}>New Playlist</span>
        </div>

        <Modal show={sidebarState.modal} close={handleModal}>
          <form onSubmit={addPlaylist}>
            <div className={styles.ContentWrap}>
              <div>New Playlist</div>
                <input
                  type="text"
                  placeholder="My Playlist"
                  ref={playlistRef}
                  required
                />
                <button type="submit">Create</button>
              </div>
          </form>
        
        </Modal>

        <Toast
          toast={sidebarState.toast}
          close={() => setState({ ...sidebarState, toast: 'Playlist Created!' })}
        />
        
      </ ul>
    </ul>

   
  )
}



export default React.memo(Sidebar);