import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Header from './Header';
import GiveCoupon from './GiveCoupon';
import GetCoupon from './GetCoupon';

export default class Container extends Component {
  constructor(props) {
    super(props);
    this.state = { renderView: 1 };
  }


  render() {
    let clickBtn = e => {
      // e.preventDefault();

      this.setState({

        renderView: +e.target.value
      });
      // console.log(this.state.renderView);
    };



    const rendercontent = () => {
      if (this.state.renderView === 1) {

        return (
          <GiveCoupon />

        );
      } else {

        return (
          <div>
            <GetCoupon />
          </div>
        );
      }
    }



    return (

      <div className="imp">

        <Header />
        <div className="buttons">
          <button className={this.state.renderView === 1 ? "btn1" : "btn2"} value={1} onClick={clickBtn}> Give Coupon </button>
          <button className={this.state.renderView === 2 ? "btn1" : "btn2"} value={2} onClick={clickBtn}> Get Coupon </button>
        </div>
        {rendercontent()}
      </div>


    )

  }
}
