import styles from './profile.module.css'
import React, { useState, useRef, useContext } from 'react'
import { StoreContext } from './index'
import ProfileModal from './modals/profileModal'
import ProfileToast from './toasts/profileToast'

// profile pic 
// username
// settings


const ProfileIcon = () => {
	const [profileState, setState] = useState({
		modal: false,
		toast: ''
	  })
	
	//   const { state, dispatch } = useContext(StoreContext)
	
	  const profileRef = useRef(null)
	//   const profiles = Object.keys(state.profiles)

	  const editProfile = e => {
		e.preventDefault()
		const list = profileRef.current.value
	
		// dispatch({ type: 'Edit_profile', profile: list })
	
		setState({
		  ...profileState,
		  modal: false,
		  toast: 'profile was created successfully!'
		})
	  }
	
	  const handleModal = () =>
		setState({ ...profileState, modal: !profileState.modal })


			return (
					<div className={styles.profile}>
						<div onClick={handleModal} className={styles.ProfileIcon}>
								<i className="bi bi-person-circle" />
							  
						</div>

						<ProfileModal show={profileState.modal} close={handleModal}>
								<div onClick={editProfile}>
										<div className={styles.editProfile}>
											<div className={styles.notes}>add functions later</div>
											<div>Profile</div>
											<div>Settings</div>
											<div>Log Out</div>
										</div>	
								</div>

							</ProfileModal>
							<ProfileToast
							toast={profileState.toast}
							close={() => setState({ ...profileState, toast: '' })}
							/>
					</div>
       
   
   
  )
}



export default ProfileIcon
