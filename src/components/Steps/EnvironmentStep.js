import React, { useEffect } from 'react'
import { useFormikContext } from 'formik'

import Select from 'components/Select'

const clusterOptions = [
  'Cluster_1',
  'Cluster_2',
  'Cluster_3',
  'Cluster_4',
  'Cluster_5',
  'Cluster_6',
  'Cluster_7',
  'Cluster_8',
]

const launchTypeOptions = [
  'FARGATE',
  'EC2'
]

const platformVersionOptions = [
  'LATEST',
  '1.3.5',
  '1.2.6'
]

const fieldsToValidate = ['cluster', 'launchType', 'platformVersion']

const EnvironmentStep = ({ setIsValid }) => {
  const { errors, validateField } = useFormikContext()

  useEffect(() => {
    fieldsToValidate.map((field) => validateField(field))
  }, [validateField])

  const isStepValid = fieldsToValidate.every((field) => !errors[field])

  useEffect(() => {
    setIsValid && setIsValid(isStepValid)
  }, [isStepValid, setIsValid])

  return (
    <>
      <Select
        name='cluster'
        label='Cluster'
        options={clusterOptions}
        required
      />
      <Select
        name='launchType'
        label='Launch Type'
        options={launchTypeOptions}
        required
        description='Select either managed capacity (Fargate), or custom capacity (EC2 or user-managed, External instances). External instances are registered to your cluster using the ECS Anywhere capability.'
      />
      <Select
        name='platformVersion'
        label='Platform version'
        options={platformVersionOptions}
        description='Specify the platform version on which to run your service.'
        required
      />
    </>
  )
}

export default EnvironmentStep