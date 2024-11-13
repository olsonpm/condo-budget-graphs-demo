import graphData from '@data/graph.json'
import { mapValues } from '../fp-utils'

export default mapValues(v => Object.keys(v))(graphData)
