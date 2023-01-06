import React from 'react'
import {Link} from 'react-router-dom'
import Wrapper from '../assets/wrappers/ErrorPage'
import img from '../assets/images/not-found.svg'

const Error = () => {
  return (
    <Wrapper className='full-page'>
      <div>
        <img src={img} alt="not found" />
        <p>Ohh! Page not found that you are looking for</p>
        <Link to="/">back home</Link>
      </div>
    </Wrapper>
  )
}

export default Error