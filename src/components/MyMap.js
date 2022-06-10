import React, { useState } from 'react'
import { Map, Marker } from 'pigeon-maps'

export function MyMap() {
  const [hue, setHue] = useState(0)
  const color = `hsl(${hue % 360}deg 39% 70%)`

    return (
      <Map defaultCenter={[45.5152, -122.6784]} defaultZoom={11}>
        <Marker 
          width={50}
          anchor={[45.5152, -122.6784]} 
          color={color} 
          onClick={() => setHue(hue + 20)} 
        />
      </Map>
  )
}

export default React.memo(MyMap);