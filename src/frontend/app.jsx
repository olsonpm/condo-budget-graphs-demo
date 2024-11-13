import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import queryString from 'query-string'
import { Appear, Button, ErrorDialog, Graph, MenuItem, Select } from '@/cmpt'
import { categories, categoryNames, customCapitalCase, waitMs } from '@/utils'
import { useViewportSize } from '@/hooks'
import graphData from '@data/graph.json'

const parsedQuery = queryString.parse(location.search)
const initialItems = categories[parsedQuery.category] || []
const isDemo = location.hostname === 'olsonpm.github.io'

const App = () => {
  const [category, setCategory] = useState(parsedQuery.category)
  const [item, setItem] = useState(parsedQuery.item || '')
  const [itemList, setItemList] = useState(initialItems)
  const [dataType, setDataType] = useState(parsedQuery.dataType || '')
  const [renderedGraph, setRenderedGraph] = useState()
  const [showError, setShowError] = useState(false)

  const selectCategory = evt => {
    const selectedCategory = evt.target.value
    if (category === selectedCategory) return

    setCategory(selectedCategory)
    setItem('')
    if (!selectedCategory || selectedCategory === 'Reserve') setItemList([])
    else setItemList(categories[selectedCategory])
  }

  const selectItem = evt => setItem(evt.target.value)
  const selectDataType = evt => setDataType(evt.target.value)

  const itemRef = useRef()
  const dataTypeRef = useRef()
  const graphRef = useRef()
  const renderedGraphRef = useRef({})
  const viewportSize = useViewportSize()
  const graphChanged = async renderedGraph => {
    setRenderedGraph()
    await waitMs(400)
    setRenderedGraph(renderedGraph)
  }
  const logout = async () => {
    try {
      await axios.post('/api/logout')
      window.location.href = '/login'
    } catch {
      setShowError(true)
    }
  }
  const onErrorClose = () => setShowError(false)

  useEffect(() => {
    if ((!category || !item || !dataType) && category !== 'Reserve') return

    const { cur: prevGraphId } = renderedGraphRef.current

    const graphId =
      category === 'Reserve' ? 'Reserve' : `${category}_${item}_${dataType}`

    if (graphId === prevGraphId) return

    const lineProps =
      category === 'Reserve'
        ? graphData.Reserve
        : graphData[category][item][dataType]

    const updatedGraph = (
      <Graph
        hasLegend={graphId !== 'Reserve'}
        lineProps={lineProps}
        viewportSize={viewportSize}
      />
    )
    renderedGraphRef.current = { prev: prevGraphId, cur: graphId }

    if (!prevGraphId) setRenderedGraph(updatedGraph)
    else graphChanged(updatedGraph)
  }, [category, item, dataType, viewportSize])

  useEffect(() => {
    let curPath = location.pathname
    let curQuery = ''

    const queryObj = {}
    if (category) {
      queryObj.category = category

      if (item) {
        queryObj.item = item

        if (dataType) queryObj.dataType = dataType
      }
      curQuery = queryString.stringify(queryObj)
    }

    if (curQuery) curPath += '?' + curQuery

    history.replaceState(null, '', curPath)
  }, [category, item, dataType])

  return (
    <>
      <header className="content-frame">
        <h1>2024 Budget Graphs</h1>
        {!isDemo && (
          <Button
            className="tablet-and-larger"
            variation="outlined"
            onClick={logout}
          >
            Log Out
          </Button>
        )}
      </header>
      <div className="content-frame">
        <ul className="selectors">
          <li>
            <label>Category</label>
            <Select
              labelId="category-label"
              id="category"
              value={category}
              onChange={selectCategory}
            >
              <MenuItem key="" value=""></MenuItem>
              {categoryNames.map(n => (
                <MenuItem key={n} value={n}>
                  {n}
                </MenuItem>
              ))}
            </Select>
          </li>

          <Appear
            when={!!category && category !== 'Reserve'}
            motionRef={itemRef}
            motionCmpt={motion.li}
          >
            <label>Item</label>
            <Select
              labelId="item-label"
              id="item"
              value={item}
              onChange={selectItem}
            >
              <MenuItem key="" value=""></MenuItem>
              {itemList.map(n => (
                <MenuItem className="category-item" key={n} value={n}>
                  {customCapitalCase(n)}
                </MenuItem>
              ))}
            </Select>
          </Appear>

          <Appear when={!!item} motionRef={dataTypeRef} motionCmpt={motion.li}>
            <label>Type</label>
            <Select
              labelId="type-label"
              id="type"
              value={dataType}
              onChange={selectDataType}
            >
              <MenuItem key="" value=""></MenuItem>
              <MenuItem key="runningTotal" value="runningTotal">
                Running Total
              </MenuItem>
              <MenuItem key="monthlyCost" value="monthlyCost">
                Monthly Cost
              </MenuItem>
            </Select>
          </Appear>
        </ul>

        <div className="graph-container">
          <Appear when={!!renderedGraph} motionRef={graphRef}>
            {renderedGraph}
          </Appear>
        </div>

        {!isDemo && (
          <div className="bottom mobile-and-smaller">
            <Button variation="outlined" onClick={logout}>
              Log Out
            </Button>
          </div>
        )}
      </div>
      <ErrorDialog onClose={onErrorClose} show={showError} />
    </>
  )
}

export default App
