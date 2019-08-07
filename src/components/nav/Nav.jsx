import React from "react";
// import { Link } from "react-dom";

import logo from "../../assets/public/images/logo128.png"

class Nav extends React.Component {

  render() {
    return (
      <div id="nav">
        <div className="nav-sitename">
          <img src={logo} alt="logo" />
          
          <h3 className="nav-projectname">Quelea</h3>
          <div className="nav-text-divider"></div>
          <a className="nav-boidslink btn-raise" href="https://www.red3d.com/cwr/boids/" >A Boids Simulation</a>
        </div>

        <div className="nav-links">
          <a href="a@b.com" className="nav-links-personal btn-raise">
            <h3>Steven Terry</h3>
            <i className="fas fa-portrait" />
          </a>
          <div className="nav-text-divider"></div>
          <a href="https://github.com/stkterry/quelea" className="btn-raise"><i className='fab fa-github-square' /></a>
          <a href="a@b.com" className="btn-raise"><i className="fab fa-linkedin" /></a>
          <a href="a@b.com" className="btn-raise"><i className="fas fa-envelope-square" /></a>
        </div>
      </div>
    )
  }
}

export default Nav;