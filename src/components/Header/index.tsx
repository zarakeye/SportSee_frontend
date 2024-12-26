import { NavLink } from "react-router-dom"
import logo from "../../assets/logo.svg"
import React from "react"

/**
 * The Header component renders the main header of the application.
 *
 * It contains the logo of SportSee and a navigation menu with links to the
 * different pages of the application: Home, Profile, Settings and Community.
 *
 * The component is sticky, meaning it will stay at the top of the screen even
 * when the user scrolls down.
 *
 * @returns {React.ReactElement} The Header component.
 */
const Header: React.FC = () => {
  return (
    <>
      <header id="apHeader" className="sticky bg-black flex flex-row w-full justify-between bg-secondary h-[91px] pl-[28px] pt-[18px] pb-[12px] pr-[91px] shadow-[0px_4px_4px_0px_rgba(0,_0,_0,_0.2)]">
        <div id="apHeader_logo-container" className="font-roboto flex justify-between items-center min-w-[175px] h-[60.93px]">
          <img src={logo} alt="Logo SportSee" className="w-full"/>
        </div>

        <nav id="apHeader_nav-container" className="flex justify-between items-center text-2xl text-quaternary gap-32 decoration-none h-[60.93px]">
          <NavLink to="/">Accueil</NavLink>
          <NavLink to="/profil">Profil</NavLink>
          <NavLink to="/settings">Réglages</NavLink>
          <NavLink to="/community">Communauté</NavLink>
        </nav>
      </header>
    </>
  )
}

export default Header