
export default [
    {
        name: 'environmentMapTexture',
        type: 'cubeTexture',
        path:
        [
            'textures/environmentMap/px.jpg',
            'textures/environmentMap/nx.jpg',
            'textures/environmentMap/py.jpg',
            'textures/environmentMap/ny.jpg',
            'textures/environmentMap/pz.jpg',
            'textures/environmentMap/nz.jpg',
        ]
    },
    {       
        name: 'grassColorTexture',
        type: 'texture',
        path:'textures/dirt/color.jpg'
    
    },
    {       
        name: 'grassNormalTexture',
        type: 'texture',
        path:'textures/dirt/normal.jpg'
    
    },
    {
        name: 'foxModel',
        type: 'gltfModel',
        path: 'models/Fox/glTF/Fox.gltf'
    },
    {
        name: 'woodCabinModel',
        type: 'gltfModel',
        path: 'models/woodCabin/glTF/cabin.glb'
    },
    {
        name: 'forestParticleModel',
        type: 'gltfModel',
        path: 'models/pine_trees/pine_trees.glb'
    },
    {
        name: 'forestParticleTexture',
        type: 'texture',
        path: 'textures/bakedTextures/pineTreeTexture.jpg'
    }
    
]