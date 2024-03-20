import React, { useState, useEffect } from 'react';
import { Button } from '../general/Button';
import styles from './UserNav.module.css';
import { Link } from 'react-router-dom';
import {useNavigate } from 'react-router-dom';

function Nav({navigateToApp}) {

  let navigate = useNavigate()
    let handleNavigate = (url) => {
        navigate(url)
    }

  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const [showCompanyLink, setShowCompanyLink] = useState(false)
  const [showLearnLink, setShowLearnLink] = useState(false)
  const [showIndividualLink, setShowIndividualLink] = useState(false)
  const [showCompanyHiddenDesktopBlock, setShowCompanyHiddenDesktopBlock] = useState(false)

  const [showLearnHiddenDesktopBlock,setShowLearnHiddenDesktopBlock] = useState(false)

  const [showIndividualsHiddenDesktopBlock,setShowIndividualsHiddenDesktopBlock] = useState(false)

  const handleClick = () => {
    setClick(!click);
  }


  const closeCompanyDesktop = () => {
    setClick(false);
    setShowCompanyHiddenDesktopBlock(prev=>!prev)
    setShowIndividualsHiddenDesktopBlock(false)
    setShowLearnHiddenDesktopBlock(false)
  }
  const closeLearnDesktop = () => {
    setClick(false);
    setShowLearnHiddenDesktopBlock(prev=>!prev)
    setShowCompanyHiddenDesktopBlock(false)
    setShowIndividualsHiddenDesktopBlock(false)
  }
  const closeIndividualDesktop = () => {
    setClick(false);
    setShowIndividualsHiddenDesktopBlock(prev=>!prev)
    setShowLearnHiddenDesktopBlock(false)
    setShowCompanyHiddenDesktopBlock(false)
  }

  const closeMobileMenu = ()=>{
    setClick(false)
  }



  const showLearnLinkHandler = () => {
    setShowLearnLink(prev => !prev)
    setShowCompanyLink(false)
    setShowIndividualLink(false)

  }
  const showCompanyLinkHandler = () => {
    setShowCompanyLink(prev => !prev)
    setShowLearnLink(false)
    setShowIndividualLink(false)

  }
  const showIndividualLinkHandler = () => {
    setShowIndividualLink(prev => !prev)
    setShowLearnLink(false)
    setShowCompanyLink(false)

  }

  //this function hides button from small screen on initial rendering
  const showButton = () => {
    if (window.innerWidth <= 1200) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  //adding event to the global window
  window.addEventListener('resize', showButton);

  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.navbar_container}>
          <Link to='/' className={styles.navbar_logo} onClick={closeMobileMenu} >
            Coincap
          </Link>

          <button className={styles.getStarted} onClick={() => handleNavigate('/signup')}>
            Get started
          </button>



          <div className={styles.menu_icon} onClick={handleClick}>
            <i className='material-icons' style={{ color: 'black' }}>
              menu
            </i>
          </div>

          <ul className={click ? `${styles.nav_menu} ${styles.active}` : `${styles.nav_menu}`}>
            <li className={styles.nav_item}>
              <Link
                to='/'
                className={styles.nav_link}
                onClick={closeIndividualDesktop}
              >
              </Link>
              

            </li>

            <li className={styles.nav_item}>
              <Link
                to='/learn'
                className={`${styles.nav_link} ${styles.desktop_button}`} style={{color:'#fff'}}
                onClick={closeLearnDesktop}>
                Learn Basics
              </Link>



              <div className={styles.nav_link_small} onClick={showLearnLinkHandler}>
                <button onClick={() => handleNavigate('/learn')} >
                  Learn Basics

                </button>
                <i className='material-icons'>
                  {showLearnLink ? 'arrow_drop_down' : 'arrow_right'}

                </i>

              </div>
              {showLearnLink && <ul
                to='/learn'
                className={styles.nav_link_list_con}
                onClick={showLearnLinkHandler}
              >
                
                <li className={styles.nav_link_list} onClick={() => handleNavigate('/learn/tips-and-tutorials')}>Tips & Tutorials</li>
                <li className={styles.nav_link_list}onClick={() => handleNavigate('/learn/crypto-basics/')}>Crypto basics</li>

              </ul>}

              

            </li>


            

            <div className={styles.smbuttonContainer}>
              <li className={styles.nav_links_mobile_con}>
                <Link
                  to='/signup'
                  className={styles.nav_links_mobile}
                  onClick={navigateToApp}
                >
                  Get started
                </Link>
              </li>
              <li className={styles.nav_links_mobile_con}>
                <Link
                  to='/signin'
                  className={styles.nav_links_mobile2}
                  onClick={navigateToApp}
                >
                  Sign in
                </Link>
              </li>

            </div>

          </ul>

          {/*button for large screen */}
          <div className={styles.lgbuttonContainer}>
            {button && <Button buttonStyle='btn--outline' onClick={()=>handleNavigate('/login')} link={'/signin'}>Login</Button>}
            {button && <Button buttonStyle='btn--colored' onClick={()=>handleNavigate('/signup')} link={'/signup'}>Signup</Button>}

          </div>

        </div>
      </nav>
    </>
  );
}

export default Nav;