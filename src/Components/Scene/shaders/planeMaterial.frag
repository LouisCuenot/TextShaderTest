varying vec2 vUv;
varying vec3 vPos;

uniform vec3 uCursorPos;
uniform float uIsHovering;
uniform float uTime;

void main() { 
    vec3 color = vec3(0.2,0.254,0.521);
    //vec3 color = mix(vec3(0.2,0.254,0.521),vec3(1.0),pow(vPos.z,2.0));
    //Effet Light, pas convaincu par la DA, faut changer vPos à modelPosition.xyz dans le vert

    //float distCursorPoint = 1.0 - distance(uCursorPos.x,vPos.x) * vUv.y;
    //color = vec3(distCursorPoint) * uIsHovering;
    float distanceFromCursor = distance(vPos.x, uCursorPos.x)*2.0;
    float waveFactor = (cos(distanceFromCursor)*0.5+0.5) * (step(-3.14,distanceFromCursor) * step(distanceFromCursor, 3.14) * 0.4 + 0.2) * 0.5 * uIsHovering;
    waveFactor = vUv.y - waveFactor + sin(uTime) * 0.05;
    waveFactor = step(0.3 * uIsHovering, waveFactor);
    color = mix(color, color*1.5, waveFactor);
    gl_FragColor = vec4(color,1.0);
}
  