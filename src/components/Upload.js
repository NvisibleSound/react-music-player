import React, {useState} from 'react';
import styles from './upload.module.css'
import { Link } from 'react-router-dom';



const TrackInfoContainer = () => {
	return (
		<div className={styles.TrackInfoContainer}> 
			<div className={styles.trackName}>
				Track Name
			</div>
			<div className={styles.filename}>
				filename
			</div>
			<div className={styles.filesize}>
				file size (5mb)
			</div>


		</div>

	)

}




const Upload = () => {
  return ( 
    	<div className={styles.upload}>
				<form className={styles.uploadForm}>
					<div className={styles.column1}>
						<div className= {styles.albumPhoto}>
							photo
						</div>
						<label>
							<input className={styles.albumName} type="text" value="Album Name" />
						</label>
						<label>
							Release Date:
							<input className={styles.releaseDate} type="text" value="Release Date" />
						</label>
						<label>
							<input className={styles.artist} type="text" value="Artist" />
						</label>								
						<label>
							<input className={styles.aboutThisAlbum} type="text" value="About this album" />
						</label>
						<label>
			
							<input className={styles.albumCredits} type="text" value="Album Credits" />
						</label>
						<label>
						
							<input className={styles.tags} type="text" value="Tags" />
						</label>
						<label>
					
							<input className={styles.albumUPC} type="text" value="Album UPC/EAN code" />
						</label>
						<label>
						
							<input className={styles.catalogNumber} type="text" value="Catalog number" />
						</label>
					</div>
				</form>
				<div className={styles.column2}>
					<table >
						<thead>
							<tr className={styles.uploadMenu}>
								<td><Link style={{color: 'black'}} to="Songs"> SONGS </ Link></td>
								<td><Link style={{color: 'black'}} to="Tags"> TAGS </ Link></td>
								<td><Link style={{color: 'black'}} to="Credits"> CREDITS </ Link></td>
							</tr>
						</thead>
							<div className={styles.trackUploadList}>
								<TrackInfoContainer />
								<TrackInfoContainer />
								<TrackInfoContainer />
								<TrackInfoContainer />
								<TrackInfoContainer />
								<TrackInfoContainer />
							</div>
							<div>
								{/* <input type="file" name="file" >
									<div>
									<i className="bi bi-plus-circle" type="file"  >
								Add Tracks
								</i>
									</div>
								</input> */}
							</div>				
        </table>
									<div className={styles.buttons}>
									<input className={styles.cancel} type="submit" value="Cancel" />
									<input className={styles.submit} type="submit" value="Submit" />
								</div>
							</div>
			</div>
   
  )
}

export default React.memo(Upload);