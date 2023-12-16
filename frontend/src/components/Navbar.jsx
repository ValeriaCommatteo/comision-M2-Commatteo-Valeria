import React from 'react';
import { Link } from "react-router-dom";
import { useAuth } from "../actions/authActions";
import { ActionButton } from "./eti/ActionButton";
import './navBarStyle.css'

export function Navbar() {

  const { isAuthenticated, logout, user } = useAuth();
  const avatarURL = isAuthenticated ? user.avatarURL : null;

  return (
    <nav className="bg-body-tertiary py-3 px-6 rounded-lg flex justify-between items-center">
      <Link to={isAuthenticated ? "/posts" : "/"} className="custom-link">Aventuras Conectadas</Link>
      <div className="flex gap-x-2 items-center">
        {isAuthenticated ? (
          <>
            <div>
              {avatarURL && (
                <img src={avatarURL} alt="User Avatar" className="w-10 h-10 rounded-full object-cover" />
              )}
            </div>
            <div className="hidden md:block">Welcome, {user.username}</div>
            <div><ActionButton to="/add-post">Add Post</ActionButton></div>
            <div><ActionButton to="/posts">All Posts</ActionButton></div>
            <div><ActionButton to="/">Home</ActionButton></div>
            <div><ActionButton to="/profile">Profile</ActionButton></div>
            <div>
              <button onClick={() => logout()}>Logout</button>
            </div>
          </>
        ) : (
          <>
            <div className='nav-margin'>
              <ActionButton to="/login">Login</ActionButton>
            </div>
            <div className='nav-margin'>
              <ActionButton to="/register">Register</ActionButton>
            </div>
          </>
        )}
      </div>
    </nav>

  )
}