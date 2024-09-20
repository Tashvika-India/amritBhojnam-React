import React, { useState } from "react";
import Heading from "@/components/ui/Heading";
import YellowButton from "@/components/buttons/YellowButton";
import CategoriesTable from "./components/CategoriesTable";
import AddCategoryModal from "./components/AddCategoryModal";

function ManageCategories() {
  
  const [visible, setVisible] = useState(false);
  

  return (
    <>
      <div className="mt-3 mb-5 row">
        <div className="col-md-6">
          <Heading value={"Categories"} />
        </div>
        <div className="col-md-6 text-end">
          <YellowButton handleClick={() => setVisible(true)} lable={"+ Add New Category"} />
        </div>
      </div>

      <div className="">
        <div className="card">
          <div className="card-body">
            <CategoriesTable />
          </div>
        </div>
      </div>
      <AddCategoryModal visible={visible} setVisible={setVisible} />
    </>
  );
}

export default ManageCategories;
