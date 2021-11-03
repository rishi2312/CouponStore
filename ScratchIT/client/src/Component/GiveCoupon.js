import React, { Component } from "react";
import axios from "axios";

export default class GiveCoupon extends Component {
  constructor(props) {
    super(props);

    this.state = {
      couponType: "",
      dateExpiry: "",
      //   selectedFile: null,
      dateIssued: "",
      couponCode: "",
      couponDescription: "",
    };
  }

  fileSelectHandler = (event) => {
    this.setState({
      selectedFile: event.target.files[0],
    });
  };

  uploadFile = () => {};

  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitHandler = (e) => {
    e.preventDefault();
    console.log(this.state);
    axios
      .post("http://localhost:8081/coupons/add", this.state)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    const {
      couponType,
      dateExpiry,
      dateIssued,
      couponCode,
      couponDescription,
    } = this.state;
    return (
      <div>
        <form onSubmit={this.submitHandler}>
          <div>
            <input
              type="text"
              placeholder="category"
              name="couponType"
              value={couponType}
              onChange={this.changeHandler}
            />
            <input
              type="date"
              name="dateExpiry"
              value={dateExpiry}
              onChange={this.changeHandler}
            />
            <input
              type="date"
              name="dateIssued"
              value={dateIssued}
              onChange={this.changeHandler}
            />
            <input
              type="text"
              placeholder="code"
              name="couponCode"
              value={couponCode}
              onChange={this.changeHandler}
            />
            <input
              type="text"
              placeholder="description"
              name="couponDescription"
              value={couponDescription}
              onChange={this.changeHandler}
            />
            {/* dateExpiry: new Date(req.body.dateExpiry),
    dateIssued: new Date(req.body.dateIssued),
    couponType: req.body.couponType,
    couponCode: req.body.couponCode,
    couponDescription: req.body.couponDescription, */}
          </div>
          <button type="submit">Submit</button>
        </form>
        <br></br>
        <div></div>
      </div>

      // <div>
      //     Give Coupon:
      //     <input type='file' onChange={this.fileSelectHandler}/>
      //     <button onClick={this.uploadFile}>Upload</button>
      // </div>
    );
  }
}
