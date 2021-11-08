import React, { Component } from "react";
import axios from "axios";
import CategoryDropdown from "./CategoryDropdown";
import SubCategoryDropdown from "./SubCategoryDropdown";
// import UploadImage from "./UploadImage";

export default class GiveCoupon extends Component {
  constructor(props) {
    super(props);

    this.state = {
      couponType: "",
      couponSubType: "",
      dateExpiry: "",
      //   selectedFile: null,
      // dateIssued: "",
      couponCode: "",
      couponDescription: "",
      selectedFile: null,
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
    const formData = new FormData();
    formData.append(
      "image",
      this.state.selectedFile,
      this.state.selectedFile.name
    );
    // formData.append("image", selectedFile);
    formData.append("couponType", this.state.couponType);
    formData.append("couponCode", this.state.couponCode);
    formData.append("dateExpiry", this.state.dateExpiry);
    debugger;
    axios
      .post("http://localhost:8081/coupons/add", formData)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });

    // for image
    // const formData = new FormData();
    // formData.append("image", selectedFile, selectedFile.name);
    // axios
    //   .post("http://localhost:8021/upload", formData)
    //   .then((res) => console.log(res))
    //   .catch((e) => console.log(e));
  };

  categoryChangeHandler = (data) => {
    this.setState({ couponType: data.value });
  };

  categorySubChangeHandler = (data) => {
    this.setState({ couponSubType: data.value });
  };

  onFileChange = (e) => {
    this.setState({ selectedFile: e.target.files[0] });
  };

  render() {
    const {
      couponType,
      couponSubType,
      dateExpiry,
      // dateIssued,
      couponCode,
      couponDescription,
      selectedFile,
    } = this.state;
    return (
      <div>
        <form onSubmit={this.submitHandler}>
          <div>
            <CategoryDropdown
              categoryChangeHandler={this.categoryChangeHandler}
            />
            <SubCategoryDropdown
              categorySubChangeHandler={this.categorySubChangeHandler}
            />
            {/* <input
              type="text"
              placeholder="category"
              name="couponType"
              value={couponType}
              onChange={this.changeHandler}
            /> */}
            <input
              type="date"
              name="dateExpiry"
              value={dateExpiry}
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
            <input type="file" name="image" onChange={this.onFileChange} />
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
