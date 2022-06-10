
import styles from './Library.module.css'

// import { StoreContext } from './index'
// import Modal from './Modal'
// import Toast from './Toast'


const Library = () => {
  return (
    <div className={styles.Library}>
      <div>
        Library
      </div>
        <table>
          <thead>
            <tr>
              <td />
              <td>Title</td>
              <td>Artist</td>
              <td>Length</td>
            </tr>
          </thead>
        </table>
    </div>
  )
}

export default Library
