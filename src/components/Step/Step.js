import React from 'react'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
  },
}))


const Step = ({ label, setIsValid, children }) => {
  const classes = useStyles()

  const childrenWithProps = React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { setIsValid })
    }
    return child
  })

  return (
    <div className={classes.root}>
      {childrenWithProps}
    </div>
  )
}

export default Step