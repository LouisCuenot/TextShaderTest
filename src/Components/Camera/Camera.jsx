import { PerspectiveCamera } from '@react-three/drei'
import React, { useEffect, useState } from 'react'

const Camera = () => {




  return (
    <PerspectiveCamera makeDefault position={[0,0,5]} fov={60} />
  )
}

export default Camera