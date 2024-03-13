import React from "react";

interface DisplayFormStepProps {
  activeStep: number;
}

const DisplayFormStep: React.FC<DisplayFormStepProps> = ({ activeStep }) => {
  return (
    <ul className="steps">
      {[...Array(6)].map((_, index) => (
        <li
          key={index}
          className={`step ${index + 1 === activeStep ? "step-primary" : ""}`}
        ></li>
      ))}
    </ul>
  );
};

export default DisplayFormStep;
