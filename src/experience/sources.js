
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
        path: 'models/woodCabin/glTF/merged_house.glb'
    },
    {
        name: 'houseBakedTexture',
        type: 'texture',
        path: 'textures/bakedTextures/house_backed_texture.jpg'
    },
    {
        name: 'forestParticleModel',
        type: 'gltfModel',
        path: 'models/pine_trees/pine_trees.glb'
    },
    {
        name: 'interior',
        type: 'gltfModel',
        path: 'models/woodCabinInterior/cabin_interior.glb'
    },
    {
        name: 'groundModel',
        type: 'gltfModel',
        path: 'models/ground/ground.glb',
    },
    {
        name: 'groundBakedTexture',
        type: 'texture',
        path: 'textures/bakedTextures/ground_baked.jpg'
    },
    {
        name: 'terrainModel',
        type: 'gltfModel',
        path: 'models/terrain/terrain.glb',
    },
    {
        name: 'terrainTexture',
        type: 'texture',
        path: 'textures/bakedTextures/terrain_baked_colors.jpg'
    },
]