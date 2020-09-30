import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { Link } from 'umi';
import Avatar from './avatar';
import routes from '../../../routes';
import './index.less';

const LayoutHeader: React.FC = () => {
  const [slideOpen, setSlideOpen] = useState(false);
  const [slideConShow, setSlideConShow] = useState(false);

  const showSlideMenu = () => {
    setSlideConShow(true);
    setSlideOpen(true);
  };

  const toggleChild = (e: any, num: number) => {
    e.stopPropagation();
    const ele = e.target;
    const clsName = ele.className;
    if (clsName.indexOf('open') > -1) {
      ele.style.height = '24px';
      ele.className = ele.className.split(' ')[0];
    } else {
      ele.style.height = num * 40 + 24 + 'px';
      ele.className = ele.className + ' open';
    }
  };

  return (
    <div className="hh">
      <div className="layout-header">
        <img
          className="header-hamburger"
          src={require('@/assets/images/menu.svg')}
          onClick={() => showSlideMenu()}
          alt="slide"
        />
        <a className="logo-wrap" href="/">
          <img
            className="header-logo logo"
            src={require('@/assets/images/logo.png')}
            alt="logo"
          />
        </a>
        <div className="pure-menu pure-menu-horizontal">
          {routes.map(menu => {
            if (menu.routes && menu.routes.length > 0) {
              return (
                <li
                  className="pure-menu-item pure-menu-has-children pure-menu-allow-hover"
                  key={menu.name}
                >
                  <span className="pure-menu-link">{menu.title}</span>
                  <ul className="pure-menu-children">
                    {menu.routes.map(child => {
                      return (
                        <li className="pure-menu-item" key={child.name}>
                          <Link className="pure-menu-link" to={child.path}>
                            {child.title}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </li>
              );
            } else {
              return (
                <li
                  className="pure-menu-item pure-menu-selected"
                  key={menu.name}
                >
                  <Link className="pure-menu-link" to={menu.path}>
                    {menu.title}
                  </Link>
                </li>
              );
            }
          })}
        </div>

        <div
          className="header-side-menu"
          style={{ display: slideConShow ? 'block' : 'none' }}
          onClick={() => {
            setSlideOpen(false);
          }}
        >
          <CSSTransition
            in={slideOpen}
            timeout={300}
            classNames="alert"
            unmountOnExit
            onExited={() => {
              setSlideConShow(false);
            }}
          >
            <div
              className="header-side-menu-main"
              onClick={e => e.stopPropagation()}
            >
              <div className="header-side-menu-wrapper">
                <div className="header-side-menu-logo">
                  <Link to="/">
                    <img
                      className="header-logo"
                      src={require('@/assets/images/logo.png')}
                      alt="logo"
                    />
                  </Link>
                </div>
                {routes.map(menu => {
                  if (menu.routes && menu.routes.length > 0) {
                    return (
                      <div
                        className="header-side-menu-sub"
                        onClick={e => {
                          toggleChild(e, (menu.routes as []).length);
                        }}
                        key={menu.name}
                      >
                        <span>{menu.title}</span>
                        <i />
                        <div className="header-side-menu-sub-items">
                          {menu.routes.map(child => {
                            return (
                              <div key={child.name}>
                                <Link
                                  to={child.path}
                                  onClick={e => e.stopPropagation()}
                                >
                                  {child.title}
                                </Link>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  } else {
                    return (
                      <div className="header-side-menu-item" key={menu.name}>
                        <Link className="pure-menu-link" to={menu.path}>
                          {menu.title}
                        </Link>
                      </div>
                    );
                  }
                })}
              </div>
              <Avatar />
            </div>
          </CSSTransition>
        </div>
        <Avatar isDesk={true} />
      </div>
    </div>
  );
};

export default LayoutHeader;
