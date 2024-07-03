import React, { useEffect } from 'react'
import { Text, shaderMaterial } from '@react-three/drei'
import { extend, useFrame } from '@react-three/fiber'

import planeMaterialFrag from './shaders/planeMaterial.frag?raw'
import planeMaterialVert from './shaders/planeMaterial.vert?raw'
import { useRef } from 'react'
import { MathUtils, Vector2, Vector3 } from 'three'

const PlaneMaterial = shaderMaterial(
  {
    uTime:0,
    uCursorPos:new Vector3(0,0),
    uIsHovering:0
  },
  planeMaterialVert,
  planeMaterialFrag,
)

extend({PlaneMaterial})

const Scene = () => {

  const text = "SCENTED CONNECTIONS"


  const textRef = useRef()
  const cursorPosRef = useRef(new Vector3(0,0,0))
  const isHoveringRef = useRef(0)



  

  useFrame((state, delta)=>{
    if(textRef.current.material){
      textRef.current.material.uniforms.uTime.value += delta
      textRef.current.material.uniforms.uCursorPos.value = textRef.current.material.uniforms.uCursorPos.value.lerp(cursorPosRef.current,0.05)
      textRef.current.material.uniforms.uIsHovering.value = MathUtils.lerp(textRef.current.material.uniforms.uIsHovering.value, isHoveringRef.current, 0.05)
    }
  })

  return (
    <>
    
          <Text
            ref={textRef} 
            fontSize={1.5}
            font='/Heathergreen-XPPG.ttf'
            onPointerEnter={()=>isHoveringRef.current = 1}
            onPointerMove={(e)=> cursorPosRef.current = e.point} 
            onPointerLeave={()=>isHoveringRef.current = 0}
            textAlign='center'
          >
              {text}
            <planeMaterial 
              uTime={0} 
              uCursorPos={new Vector3(0,0,0)}
              uIsHovering={0}
            />
          </Text>


    </>
  )
}

export default Scene