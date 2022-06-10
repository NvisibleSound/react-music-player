import React, { useEffect } from 'react'
import { css } from '@emotion/react'

const ProfileToast = ({ profileToast, close }) => {
  useEffect(() => {
    if (!ProfileToast) return

    const closeprofileToast = () => {
      setTimeout(() => {
        close()
      }, 2500)
    }

    closeprofileToast()

    return () => clearTimeout(closeprofileToast)
  }, [profileToast])

  if (!profileToast) return null

  return (
    <div className="profileToast" css={CSS}>
      {profileToast}
    </div>
  )
}

const CSS = css`
  -webkit-animation: profileToast 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  animation: profileToast 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  position: absolute;
  top: 0;
  left: calc(50% - 175px);
  background: white;
  color: black;
  width: 350px;
  padding: 25px;
  text-align: center;

  @-webkit-keyframes profileToast {
    0% {
      -webkit-transform: translateY(0);
      transform: translateY(0);
    }
    100% {
      -webkit-transform: translateY(75px);
      transform: translateY(75px);
    }
  }

  @keyframes profileToast {
    0% {
      -webkit-transform: translateY(0px);
      transform: translateY(0px);
    }
    100% {
      -webkit-transform: translateY(75px);
      transform: translateY(75px);
    }
  }
`

export default React.memo(ProfileToast);