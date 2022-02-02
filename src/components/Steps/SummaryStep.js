import React from 'react'
import { useFormikContext } from 'formik'
import { makeStyles, Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {

  }
}))

function flattenObject(ob) {
  var toReturn = {}

  for (var i in ob) {
    if (!ob.hasOwnProperty(i)) continue

    if ((typeof ob[i]) == 'object' && ob[i] !== null) {
      var flatObject = flattenObject(ob[i])
      for (var x in flatObject) {
        if (!flatObject.hasOwnProperty(x)) continue

        toReturn[i + '.' + x] = flatObject[x]
      }
    } else {
      toReturn[i] = ob[i]
    }
  }
  return toReturn
}

const SummaryStep = ({ setIsValid }) => {
  const classes = useStyles()
  const { values } = useFormikContext()

  const flattendValues = flattenObject(values)

  return (
    <div className={classes.root}>
      <Table size='small'>
        <TableHead>
          <TableRow>
            <TableCell>key</TableCell>
            <TableCell>value</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            Object.entries(flattendValues).map(([key, value]) => (
              <TableRow key={key}>
                <TableCell component="th" scope="row">
                  {key}
                </TableCell>
                <TableCell>
                  {value}
                </TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </div>
  )
}

export default SummaryStep