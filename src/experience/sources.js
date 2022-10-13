
export default [
    {
        name: 'environmentMapTexture',
        type: 'cubeTexture',
        path:
        [
            'textures/environmentMap/px.png',
            'textures/environmentMap/nx.png',
            'textures/environmentMap/py.png',
            'textures/environmentMap/ny.png',
            'textures/environmentMap/pz.png',
            'textures/environmentMap/nz.png',
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
        path: 'models/woodCabin/glTF/woodCabin.glb'
    },
    {
        name: 'houseBakedTexture',
        type: 'texture',
        path: 'textures/bakedTextures/woodCabin.jpg'
    },
    {
        name: 'forestParticleModel',
        type: 'gltfModel',
        path: 'models/pine_trees/pineTreeModelWithMaterial.glb'
    },
    {
        name: 'houseInteriorBakedTexture',
        type: 'texture',
        path: 'textures/bakedTextures/interior_structure_4k.jpg'
    },
    {
        name: 'interiorStructure',
        type: 'gltfModel',
        path: 'models/woodCabinInterior/interior_structure_new.glb'
    },
    {
        name: 'interiorObjectsBakedTexture',
        type: 'texture',
        path: 'textures/bakedTextures/interior_object_4k.jpg'
    },
    {
        name: 'interiorObjectModel',
        type: 'gltfModel',
        path: 'models/woodCabinInterior/interior_object_new.glb'
    },
    {
        name: 'groundModel',
        type: 'gltfModel',
        path: 'models/ground/ground.glb',
    },
    {
        name: 'groundBakedTexture',
        type: 'texture',
        path: 'textures/bakedTextures/ground_baked_1.jpg'
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
    {
        name: 'flowerModel',
        type: 'gltfModel',
        path: 'models/flower/flower.glb',
    },
    {
        name: 'satelliteModel',
        type: 'gltfModel',
        path: 'models/satellite/satelite2.glb',
    },
    {
        name: 'planetModel',
        type: 'gltfModel',
        path: 'models/planet/planetMerged.glb',
    },
    // {
    //     name: 'codeProFont',
    //     type: 'ttfFont',
    //     path: 'fonts/SourceCodePro-Italic.ttf',
    // },
    {
        name: 'helvetica',
        type: 'jsonFont',
        path: 'fonts/helvetiker_regular.typeface.json',
    },
    {
        name: 'logosModel',
        type: 'gltfModel',
        path: 'models/logos/logos.glb',
    },


]