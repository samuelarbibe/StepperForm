import React, { useEffect } from 'react'
import { useFormikContext } from 'formik'

import Select from 'components/Select'
import TextInput from 'components/TextInput'

const PIROptions = [
  'PIR1',
  'PIR2',
  'PIR3',
  'PIR4',
  'PIR5',
  'PIR6',
  'PIR7',
  'PIR8',
]

const fieldsToValidate = ['name', 'PIR', 'intelligenceBackground']

const GeneralStep = ({ setIsValid }) => {
  const { errors, validateField } = useFormikContext()

  useEffect(() => {
    fieldsToValidate.map((field) => validateField(field))
  }, [validateField])

  const isStepValid = fieldsToValidate.every((field) => !errors[field])

  useEffect(() => {
    setIsValid(isStepValid)
  }, [isStepValid, setIsValid])

  return (
    <>
      <TextInput
        name='name'
        label='Name'
        required
      />
      <Select
        name='PIR'
        label='PIR'
        options={PIROptions}
        required
      />
      <TextInput
        name='intelligenceBackground'
        label='Intelligence Background'
        multiline
        minRows={5}
        required
      />
    </>
  )
}

export default GeneralStep