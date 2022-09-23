#define PI 3.14159265358979323846

uniform float uSize;
uniform float uMix;
uniform float uTime;
uniform vec3 uOrigin;

attribute float aScale;
attribute vec3 aNewPosition;

varying vec3 vColor;

void main()
{
    /**
        * Position
    */
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    vec3 currentPosition = modelPosition.xyz;

    modelPosition.xyz = mix(currentPosition, aNewPosition, uMix);

    float new_x = modelPosition.x*cos(uTime) - modelPosition.z*sin(uTime);
    float new_z = modelPosition.z*cos(uTime) + modelPosition.x*sin(uTime);

    vec3 pointCoordonates = vec3(new_x, modelPosition.y, new_z) + uOrigin
    vec4 viewPosition =  viewMatrix * (vec4(pointCoordonates, 1));
    // vec4 viewPosition =  viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    gl_Position = projectedPosition;



    /**
        * Size
    */
    float strength = distance(pointCoordonates, uOrigin);
    gl_PointSize = uSize * aScale * strength;
    //(abs(sin(uTime)) + 0.5) * 10.0;

    gl_PointSize *= (1.0 / - viewPosition.z);

    vColor = color;
}