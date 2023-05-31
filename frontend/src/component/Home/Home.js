import React, { Fragment } from 'react'
import { CgMouse } from "react-icons/cg";
import './Home.css'
function Home() {
    return (
        <Fragment>
            <div className='banner'>
                <p>
                    Welcome to Shopper!
                </p>
                <h1>Find awesome products for all of your needs!</h1>
                <a href="#container">
                    <button>
                        Scroll <CgMouse />
                    </button>
                </a>
            </div>
            <h2 className="homeHeading">Featured Products</h2>

        </Fragment>)

}

export default Home