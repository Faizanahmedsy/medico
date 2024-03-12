import React from "react";
import { TextH2 } from "@/components/modules";
import { CustomerProductVisibilityTable } from "@/app/(company-dashboard)/dashboard/_components/customer-product-visibility-table";
export default function AddProductThirdStep() {
  return (
    // <div>
    //   Render a list of users, user will select to whome they want to show the
    //   product
    // </div>

    <div className="p-8">
      {/* <div>
        After save btn user will be redirected here he will select state taluka
        and all save and then go to next page
      </div> */}
      <div className=" flex justify-center items-center py-7">
        <ul className="steps">
          <li className="step step-primary"></li>
          <li className="step step-primary"></li>
          <li className="step step-primary"></li>
          <li className="step"></li>
          <li className="step"></li>
          <li className="step"></li>
        </ul>
      </div>

      <div>
        <TextH2>Whom to show</TextH2>
      </div>
      <div className="">
        <CustomerProductVisibilityTable />
      </div>
    </div>
  );
}
