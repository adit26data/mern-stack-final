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
                            src="https://res.cloudinary.com/dxn8oxfq6/image/upload/v1685893514/wse0cur7c3a0tlxxthtc.jpg"
                            alt="Founder"
                        />
                        <Typography>Adit Kaushal</Typography>
                        <Button onClick={visitInstagram} color="primary">
                            Visit Instagram
                        </Button>
                        <span>
                            This is a sample wesbite made by <a href="https://github.com/adit26data">@adit26data</a>
                        </span>
                    </div>
                    <div className="aboutSectionContainer2">
                        <a href="https://instagram.com/adit26star" target="blank">
                            <InstagramIcon className="instagramSvgIcon" />
                        </a>
                        <span>Hi I am Adit Kaushal, a full stack web developer and I am currenlty pursuing engineering at VIT, Vellore. I created this website as a project to learn and understand the gravity of a real world project and I had a great time making this website! I took help from Youtube videos and AbhiSingh from his Youtube channel 6packprogrammer.</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;