import { FormGroup, FormHelperText, FormLabel, makeStyles } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles((theme) => ({
  root: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    '& > *': {
      flex: 1,
      '&:not(:last-child)': {
        marginRight: theme.spacing(3)
      }
    }
  }
}))

const InlineFormGroup = ({ label, description, required, children }) => {
  const classes = useStyles()

  return (
    <FormGroup margin='normal' required={!!required}>
      <FormLabel>{label}</FormLabel>
      {description && <FormHelperText >{description}</FormHelperText>}
      <div className={classes.root}>
        {children}
      </div>
    </FormGroup>
  )
}

export default InlineFormGroup