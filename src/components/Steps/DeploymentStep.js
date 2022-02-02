import React, { useEffect } from 'react'
import { useField, useFormikContext } from 'formik'

import Select from 'components/Select'
import NumberInput from 'components/NumberInput'
import InlineFormGroup from 'components/InlineFormGroup'
import CardRadio from 'components/CardRadio'
import TextInput from 'components/TextInput'

const applicationTypeOptions = [
  {
    label: 'Service',
    value: 'service',
    description: 'Launch a group of tasks handling a long-running computing work that can be stopped and restarted. For example, a web application.',
  },
  {
    label: 'Task',
    value: 'task',
    description: 'Launch a standalone task that runs and terminates. For example, a batch job.'
  },
]

const taskDefinitionFamilyOptions = [
  'TaskDefinition_1',
  'TaskDefinition_2',
  'TaskDefinition_3',
  'TaskDefinition_4',
  'TaskDefinition_5',
  'TaskDefinition_6',
  'TaskDefinition_7',
  'TaskDefinition_8',
]

const taskDefinitionRevisionOptions = [
  '34 (LATEST)',
  '33',
  '32'
]

const fieldsToValidate = ['applicationType', 'taskDefinition', 'name', 'desiredTasks']

const DeploymentStep = ({ setIsValid }) => {
  const { errors, validateField } = useFormikContext()
  const [, nameFieldMeta, nameFieldHelpers] = useField('name')
  const [, applicationTypeFieldMeta] = useField('applicationType')

  useEffect(() => {
    fieldsToValidate.map((field) => validateField(field))
  }, [validateField])

  const isStepValid = fieldsToValidate.every((field) => !errors[field])

  useEffect(() => {
    setIsValid && setIsValid(isStepValid)
  }, [isStepValid, setIsValid])

  const shouldShowServiceName = applicationTypeFieldMeta.value === 'service'

  useEffect(() => {
    if (nameFieldMeta.value && !shouldShowServiceName) {
      nameFieldHelpers.setValue(undefined)
      nameFieldHelpers.setTouched(false)
    }
  }, [nameFieldHelpers, nameFieldMeta.value, shouldShowServiceName])

  return (
    <>
      <CardRadio
        name='applicationType'
        label='Application Type'
        description='Specify what type of application you want to run.'
        options={applicationTypeOptions}
        required
      />
      <InlineFormGroup
        label='Task definition'
        description='Select an existing task definition.'
      >
        <Select
          name='taskDefinition.family'
          label='Family'
          options={taskDefinitionFamilyOptions}
          required
        />
        <Select
          name='taskDefinition.revision'
          label='Revision'
          options={taskDefinitionRevisionOptions}
          required
        />
      </InlineFormGroup>
      {
        shouldShowServiceName &&
        <TextInput
          name='name'
          label='Service name'
          description='Assign a unique name for this service.'
        />
      }
      <NumberInput
        name='desiredTasks'
        label='Desired tasks'
        description='Specify the number of tasks to launch.'
        inputProps={{ min: 0, max: 5 }}
      />
    </>
  )
}

export default DeploymentStep