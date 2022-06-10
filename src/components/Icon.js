/** @jsx jsx */
import { css, jsx } from '@emotion/react'

const Icon = ({ name }) => {
  return <i className={`fa fa-${name}`} />
}

export default Icon
