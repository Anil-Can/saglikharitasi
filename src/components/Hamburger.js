import React,{ useContext } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { AppContext } from "../context/AppContext";
import "./Hamburger.css"
export default function Hambuerger () {
    const { mode, setMode } = useContext(AppContext);
    const click = () => {
        
        document.querySelector(".navbar").classList.toggle('active');
        if(document.querySelector(".navbar.active") === null && mode !== null)
        {
            document.querySelector(".query-menu.active").classList.remove('active');
            let navElement = document.querySelector('.navbar').querySelector('li.active');
            if( navElement !== null) navElement.classList.remove('active');
            setMode(null);
        }
    }
    return (
        <div className="hamburger" onClick={click}>
            <GiHamburgerMenu/>
        </div>
    )
}