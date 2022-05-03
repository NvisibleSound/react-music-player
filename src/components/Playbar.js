
import React from 'react'
import AudioPlayer from 'react-h5-audio-player'
import 'react-h5-audio-player/lib/styles.css';
import '../App.module.css';
import styles from './Playbar.module.css'

// progress bar, 
// track info box, 
// backward, play, forward, 
// volume slider




const Playbar = () => (
    <div className={styles.Playbar}> 
      <AudioPlayer 
          layout="Stacked"
          className={styles.AudioPlayer}
          src="http://64.227.99.194:8000/ether"
      />
    </div>

  )
  
  export default React.memo(Playbar);