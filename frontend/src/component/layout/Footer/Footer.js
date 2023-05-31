import React from 'react'
import playstore from '../../../images/playstore.png'
import appstore from '../../../images/appstore.png'
import './Footer.css'
const Footer = () => {
    return (
        <footer id="footer">
            <div className="leftFooter">
                <h4>DOWNLOAD OUR APP</h4>
                <p>Download App for Android and IOS mobile phone</p>
                <img src={playstore} alt="playstore" />
                <img src={appstore} alt="Appstore" />
            </div>

            <div className="midFooter">
                <h1>SHOPPER.</h1>
                <p>Your One Stop Destination</p>

                <p>Copyrights 2023 &copy; Adit Kaushal adit26data</p>
            </div>

            <div className="rightFooter">
                <h4>Follow Us</h4>
                <a href="http://instagram.com/meabhisingh">Instagram</a>
                <a href="http://youtube.com/6packprogramemr">Youtube</a>
                <a href="http://instagram.com/meabhisingh">Facebook</a>
            </div>
        </footer>

    )

}

export default Footer