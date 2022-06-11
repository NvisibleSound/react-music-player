import React, { onChange, useState, createContext, Component } from 'react';
import styles from './upload.module.css'
import { Link } from 'react-router-dom';

export const FormCtx = createContext({
  fields: {},
  errors: {}
});

// class Form extends Component {
//   state = {
//     fields: {},
//     errors: {}
//   };

// 	setFields = (event, { id }) => {
//     event.persist();

//     console.log("add/update field value!");
//   };

//   render() {
//     const { fields, errors } = this.state;

//     const formCtx = {
//       fields,
//       errors,
//       setFields: this.setFields
//     };

//     return (
//       <form action="">
//         <FormCtx.Provider value={formCtx}>
//           {this.props.children}
//         </FormCtx.Provider>
//       </form>
//     );
//   }
// }


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
	const [AlbumName, setAlbumName] = useState('Album Name');
	const [ReleaseDate, setReleaseDate] = useState('Release Date');
	const [Artist, setArtist] = useState('Artist');
	const [AboutThisAlbum, setAboutThisAlbum] = useState('About This Album');
	const [AlbumCredits, setAlbumCredits] = useState('Album Credits');
	const [Tags, setTags] = useState('Tags');
	const [AlbumUPC, setAlbumUPC] = useState('Album UPC/EAN Code');
	const [CatalogNumber, setCatalogNumber] = useState('Catalog Number');

	const handleSubmit = (e) => {
		e.preventDefault();
		const upload = { 
			Artist, 
			AlbumName, 
			ReleaseDate,
			AboutThisAlbum,
			AlbumCredits,
			Tags,
			AlbumUPC,
			CatalogNumber
		}	

			console.log(upload)
	}

  return ( 
    	<div className={styles.upload}>
				<form className={styles.uploadForm}>
					<div className={styles.column1}>
						<div className= {styles.albumPhoto}>
							photo
						</div>
						{/* <label>Album Name</label> */}
							<input 
								className={styles.albumName} 
								required
								type="text"	
								value= { AlbumName } 
								onChange={(e) => setAlbumName(e.target.value)}
							/>
						{/* <label>	Release Date: </label> */}
							<input 
								className={styles. releaseDate} 
								required
								type="text"	
								value= { ReleaseDate } 
								onChange={(e) => setReleaseDate(e.target.value)}
							/>
						{/* <label> Artist </label> */}
							<input 
								className= {styles.artist} required
								required
								type="text"	
								value= { Artist } 
								onChange={(e) => setArtist(e.target.value)}
							/>														
						{/* <label> About This Album </label> */}
							<input 
								className={styles.aboutThisAlbum} 
								required
								type="text"	
								value= { AboutThisAlbum } 
								onChange={(e) => setAboutThisAlbum(e.target.value)}
							/>
						{/* <label> Album Credits </label> */}
							<input 
								className={styles.albumCredits} 
								required
								type="text"	
								value= { AlbumCredits } 
								onChange={(e) => setAlbumCredits(e.target.value)}
							/>
						{/* <label> Tags </label>						 */}
							<input 
								className={styles.tags} required
								type="text"	
								value= { Tags } 
								onChange={(e) => setTags(e.target.value)}
							/>		
						{/* <label>  Album UPC/EAN code </label> */}
							<input 
								className={styles.albumUPC} 
								required
								type="text"	
								value= { AlbumUPC } 
								onChange={(e) => setAlbumUPC(e.target.value)} />
						{/* <label> Catalog number</label>					 */}
							<input 
								className={styles.catalogNumber} 
								required
								type="text"	
								value= { CatalogNumber } 
								onChange={(e) => setCatalogNumber(e.target.value)} />
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
				<p> {AlbumName} </p>
				<p> {ReleaseDate}</p>
				<p> {Artist}</p>
				<p> {AboutThisAlbum}</p>
				<p> {AlbumCredits}</p>
				<p> {AlbumUPC}</p>
				<p> {CatalogNumber}</p>
        </table>
									<div className={styles.buttons}>
									<input className={styles.cancel} type="submit" value="Cancel" />
									<input className={styles.submit} type="submit" value="Submit" onClick={handleSubmit} 
									/>
								</div>
							</div>
			</div>
   
  )
}

export default React.memo(Upload);