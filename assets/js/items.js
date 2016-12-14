const THREE = require('three')

class Items {

  constructor () {

  }

  square () {
    let geo = new THREE.PlaneGeometry(50, 50)
      , mat = new THREE.MeshLambertMaterial({ color: 0xFF0000, side: THREE.DoubleSide })
      , square = new THREE.Mesh(geo, mat)

    return square
  }

}

module.exports = Items
