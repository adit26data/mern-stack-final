import React from "react";
import "./AboutSection.css";
import { Button, Typography, Avatar } from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
const About = () => {
    const visitInstagram = () => {
        window.location = "https://instagram.com/adit26star";
    };
    return (
        <div className="aboutSection">
            <div></div>
            <div className="aboutSectionGradient"></div>
            <div className="aboutSectionContainer">
                <Typography component="h1">About Us</Typography>

                <div>
                    <div>
                        <Avatar
                            style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
                            src="https://res.cloudinary.com/tripleayt/image/upload/v1631555947/products/jpyibarlaxawvcvqjv5b.png"
                            alt="Founder"
                        />
                        <Typography>Adit Kaushal</Typography>
                        <Button onClick={visitInstagram} color="primary">
                            Visit Instagram
                        </Button>
                        <span>
                            This is a sample wesbite made by @adit26star/@adit26data
                        </span>
                    </div>
                    <div className="aboutSectionContainer2">
                        <a href="https://instagram.com/adit26star" target="blank">
                            <InstagramIcon className="instagramSvgIcon" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;