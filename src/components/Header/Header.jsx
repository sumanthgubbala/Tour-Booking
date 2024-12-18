import React, {useContext,useRef} from "react";
import { Container, Row, Button } from "reactstrap";
import { NavLink, Link ,useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import './Header.css'
import { AuthContext } from './../../Context/AuthContext'

const nav_link = [
  {
    path: "/home",
    display: "Home",
  },
  {
    path: "/about",
    display: "About",
  },
  {
    path: "/tours",
    display: "Tours",
  },
];
const Header = () => {

  const menuRef = useRef(null);
   const navgate =useNavigate();
   const {user,dispatch} = useContext(AuthContext)

   const logout =()=>{
    dispatch({type:'LOGOUT'})
    navgate('/')
   }
  const toggleMenu =() => menuRef.current.classList.toggle('show__menu')
  return (
    <header className="header">
      <Container>
        <Row>
          <div className="nav__wrapper d-flex align-items-center justify-content-between">
            {/* logo */}
            <div className="logo">
              <img src={logo} alt="" />
            </div>
            {/* logo ends here */}
            {/* menu */}
            <div className="navigation" ref={menuRef} onClick={toggleMenu}>
              <ul className="menu d-flex align-items-center gap-5">
                {nav_link.map((item, index) => (
                  <li className="nav__item" key={index}>
                    <NavLink to={item.path}
                    className={navClass => navClass.isActive ? 'active__link' : ''}
                    >{item.display}</NavLink>
                  </li>
                ))}
              </ul>
            </div>
            {/* menu ends here */}
            <div className="nav__right d-flex align-items-center gap-4">
              <div className="nav__btns d-flex align-items-center gap-4">
              {
                user? (<><h5 className="mb-0">{user.username}</h5>
                <button className="btn btn-dark" onClick={logout}>LOGOUT</button>
                </>):
                (<>
                  <Button className="btn secondary__btn">
                  <Link to="/login">Login</Link>
                </Button>
                <Button className="btn primary__btn">
                  <Link to="/register">Register</Link>
                </Button>
                </>)
              }
                
              </div>
              <span className="mobile__menu" onClick={toggleMenu}>
                <i class="ri-menu-line"></i>
              </span>
            </div>
          </div>
        </Row>
      </Container>
    </header>
  );
};

export default Header;
