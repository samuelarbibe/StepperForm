import React from 'react'
import { Box, IconButton, makeStyles } from '@material-ui/core'
import { MdClose } from 'react-icons/md'
import { Form } from 'formik'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    width: theme.breakpoints.values.sm,
    border: '1px solid',
    borderColor: theme.palette.divider,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing(2),
    borderBottom: '1px solid',
    borderBottomColor: theme.palette.divider,
  },
}))

const FormCard = ({ children, actions }) => {
  const classes = useStyles()

  return (
    <Form className={classes.root}>
      <div className={classes.header}>
        <IconButton><MdClose /></IconButton>
        <Box flex='1' />
        {actions}
      </div>
      {children}
    </Form>
  )
}

export default FormCard