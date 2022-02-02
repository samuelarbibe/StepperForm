import React, { useState } from 'react'
import { useField } from 'formik'
import { useDebouncedCallback } from 'use-debounce'
import { FormControl, FormHelperText, FormLabel, TextField } from '@material-ui/core'

const TextInput = ({ label, required, debounce = 100, description, helperText, ...props }) => {
  const [field, meta, helpers] = useField(props)
  const [value, setValue] = useState(meta.value)
  const debouncedSetFieldValue = useDebouncedCallback(helpers.setValue, debounce)

  const error = meta.touched && meta.error

  const handleOnChange = ({ target }) => {
    const { value } = target
    setValue(value)
    debouncedSetFieldValue(value)
  }

  return (
    <FormControl required={required} margin='normal'>
      {label && <FormLabel>{label}</FormLabel>}
      {description && <FormHelperText >{description}</FormHelperText>}
      <TextField
        size='small'
        margin='dense'
        variant='outlined'
        {...field}
        {...(debounce && { onChange: handleOnChange, value })}
        {...props}
      />
      {error && <FormHelperText error>{error}</FormHelperText>}
      {helperText && <FormHelperText >{helperText}</FormHelperText>}
    </FormControl>
  )
}

export default TextInput