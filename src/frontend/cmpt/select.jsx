import cn from 'classnames'
import Select from '@mui/material/Select'

const CBSelect = ({ className, ...restProps }) => (
  <Select className={cn('cb-select', className)} {...restProps} />
)

export default CBSelect
