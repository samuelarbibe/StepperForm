import React, { useCallback, useMemo, useState } from 'react'
import { Box, Button, makeStyles, Step as MuiStep, StepLabel, Stepper as MuiStepper } from '@material-ui/core'
import { StepperContext } from './StepperContext'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing(2),
    borderBottom: '1px solid',
    borderBottomColor: theme.palette.divider,
  },
  content: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    padding: theme.spacing(5),
  },
  footer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing(2),
    borderTop: '1px solid',
    borderTopColor: theme.palette.divider,
  }
}))

const Stepper = ({ children }) => {
  const classes = useStyles()
  const [isStepValid, setIsStepValid] = useState({})
  const [currentStepIndex, setCurrentStepIndex] = useState(0)

  const setIsStepValidByIndex = useCallback((index, isValid) => setIsStepValid((prev) => ({ ...prev, [index]: isValid })), [])

  const steps = useMemo(() => React.Children.map((children), (child, index) => {
    if (!React.isValidElement(child)) throw Error('Invalid step react element given to stepper')

    const setIsValid = (isValid) => setIsStepValidByIndex(index, isValid)
    return React.cloneElement(child, { index, setIsValid })
  }), [children, setIsStepValidByIndex])

  const currentStep = steps[currentStepIndex]
  const canNext = currentStepIndex + 1 < steps.length && isStepValid[currentStepIndex]

  const prev = () => {
    setCurrentStepIndex((prev) => prev - 1)
  }

  const next = () => {
    canNext && setCurrentStepIndex((prev) => prev + 1)
  }

  return (
    <StepperContext.Provider value={{ next, prev }}>
      <div className={classes.root}>
        <MuiStepper
          className={classes.header}
          activeStep={currentStepIndex}
          alternativeLabel
        >
          {
            steps?.map((step, index) => (
              <MuiStep key={index}>
                <StepLabel>
                  {step.props.label}
                </StepLabel>
              </MuiStep>
            ))
          }
        </MuiStepper>
        <div className={classes.content}>
          {currentStep}
        </div>
        <div className={classes.footer}>
          {currentStepIndex > 0 && <Button variant='outlined' onClick={prev}>Prev</Button>}
          <Box flex='1' />
          {
            currentStepIndex === steps.length - 1
              ? <Button variant='contained' color='primary' onClick={() => { }}>Send</Button>
              : <Button variant='contained' color='primary' disabled={!canNext} onClick={next}>Next</Button>
          }
        </div>
      </div>
    </StepperContext.Provider>
  )
}

export default Stepper