import React from 'react'
import classNames from 'classnames'

import { Button, makeStyles, Typography } from '@material-ui/core'
import { useField } from 'formik'
import { useStepperContext } from './Stepper/StepperContext'

const useStyles = makeStyles((theme) => ({
  root: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  discplineCard: {
    padding: theme.spacing(3),
    '&:not(:last-child)': {
      marginBottom: theme.spacing(2)
    }
  },
  discplineCardRadioed: {
    backgroundColor: theme.palette.primary.light
  }
}))

const disciplineOptions = {
  imint: {
    label: 'IMINT'
  },
  visint: {
    label: 'VISINT'
  },
  sigint: {
    label: 'SIGINT'
  },
  umint: {
    label: 'UMINT'
  },
  cyber: {
    label: 'CYBER'
  }
}

const DisciplineStep = () => {
  const classes = useStyles()
  const { next } = useStepperContext()
  const [, meta, helpers] = useField('discipline')

  const handleOnClick = (newDiscipline) => () => {
    helpers.setValue(newDiscipline)
    helpers.setTouched(true)
    !meta.value && next()
  }

  return (
    <div className={classes.root}>
      {
        Object.entries(disciplineOptions).map(([key, value]) => {
          const isSelected = meta.value === key

          return (
            <Button
              key={key}
              variant='outlined'
              onClick={handleOnClick(key)}
              className={classNames(classes.discplineCard, isSelected && classes.discplineCardRadioed)}
            >
              <Typography>{value.label}</Typography>
            </Button>
          )
        })
      }
    </div>
  )
}

export default DisciplineStep