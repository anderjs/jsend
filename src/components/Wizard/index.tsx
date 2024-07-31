import React from "react";
import classNames from "clsx";


// - Styles
import { classes } from "./styles";

/**
 * @description
 * Wizard component to track progress out of inscriptions.
 */
export const TwWizard: React.FunctionComponent<WizardProps> = React.memo(
  (props) => {
    return (
      <React.Fragment>
        <div className={classes.root}>
          <div className={classes.container}>
            <div className={classes.fullSpace}>
              {props?.steps?.map((step, index) => (
                <div
                  className={
                    /**
                     * @description
                     * 'step ==== s' is equal to make sure that the class will match to an active.
                     * */
                    classNames(
                      classes.step,
                      props?.step === step ? classes.active : classes.inactive
                    )
                  }
                  key={step?.name ?? index}
                >
                  {step?.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
);

TwWizard.defaultProps = {
  step: 0,
  steps: [],
};

export type WizardItem = {
    icon?: React.ReactElement;
    name?: string;
  }
  
  export type WizardProps = {
    step?: number;
    steps?: WizardItem []
    onNextStep?: () => void;
    onPrevStep?: () => void;
  }