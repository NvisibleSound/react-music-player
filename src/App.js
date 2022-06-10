import styles from './App.module.css'
import Topbar from './components/Topbar'
import Sidebar from './components/Sidebar'
import Playbar from './components/Playbar'
import Upload from './components/Upload'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Library from './components/Library'
import Ether from './components/Ether'
// import MyMap from './components/MyMap'
// import AudioInput from './components/AudioInput'
import Mountpoints from './components/Mountpoints'
import Playlists from './components/Playlists'

function App() {
  return (
    <div className={styles.App}>
      <Router>
        <Topbar className={styles.Topbar}/>
        <div></div>
        <Sidebar className={styles.Sidebar}/>
          <div className={styles.Content}>
            <Routes>
              <Route exact path="Library" element={<Library />} />
              <Route exact path="Ether" element={<Ether />} />
              {/* <Route exact path="AudioInput" element={<AudioInput />}  /> */}
              <Route exact path="Mountpoints" element={<Mountpoints/>}/>
              {/* <Route exact path="Playlists" elements={<Playlists/>} /> */}
              <Route exact path="Upload" element={<Upload/>} />
            </Routes>
          </div>
        <Playbar className={styles.Playbar}/>
      </Router>
    </div>
  );
}

export default App;
