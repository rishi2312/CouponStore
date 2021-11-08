import React from "react";
import Select from "react-select";

export default class CategoryDropdown extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const category = [
      { label: "Clothing", value: "Clothing" },
      { label: "Entertainment", value: "Entertainment" },
      { label: "Food", value: "Food" },
      { label: "Finance", value: "Finance" },
      { label: "Personal Care", value: "Personal Care" },
      { label: "Home", value: "Home" },
    ];
    return (
      <div className="CategoryDropdown">
        <Select
          options={category}
          onChange={this.props.categoryChangeHandler}
        />
      </div>
    );
  }
}
