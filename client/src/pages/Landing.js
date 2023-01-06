import React from 'react'
import main from '../assets/images/main.svg'
import Wrapper from '../assets/wrappers/LandingPage'
import {Logo} from '../components'
import { Link } from 'react-router-dom'

const Landing = () => {
  return (
    <Wrapper>
        <nav>
           <Logo />
        </nav>
        <div className='container page'>
            <div className='info'>
                <h1>Job <span>tracking</span> app</h1>
                <p>Deserunt magna magna enim ipsum qui occaecat ea do incididunt quis adipisicing irure est. Dolor voluptate eiusmod voluptate sunt incididunt culpa cillum ut. Dolor voluptate ullamco aliquip ea consectetur irure tempor dolore.</p>
                <Link to="/register" className='btn btn-hero'>Login/Register</Link>
            </div>
            <img src={main} alt="job hunt" className='img main-img' />
        </div>
    </Wrapper>
  )
}


export default Landing