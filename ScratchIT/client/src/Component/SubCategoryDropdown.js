// import React from "react";
// import Creatable from "react-select/creatable";

// const aquaticCreatures = [
//   { label: "Clothing", value: "Clothing" },
//   { label: "Entertainment", value: "Entertainment" },
//   { label: "Food", value: "Food" },
//   { label: "Finance", value: "Finance" },
//   { label: "Personal Care", value: "Personal Care" },
//   { label: "Home", value: "Home" },
// ];

// function SubCategoryDropdown() {
//   return (
//     <div className="CategoryDropdown">
//       <Creatable options={aquaticCreatures} />
//     </div>
//   );
// }

// // export default CategoryDropdown;
// export default SubCategoryDropdown;

import React from "react";
import Creatable from "react-select/creatable";

export default class SubCategoryDropdown extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const subCategory = [
      { label: "Swiggy", value: "Swiggy" },
      { label: "Zomato", value: "Zomato" },
    ];
    return (
      <div className="CategoryDropdown">
        <Creatable
          options={subCategory}
          onChange={this.props.categorySubChangeHandler}
        />
      </div>
    );
  }
}
