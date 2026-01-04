import cn from 'classnames'
import Button from '@mui/material/Button'

const CBButton = ({ children, className, ...restProps }) => (
  <Button className={cn('cb-button', className)} {...restProps}>
    {children}
  </Button>
)

export default CBButton
