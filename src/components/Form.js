import React, { useState } from 'react'
import * as Yup from 'yup'
import { Formik, useFormikContext } from 'formik'
import { FormControlLabel, IconButton, makeStyles, Switch } from '@material-ui/core'

import Step from './Step/Step'
import Stepper from './Stepper/Stepper'

import FormCard from './FormCard'
import EnvironmentStep from './Steps/EnvironmentStep'
import DeploymentStep from './Steps/DeploymentStep'
import RegularFormCard from './RegularFormCard'
import SummaryStep from './Steps/SummaryStep'
import { Save, Send } from '@material-ui/icons'

const useStyles = makeStyles((theme) => ({
  root: {
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(5),
  },
}))

const initialDemand = {
  name: '',
  cluster: '',
  launchType: '',
  platformVersion: '',
  applicationType: '',
  taskDefinition: {
    family: '',
    revision: ''
  },
  desiredTasks: 1
}

const validationSchema = Yup.object().shape({
  cluster: Yup.string().nullable().required(),
  launchType: Yup.string().nullable().required(),
  platformVersion: Yup.string().nullable().required(),
  applicationType: Yup.string().nullable().required(),
  taskDefinition: Yup.object().shape({
    family: Yup.string().nullable().required('Task family is required'),
    revision: Yup.string().nullable().required('Task revision is required')
  }),
  name: Yup.string().nullable()
    .when('applicationType', {
      is: 'service',
      then: (schema) => schema.required(),
    }),
  desiredTasks: Yup.number()
    .min(0, 'Desired tasks must be positive')
    .max(5, 'Desired tasks must be 5 or lower')
    .required()
})

const FormActions = ({ isWizard }) => {
  const { isValid } = useFormikContext()

  return (
    <IconButton color='primary' disabled={!isValid}>
      {
        isWizard ? <Save /> : <Send />
      }
    </IconButton>
  )
}

const MyForm = () => {
  const classes = useStyles()
  const [isWizard, setIsWizard] = useState(true)

  return (
    <div className={classes.root}>
      <FormControlLabel
        control={
          <Switch checked={isWizard}
            onChange={() => setIsWizard((prev) => !prev)}
          />
        }
        label='Wizard mode'
      />
      <Formik
        initialValues={initialDemand}
        isInitialValid={false}
        validateOnBlur={false}
        validationSchema={validationSchema}
        onSubmit={() => { }}
      >
        <FormCard actions={<FormActions isWizard={isWizard} />}>
          {
            isWizard
              ? (
                <Stepper>
                  <Step label='Enironment'>
                    <EnvironmentStep />
                  </Step>
                  <Step label='Deployment configuration'>
                    <DeploymentStep />
                  </Step>
                  <Step label='Summary'>
                    <SummaryStep />
                  </Step>
                </Stepper>
              )
              : (
                <RegularFormCard>
                  <EnvironmentStep />
                  <DeploymentStep />
                </RegularFormCard>
              )
          }
        </FormCard>
      </Formik >
    </div >
  )
}

export default MyForm