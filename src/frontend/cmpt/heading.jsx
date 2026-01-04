import axios from 'axios'
import { useState } from 'react'
import { mapValues, passThrough } from 'common-fp'
import Button from './button'
import ErrorDialog from './error-dialog'
import cfg from '@/../../config/client.json'

import './heading.css'

const Heading = ({ currentPage }) => {
  const [showError, setShowError] = useState(false)

  const logout = async () => {
    try {
      await axios.post('/api/logout')
      window.location.href = '/login'
    } catch {
      setShowError(true)
    }
  }
  const onErrorClose = () => setShowError(false)

  const allPages = {
    'Single Year': './',
    'Compare Years': './compare',
    'Month Overview': './month',
  }
  const renderedPages = passThrough(allPages, [
    mapValues((href, name) => {
      if (name === currentPage) {
        return (
          <Button key={name} disabled className="current-page">
            {name}
          </Button>
        )
      }

      return (
        <Button key={name} href={href}>
          {name}
        </Button>
      )
    }),
    Object.values,
  ])

  return (
    <>
      <header className="content-frame">
        <nav>
          {renderedPages}

          {!cfg.isDemo && (
            <Button
              className="tablet-and-larger"
              variation="outlined"
              onClick={logout}
            >
              Log Out
            </Button>
          )}
        </nav>
        <h1>{currentPage}</h1>
      </header>
      <ErrorDialog onClose={onErrorClose} show={showError} />
    </>
  )
}

export default Heading
