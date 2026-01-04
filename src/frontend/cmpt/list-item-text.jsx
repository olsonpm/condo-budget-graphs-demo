import ListItemText from '@mui/material/ListItemText'

const StyledListItemText = props => (
  <ListItemText
    slotProps={{ primary: { fontSize: '25px', marginLeft: '8px' } }}
    {...props}
  />
)

export default StyledListItemText
