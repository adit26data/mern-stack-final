import React, { Fragment, useRef, useState, useEffect } from "react";
import "./UpdateProfile.css";
import Loader from "../layout/Loader/Loader";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, loadUser, updateProfile } from "../../actions/userAction";
import { useAlert } from "react-alert";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import FaceIcon from '@mui/icons-material/Face';
import { register } from "../../actions/userAction";
import { UPDATE_PROFILE_RESET } from "../../constants/userConstants";
function UpdateProfile({ history, location }) {
    const dispatch = useDispatch();
    const alert = useAlert();

    const { user } = useSelector(
        (state) => state.user
    );
    const { error, isUpdated, loading } = useSelector(
        (state) => state.profile
    );


    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [avatar, setAvatar] = useState();
    const [avatarPreview, setAvatarPreview] = useState("/Profile.png");
    const registerSubmit = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("avatar", avatar);
        dispatch(register(myForm));
    };

    const updateProfileDataChange = (e) => {
        if (e.target.name === "avatar") {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result);
                    setAvatar(reader.result);
                }
            };

            reader.readAsDataURL(e.target.files[0]);
        };
    };
    const redirect = location.search ? location.search.split("=")[1] : "/account";
    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setAvatarPreview(user.avatar.url);
        }
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (isUpdated) {
            dispatch(loadUser());
            history.push(redirect);
            dispatch({ type: UPDATE_PROFILE_RESET })
        }
    }, [dispatch, error, alert, history, user, redirect, isUpdated]);

    return (
        <div></div>
    )
}

export default UpdateProfile