import React, { useEffect } from 'react'
import { useField } from 'formik'

import { FormGroup, makeStyles, FormLabel, FormHelperText, Button } from '@material-ui/core'

import TextInput from 'components/TextInput'

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
  },
  formContainer: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(1.5),
  },
  formRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'end',
    '& > *': {
      marginTop: 0,
      marginBottom: 0,
      '&:not(:last-child)': {
        marginRight: theme.spacing(2),
      }
    }
  },
  removeButtonPlaceholder: {
    width: theme.spacing(12),
  },
  removeButton: {
    marginBottom: theme.spacing(0.5),
  },
  addButton: {
    alignSelf: 'start'
  }
}))

const removeItemAtIndex = (array, index) => {
  const newArray = [...array]
  newArray.splice(index, 1)
  return newArray
}

const TagsStep = ({ setIsValid }) => {
  const classes = useStyles()
  const [, meta, helpers] = useField('tags')

  const isStepValid = !meta.error

  useEffect(() => {
    setIsValid && setIsValid(isStepValid)
  }, [isStepValid, setIsValid])

  const handleOnClickAddKey = () => {
    helpers.setValue([...meta.value, { key: '', value: '' }])
  }

  const handleOnClickRemoveKey = (index) => () => {
    helpers.setValue(removeItemAtIndex(meta.value, index))
  }

  return (
    <FormGroup className={classes.root} margin='normal'>
      <FormLabel>{'Tags'}</FormLabel>
      <FormHelperText >{'Tags help you to identify and organize your clusters.'}</FormHelperText>
      <div className={classes.formContainer}>
        {
          meta.value.map(({ key }, index) => {
            return (
              <div className={classes.formRow} key={index}>
                <TextInput label={!index && 'Key'} name={`tags[${index}].key`} placeholder='Add key' />
                <TextInput label={!index && 'Value'} disabled={!key} name={`tags[${index}].value`} placeholder='Add value' />
                <Button className={classes.removeButton} variant='outlined' onClick={handleOnClickRemoveKey(index)}>Remove</Button>
              </div>
            )
          })
        }
      </div>
      <Button disabled={!!meta.error} className={classes.addButton} variant='outlined' onClick={handleOnClickAddKey}>Add tag</Button>
      <FormHelperText>{`You can add ${50 - meta.value.length} more tags.`}</FormHelperText>
    </FormGroup>
  )
}

export default TagsStep