import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

const steps = [];
steps[0] = "Enter User's personal details";
steps[1] = "Enter Educational Information";
steps[2] = "Enter Professional Information";

export default function HorizontalLabelPositionBelowStepper({ currentPage }) {
  // console.log(steps);
  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={currentPage} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}
