import React, { Component } from 'react';

// import Header from '../components/Header_footer/Header';
import Header from '../components/Header_footer/Header';
import Footer from '../components/Header_footer/Footer';

import { connect } from 'react-redux'
import { getSiteData } from '../actions/site_actions'

class Layout extends Component {

  _handleResize() {
    let width = window.innerWidth;
    if (width >= 800) {
      document.body.classList.remove("screen-is-small");
      document.body.classList.add("screen-is-big");
    } else {
      document.body.classList.remove("screen-is-big");
      document.body.classList.add("screen-is-small");
    }
  }

  componentDidMount() {
    if (Object.keys(this.props.site).length === 0) {
      this.props.dispatch(getSiteData())
    }

    this._handleResize();


    window.addEventListener('resize', this._handleResize); // JS 

  }

  render() {
    return (
      <div className="root_wrapper">
        <Header />
        <div className="page_container">
          {this.props.children}
        </div>
        <Footer data={this.props.site} />
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    site: state.site
  }
}

export default connect(mapStateToProps)(Layout);