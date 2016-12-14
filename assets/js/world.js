const THREE = require('three')
const OrbitControls = require('three-orbit-controls')(THREE)
const Items = require('./items')

class World {

  constructor () {
    this.WIDTH = window.innerWidth
    this.HEIGHT = window.innerHeight
    this.VIEW_ANGLE = 45
    this.ASPECT = this.WIDTH / this.HEIGHT
    this.NEAR = 0.1
    this.FAR = 100
  }

  render () {
    this.renderer.render(this.scene, this.camera)
  }

  resize (width, height) {
    if (!this.renderer) return

    this.renderer.setViewport(0, 0, width, height)
    this.camera.aspect = width / height
    this.camera.updateProjectionMatrix()
  }

  start (gl) {
    this.renderer = new THREE.WebGLRenderer(
      { canvas: gl.canvas
      , antialias: true
      }
    )

    this.renderer.setClearColor(0x444444, 1.0)
    this.renderer.shadowMap.enabled = true
    this.renderer.shadowMap.type = THREE.PSCFSoftShadowMap

    this.camera = new THREE.PerspectiveCamera(this.VIEW_ANGLE, this.ASPECT, this.NEAR, this.FAR)
    this.camera.position.set(-200, 200, -200)
    this.camera.lookAt(0, 0, 0)

    this.controls = new OrbitControls(this.camera)

    this.scene = new THREE.Scene()

    this.light = new THREE.PointLight(0xFFFFFF)
    this.light.position.set(-20, 20, -20)
    this.scene.add(this.light)

    this.items = new Items()
    this.scene.add(this.items.square())
  }


}

module.exports = World
