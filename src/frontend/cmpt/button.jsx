import cn from 'classnames'
import Button from '@mui/material/Button'

const CBButton = ({ className, ...restProps }) => (
  <Button className={cn('cb-button', className)} {...restProps} />
)

export default CBButton
