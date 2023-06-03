import React from 'react'
import profilePng from "../../images/profilePng.webp"
import ReactStars from 'react-rating-stars-component'

function ReviewCard({ review }) {
    const options = {
        edit: false,
        color: "rgba(20,20,20,0.1)",
        activeColor: "red",
        size: window.innerWidth < 600 ? 20 : 25,
        value: review.rating,
        isHalf: true
    };
    return (
        <div className='reviewCard'>
            <img src={profilePng} alt="User">
            </img>
            <p>{review?.name}</p>
            <ReactStars {...options} />
            <span>{review?.comment}</span></div>
    )
}

export default ReviewCard