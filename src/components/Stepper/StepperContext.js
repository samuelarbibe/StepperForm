import React, { useContext, createContext } from 'react'

const StepperContext = createContext()

const StepperConsumer = ({ children }) => {
  return (
    <StepperContext.Consumer>
      {(context) => {
        if (context === undefined) {
          throw new Error('StepperConsumer must be used within a StepperProvider')
        }
        return children(context)
      }}
    </StepperContext.Consumer>
  )
}

const useStepperContext = () => {
  const context = useContext(StepperContext)
  if (context === undefined) {
    throw new Error('useStepperContext must be used within a StepperProvider')
  }
  return context
}

export { StepperContext, StepperConsumer, useStepperContext }
