"use client";
import useGlobalState from "@/store";
import React from "react";

interface DisplayFormStepProps {
  activeStep: number;
}

const DisplayFormStep: React.FC<DisplayFormStepProps> = ({ activeStep }) => {
  const theme = useGlobalState((state) => state.theme);

  return (
    <ul className="steps" data-theme={theme}>
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
