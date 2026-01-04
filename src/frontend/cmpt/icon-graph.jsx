const IconGraph = ({ height = 20, width = 25, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height={height}
    width={width}
    fill="white"
    viewBox="0 0 100 80"
    {...props}
  >
    <path
      d="M3 3v74h94"
      style={{
        fill: 'none',
        stroke: 'var(--fg)',
        strokeWidth: 6,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        strokeDasharray: 'none',
        strokeOpacity: 1,
      }}
    />
    <path
      d="m14.191 66.516 31.52-25.018 26.007 9.736L90.91 11.318"
      style={{
        fill: 'none',
        stroke: 'var(--fg)',
        strokeWidth: 6,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        strokeDasharray: 'none',
        strokeOpacity: 1,
      }}
    />
  </svg>
)

export default IconGraph
