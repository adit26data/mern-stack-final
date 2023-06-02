import React from 'react'
import { ReactNavbar } from "overlay-navbar";
import logo from '../../../images/logo.png';
import { FaUserAlt } from "react-icons/fa";
import { MdSearch } from "react-icons/md";
import { MdAddShoppingCart } from "react-icons/md";
const options = {
    burgerColor: "grey",
    burgerColorHover: "black",
    logo,
    logoWidth: "30vmax",
    logoMargin: "10px",
    navColor1: "black",
    logoHoverSize: "10px",
    logoHoverColor: "black",
    linkFamily1: "Roboto",
    link1Text: "Home",
    link2Text: "Products",
    link3Text: "Contact",
    link4Text: "About",
    link1Url: "/",
    link2Url: "/products",
    link3Url: "/contact",
    link4Url: "/about",
    link1Size: "1.3vmax",
    link1Color: "white",
    nav1alignItems: "center",
    nav2justifyContent: "flex-end",
    nav3justifyContent: "flex-start",
    nav4justifyContent: "flex-start",
    link1ColorHover: "#FF4B2B",
    link1Margin: "1vmax",
    profileIcon: true,
    ProfileIconElement: FaUserAlt,
    profileIconUrl: "/login",
    profileIconColor: "white",
    searchIcon: true,
    SearchIconElement: MdSearch,
    searchIconColor: "white",
    cartIcon: true,
    CartIconElement: MdAddShoppingCart,
    cartIconColor: "white",
    profileIconColorHover: "#FF4B2B",
    searchIconColorHover: "#FF4B2B",
    cartIconColorHover: "#FF4B2B",
    cartIconMargin: "1vmax",
};
const Header = () => {
    return <ReactNavbar {...options} />;
};

export default Header;