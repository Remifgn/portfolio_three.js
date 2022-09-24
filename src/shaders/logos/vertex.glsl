#define PI 3.14159265358979323846

uniform float uSize;
uniform float uRotationSpeed;
uniform float uMix;
uniform float uTime;
uniform vec3 uOrigin;

attribute float aScale;
attribute vec3 aNewPosition;

varying vec3 vColor;

float random (vec2 st) {
    return fract(sin(dot(st.xy,
        vec2(12.9898,78.233)))*
        43758.5453123);
}

void main()
{
    /**
        * Position
    */
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    vec3 currentPosition = modelPosition.xyz;

    modelPosition.xyz = mix(currentPosition, aNewPosition, clamp(uMix, 0.0, 1.0));

    float new_x = modelPosition.x*cos(uTime * uRotationSpeed) - modelPosition.z*sin(uTime * uRotationSpeed);
    float new_z = modelPosition.z*cos(uTime * uRotationSpeed) + modelPosition.x*sin(uTime * uRotationSpeed);

    vec3 pointCoordonates = vec3(new_x, modelPosition.y, new_z) + uOrigin;
    vec4 viewPosition =  viewMatrix * (vec4(pointCoordonates, 1));
    // vec4 viewPosition =  viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    gl_Position = projectedPosition;



    /**
        * Size
    */
    float strength = distance(pointCoordonates, uOrigin);
    gl_PointSize = clamp(uSize * aScale * strength * 0.25 * (sin(uTime + random(currentPosition.xy) * 2.0 * PI ) + 1.0) * 0.001, 10.0, 60.0);
    //(abs(sin(uTime)) + 0.5) * 10.0;

    //gl_PointSize *= (1.0 / - viewPosition.z);

    vColor = color;
}