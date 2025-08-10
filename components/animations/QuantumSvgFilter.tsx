const svgStyle = { width: 0, height: 0 };

export function QuantumSvgFilter() {

  return (
    <svg className='absolute' style={svgStyle}>
      <defs>
        <filter id='quantum-glow'>
          <feGaussianBlur in='SourceGraphic' stdDeviation='8' />
          <feColorMatrix
            values='
              1 0 0 0 0
              0 1 0 0 0
              0 0 1 0 0
              0 0 0 15 -7
            '
          />
        </filter>
      </defs>
    </svg>
  );
}