import React from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

export function  ActionButton({ to, children }) {

  return (
    <Link to={to} >
        <Button className="action-button" >{children}</Button>
    </Link>
  );
}
