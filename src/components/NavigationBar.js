import React from 'react';
import styles from './NavigationBar.module.css'

// search bar
// Home / Navigation Collections 
// Library



const Search = () => (
	<div className={styles.NavigationBarSearch}>
		Search
	</div>
);

const Home = () => (
	<div className={styles.home}>
			Home
	</div>
);

const Library = () => (
	<div className={styles.home}>
			Library
	</div>
);


function NavigationBar() {
    return (
			<div className={styles.NavigationBar}>
				<Search />
				<Home />
				<Library />
			</div>
    );
  }
export default NavigationBar
