import React from 'react';
import styles from './Ether.module.css'
import MyMap from './MyMap'


const Ether = () => {
  return ( 
    <div className={styles.Ether}>
      <div className={styles.MyMap}>
        <MyMap />
      </div>
      <ul className={styles.locations}>
        <div className={styles.title}>
         Locations
        </div>
        <li className={styles.list}>
          <div>
            Portland, OR
          </div>
          <div>
            Seattle, Wa
          </div>
          <div>
            Chicago, IL
          </div>
        </li>
        <div className={styles.title}>
         Saved
        </div>
        <li className={styles.list}>
          <div>
            Waltham, Ma
          </div>
          <div>
            Bedford, NH
          </div>
          <div>
            Queens, NY
          </div>
        </li>
      </ul>
      
    </div>
   
  )
}

export default React.memo(Ether);