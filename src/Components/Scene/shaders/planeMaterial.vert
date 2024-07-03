varying vec2 vUv;
varying vec3 vPos;
uniform float uTime;
uniform vec3 uCursorPos;
uniform float uIsHovering;

void main() {
  vUv = uv;
   
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  modelPosition.z+=sin(uTime*2.0+vUv.x*4.0)*0.02;
  modelPosition.z+= pow(max(0.0, 1.0 - distance(position, uCursorPos) * 0.4),2.0) * 0.8 * uIsHovering;
  modelPosition.y+=sin(uTime*2.0-vUv.x*4.0)*0.01;
  vPos = position.xyz;
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 clipPosition = projectionMatrix * viewPosition;
  
  gl_Position = clipPosition;
}
  