import Profile from './Profile'
import Upload from './Upload'
import styles from './topbar.module.css'
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';


const AppName = () => (
	<div className={styles.appName}>
		layout
	</div>
);

const Description = () => (
	<div className={styles.description}>
			functionless layout with routing, modal, and css implementation
	</div>
);

function Topbar() {
    return (
			<div className={styles.topbar}>
				<AppName />
				<Description />
				<div className={styles.upload}>
        			<i className="bi bi-plus-circle" />
					<Link to="Upload"> Upload </ Link>
          			
       			 </div>
				<Profile className={styles.profile} />
			</div>
    );
  }

export default Topbar
