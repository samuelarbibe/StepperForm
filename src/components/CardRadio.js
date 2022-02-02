import React from 'react'
import { useField } from 'formik'
import classNames from 'classnames'
import { Button, FormControl, FormHelperText, FormLabel, Grid, makeStyles, Radio, Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
  },
  controlGroup: {
    marginTop: theme.spacing(0.5),
    marginBottom: theme.spacing(0.5),
  },
  optionCard: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'start',
    padding: theme.spacing(1),
    paddingTop: theme.spacing(1),
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    border: '1px solid',
    borderColor: theme.palette.divider,
  },
  optionCardSelected: {
    backgroundColor: theme.palette.primary.light,
    borderColor: theme.palette.primary.main,
  },
  optionCardRadio: {
    marginTop: theme.spacing(-0.7),
    margin: theme.spacing(-1),
  },
  optionCardText: {
    marginLeft: theme.spacing(1),
    textAlign: 'left'
  }
}))

const CardRadio = ({ name, label, required, description, helperText, options }) => {
  const classes = useStyles()
  const [, meta, helpers] = useField(name)

  const handleOnClick = (value) => () => {
    helpers.setValue(value)
    helpers.setTouched(true)
  }

  return (
    <FormControl required={required} margin='normal'>
      <FormLabel id={`${label}-select-label`}>{label}</FormLabel>
      {description && <FormHelperText>{description}</FormHelperText>}
      <Grid container className={classes.controlGroup} spacing={3}>
        {
          options?.map((option) => {
            const isSelected = meta.value === option.value

            return (
              <Grid key={option.value} item xs={6}>
                <Button
                  disableRipple
                  onClick={handleOnClick(option.value)}
                  className={classNames(classes.optionCard, isSelected && classes.optionCardSelected)}
                >
                  <Radio className={classes.optionCardRadio} checked={isSelected} size='small' color='primary' />
                  <div className={classes.optionCardText}>
                    <Typography>{option.label}</Typography>
                    <Typography variant='body2'>{option.description}</Typography>
                  </div>
                </Button>
              </Grid>
            )
          })
        }
      </Grid>
    </FormControl>
  )
}

export default CardRadio