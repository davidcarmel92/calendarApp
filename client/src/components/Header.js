import React from 'react';

const Header = props => {
  return (
    <header className="header">
      <ul>
        <li onClick={() => props.onChangeMonth('prev')} className="btn-arrow prev">&#10094;</li>
        <li onClick={() => props.onChangeMonth('next')} className="btn-arrow next">&#10095;</li>
        <li>{props.month} {props.year}</li>
      </ul>
    </header>
  );
}

export default Header;
