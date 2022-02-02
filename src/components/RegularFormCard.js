import React from 'react'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    borderBottom: '1px solid',
    borderBottomColor: theme.palette.divider,
  },
  content: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    padding: theme.spacing(5),
  },
}))

const RegularFormCard = ({ children, actions }) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        {children}
      </div>
    </div>
  )
}

export default RegularFormCard