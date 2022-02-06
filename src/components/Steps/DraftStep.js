import React, { useEffect, } from 'react'
import { useField } from 'formik'
import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

import { FormGroup, makeStyles, FormLabel, FormHelperText } from '@material-ui/core'
import { useDebouncedCallback } from 'use-debounce/lib'

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
  },
  editorWrapper: {
    marginTop: theme.spacing(2),
    maxWidth: '100%'
  },
  editor: {
    minHeight: '400px',
    border: '1px solid',
    borderColor: theme.palette.divider,
    padding: theme.spacing(1),
  },
}))

const DraftStep = ({ setIsValid }) => {
  const classes = useStyles()
  const [, tagsMeta] = useField('tags')
  const [, meta, helpers] = useField('notes')

  const onChange = (newValue) => {
    helpers.setValue(newValue)
    helpers.setTouched(true)
  }

  const debouncedOnChange = useDebouncedCallback(onChange, 1000)
  const isStepValid = !meta.error

  useEffect(() => {
    setIsValid && setIsValid(isStepValid)
  }, [isStepValid, setIsValid])

  return (
    <FormGroup className={classes.root} margin='normal'>
      <FormLabel>{'Notes'}</FormLabel>
      <FormHelperText >{'Edit you notes as rich text document!'}</FormHelperText>
      <Editor
        initialContentState={meta.initialValue}
        wrapperClassName={classes.editorWrapper}
        editorClassName={classes.editor}
        onContentStateChange={debouncedOnChange}
        mention={{
          separator: ' ',
          trigger: '@',
          suggestions: tagsMeta.value.map((tag) => ({ ...tag, text: tag.key })),
        }}
      />
    </FormGroup>
  )
}

export default DraftStep