import React from 'react'
import { useField } from 'formik'
import { Autocomplete } from '@material-ui/lab'
import { FormControl, FormHelperText, FormLabel, makeStyles, TextField } from '@material-ui/core'

const useStyles = makeStyles({
  select: {
    marginTop: '8px',
    marginBottom: '4px'
  }
})

const Select = ({ label, required, helperText, description, ...props }) => {
  const classes = useStyles()
  const [field, meta, helpers] = useField(props)
  const error = meta.touched && meta.error

  const handleOnChange = (e, value) => {
    helpers.setValue(value)
    helpers.setTouched(true)
  }

  return (
    <FormControl required={required} margin='normal' >
      <FormLabel>{label}</FormLabel>
      {description && <FormHelperText>{description}</FormHelperText>}
      <Autocomplete
        className={classes.select}
        autoComplete
        size='small'
        variant='outlined'
        renderValue={(selected) => selected.join(', ')}
        {...field}
        onChange={handleOnChange}
        value={meta.value}
        {...props}
        renderInput={(params) => (
          <TextField
            size='small'
            {...params}
            variant="outlined"
            placeholder={props.placeholder}
          />
        )}
      />
      {error && <FormHelperText error>{error}</FormHelperText>}
      {helperText && <FormHelperText >{helperText}</FormHelperText>}
    </FormControl>
  )
}

export default Select