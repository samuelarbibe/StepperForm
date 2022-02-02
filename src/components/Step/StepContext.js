import React, { useContext, createContext } from 'react'

const StepContext = createContext()

const StepConsumer = ({ children }) => {
  return (
    <StepContext.Consumer>
      {(context) => {
        if (context === undefined) {
          throw new Error('StepConsumer must be used within a StepProvider')
        }
        return children(context)
      }}
    </StepContext.Consumer>
  )
}

const useStepContext = () => {
  const context = useContext(StepContext)
  if (context === undefined) {
    throw new Error('useStepContext must be used within a StepProvider')
  }
  return context
}

export { StepContext, StepConsumer, useStepContext }
