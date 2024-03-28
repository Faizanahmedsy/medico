import React from "react";
import useGlobalState from "@/store";
import { off } from "process";

interface DisplayFormStepProps {
  activeStep: number;
  variant?: "primary" | "group" | "offer"; // Add variant prop here
}

const DisplayFormStep: React.FC<DisplayFormStepProps> = ({
  activeStep,
  variant = "primary",
}: DisplayFormStepProps) => {
  // Update the type definition here
  const theme = useGlobalState((state) => state.theme);

  let length = 6;

  switch (variant) {
    case "group":
      length = 3;
      break;
    case "offer":
      length = 3;
      break;
    default:
      length = 6;
  }

  return (
    <ul className="steps" data-theme={theme}>
      {[...Array(length)].map((_, index) => (
        <li
          key={index}
          className={`step ${index + 1 === activeStep ? "step-primary" : ""}`}
        ></li>
      ))}
    </ul>
  );
};

export default DisplayFormStep;
