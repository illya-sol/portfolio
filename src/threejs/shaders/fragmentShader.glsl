#include <common>
 
uniform vec3 iResolution;
uniform float iTime;
varying vec2 vUv;
uniform sampler2D tDiffuse;

void mainImage( out vec4 fragColor, in vec2 fragCoord ) {
    vec2 uv = vUv / 1.0;
    fragColor = texture2D(tDiffuse, uv + vec2(sin(iTime*10.0 + uv.y * 10.0) * 0.01, 0.0));
}

void main() {
  mainImage(gl_FragColor, gl_FragCoord.xy);
}