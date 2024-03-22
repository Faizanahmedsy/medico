import React from "react";
import useGlobalState from "@/store";

interface DisplayFormStepProps {
  activeStep: number;
  variant?: "primary" | "group"; // Add variant prop here
}

const DisplayFormStep: React.FC<DisplayFormStepProps> = ({
  activeStep,
  variant = "primary",
}: DisplayFormStepProps) => {
  // Update the type definition here
  const theme = useGlobalState((state) => state.theme);

  const length = variant === "group" ? 3 : 6;

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
