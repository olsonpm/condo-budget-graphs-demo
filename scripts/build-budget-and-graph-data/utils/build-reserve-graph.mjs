const buildReserveGraph = reserveData => {
  const reserveGraphData = buildReserveGraphData(reserveData)
  const min = Math.min(0, ...reserveGraphData.flatMap(d => d.y))

  return {
    data: [
      {
        id: 'reserve',
        data: reserveGraphData,
      },
    ],
    yScale: { min },
  }
}

function buildReserveGraphData(reserveData) {
  return Object.entries(reserveData).map(([monthId, amt]) => ({
    x: monthId.slice('01-'.length),
    y: amt,
  }))
}

export default buildReserveGraph
