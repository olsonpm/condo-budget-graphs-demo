const buildReserveGraph = (reserveData, year) => {
  const reserveGraphData = buildReserveGraphData(reserveData)

  return {
    data: [
      {
        id: `${year}_reserve_actual`,
        data: reserveGraphData,
      },
    ],
  }
}

function buildReserveGraphData(reserveData) {
  return Object.entries(reserveData).map(([monthId, amt]) => ({
    x: monthId.slice('01-'.length),
    y: amt,
  }))
}

export default buildReserveGraph
