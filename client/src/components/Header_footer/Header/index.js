import React, { Component, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';

import { connect } from 'react-redux';
import { logoutUser } from '../../../actions/user_actions';

class Header extends Component {

  state = {
    page: [
      {
        name: 'Home',
        linkTo: '/',
        public: true
      },
      {
        name: 'Guitars',
        linkTo: '/shop',
        public: true
      }
    ],
    user: [
      {
        name: 'My Cart',
        linkTo: '/user/cart',
        public: false
      },
      {
        name: 'My Account',
        linkTo: '/user/dashboard',
        public: false
      },
      {
        name: 'Log in',
        linkTo: '/register_login',
        public: true
      },
      {
        name: 'Log out',
        linkTo: '/user/logout',
        public: false
      },
    ],
    hamburger_sidebar: false
  }

  _toggleHamburger = () => {
    if (this.state.hamburger_sidebar) {
      this.setState({ hamburger_sidebar: false })
    } else {
      this.setState({ hamburger_sidebar: true })
    }
  }

  logoutHandler = () => {
    this.props.dispatch(logoutUser()).then(response => {
      if (response.payload.success) {
        this.props.history.push('/')
      }
    })
  }


  cartLink = (item, i) => {
    const user = this.props.user.userData;

    return (
      <div className="option cart_link" key={i}>
        <span>{user.cart ? user.cart.length : 0}</span>
        <Link to={item.linkTo}>
          {item.name}
        </Link>
      </div>
    )
  }


  defaultLink = (item, i) => (
    item.name === 'Log out' ?
      <div className="option log_out_link"
        key={i}
        onClick={() => this.logoutHandler()}
      >
        {item.name}
      </div>

      :
      <Link className='option' to={item.linkTo} key={i}>
        {item.name}
      </Link>

  )


  showLinks = (type) => {
    let list = [];

    if (this.props.user.userData) {
      type.forEach((item) => {
        if (!this.props.user.userData.isAuth) {
          if (item.public === true) {
            list.push(item)
          }
        } else {
          if (item.name !== 'Log in') {
            list.push(item)
          }
        }
      });
    }

    return list.map((item, i) => {
      if (item.name !== 'My Cart') {
        return this.defaultLink(item, i)
      } else {
        return this.cartLink(item, i)
      }

    })
  }

  hambSideBar = (opened) => {
    if (opened) {
      return (
        <div className='drawer-menu'>
          <div className="nav-main">

            {this.showLinks(this.state.user)}
          </div>
          <div className="bottom">
            {this.showLinks(this.state.page)}
          </div>
        </div>
      );
    } else {
      return (
        <div className="nav-main">

        </div>
      );
    }
  }

  render() {
   let cl_hamburger = 'hamburger'; // CSS class for hamburger
   if (this.state.hamburger_sidebar) {
     cl_hamburger = 'hamburger opened';
   }

    return (
      <header className="bck_b_light">
        <div className="container">
          <div className="left">
            <div className="logo">
              WAVES
                        </div>
          </div>
          <div className="right big-nav menu-for-big-screen">
            <div className="top nav-main">
              {this.showLinks(this.state.user)}
            </div>

            <div className="bottom">
              {this.showLinks(this.state.page)}
            </div>
          </div>
          <div className='right sm-nav-parent'>
            <div className={cl_hamburger} onClick={this._toggleHamburger}>
              <div className='icon'></div>
            </div>
          </div>

        </div>

        <div className="sm-nav menu-for-small-screen">
          {this.hambSideBar(this.state.hamburger_sidebar)}
        </div>

      </header>


    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(withRouter(Header));