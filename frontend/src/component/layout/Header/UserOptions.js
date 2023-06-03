import React, { Fragment, useState } from 'react'
import "./Header.css"
import { SpeedDial, SpeedDialAction } from '@mui/material'
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { useHistory } from "react-router-dom";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";

function UserOptions({ user }) {
    const history = useHistory();
    const alert = useAlert();
    const dispatch = useDispatch();
    const options = [
        { icon: <ListAltIcon />, name: "Orders", func: orders },
        { icon: <PersonIcon />, name: "Profile", func: account },
        { icon: <ExitToAppIcon />, name: "Logout", func: logoutUser },
    ];
    if (user.role === "admin") {
        options.unshift({
            icon: <DashboardIcon />,
            name: "Dashboard",
            func: dashboard,
        });
    }
    function dashboard() {
        history.push("/admin/dashboard");
    }

    function orders() {
        history.push("/orders");
    }
    function account() {
        history.push("/account");
    }
    function cart() {
        history.push("/cart");
    }
    function logoutUser() {
        // dispatch(logout());
        alert.success("Logout Successfully");
    }

    const [open, setOpen] = useState();
    return (
        <Fragment>
            <SpeedDial
                ariaLabel='SpeedDial tooltop example'
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}
                direction='down'
                icon={
                    <img className='speedDialIcon'
                        src={user.avatar.url ? user.avatar.url : "/Profile.png"}
                        alt="Profile.png" />
                } >
                {options.map((item) => (
                    <SpeedDialAction
                        key={item.name}
                        icon={item.icon}
                        tooltipTitle={item.name}
                        onClick={item.func}
                        tooltipOpen={window.innerWidth <= 600 ? true : false}
                    />
                ))}
            </SpeedDial >
        </Fragment >
    )
}

export default UserOptions