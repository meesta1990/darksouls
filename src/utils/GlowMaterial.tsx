import { Color, ShaderMaterial, Vector3 } from "three";

const GlowMaterial = new ShaderMaterial({
    uniforms: {
        viewVector: { value: new Vector3() },
        glowColor: { value: new Color(0x00ffff) }, // Colore dell'aura
        coefficient: { value: 2 }, // Coefficiente dell'aura
        power: { value: 4 }, // Potenza dell'aura
        texture: { value: null }
    },
    vertexShader: `
    uniform vec3 viewVector;
    varying float intensity;
    varying vec2 vUv;

    void main() {
      vec3 vNormal = normalize(normalMatrix * normal);
      vec3 vNormel = normalize(normalMatrix * viewVector);
      intensity = pow(0.6 - dot(vNormal, vNormel), 6.0);
      vUv = uv;

      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
    fragmentShader: `
      uniform vec3 glowColor;
      uniform float coefficient;
      uniform float power;
      uniform sampler2D textureMap;
      varying float intensity;
      varying vec2 vUv;
    
      void main() {
        vec3 glow = glowColor * coefficient;
        vec3 baseColor = vec3(1.0); // Colore di base del modello
        float glowIntensity = pow(power - intensity, 3.0);
        vec4 texColor = texture2D(textureMap, vUv);
        vec3 finalColor = baseColor + glow * glowIntensity;
        finalColor *= texColor.rgb;
    
        gl_FragColor = vec4(finalColor, 1.0);
      }
    `,
    transparent: true
});

export default GlowMaterial;