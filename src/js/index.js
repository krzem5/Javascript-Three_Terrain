var scene,cam,renderer,controls,ambient,all_objects=[],NOISE=new ImprovedNoise().noise,SEED=Math.random(),SIZE=1
function init(){
	scene=new THREE.Scene()
	cam=new THREE.PerspectiveCamera(60,window.innerWidth/window.innerHeight,0.1,100000)
	cam.position.set(0,2000,0)
	cam.enablePan=false
	cam.lookAt(new THREE.Vector3(0,0,0))
	renderer=new THREE.WebGLRenderer({antialias:true})
	renderer.setSize(window.innerWidth,window.innerHeight)
	scene.background=new THREE.Color().setHSL(1,1,1)
	document.body.appendChild(renderer.domElement)
	ambient=new THREE.AmbientLight(0xececec,1)
	scene.add(ambient)
	var point=new THREE.SpotLight(0xffffff,1,0,1)
	point.position.set(17500,2000,0)
	point.target.position.set(0,0,0)
	point.castShadow=true
	point.shadow.mapSize.width=1024
	point.shadow.mapSize.height=1024
	point.shadow.camera.near=0.5
	point.shadow.camera.far=15000
	// scene.add(point)
	// scene.add(point.target)
	renderer.render(scene,cam)
	controls=new THREE.OrbitControls(cam,renderer.domElement)
	controls.target=new THREE.Vector3(0,0,0)
	window.addEventListener("resize",resize,false)
	window.addEventListener("keypress",onkeypress)
	requestAnimationFrame(render)
	generate()
}
function render(){
	for (var k of all_objects){
		k.update()
	}
	renderer.render(scene,cam)
	requestAnimationFrame(render)
}
function resize(){
	cam.aspect=window.innerWidth/window.innerHeight
	cam.updateProjectionMatrix()
	renderer.setSize(window.innerWidth,window.innerHeight)
}
function onkeypress(e){
}
function generate(){
	all_objects.push(Terrain())
}
Number.prototype.map=function(as,ae,bs,be){
	return (this-as)*(be-bs)/(ae-as)+bs
}
Number.prototype.mapC=function(as,ae,c1,c2){
	return [this.map(as,ae,c1[0]/360,c2[0]/360),this.map(as,ae,c1[1]/100,c2[1]/100),this.map(as,ae,c1[2]/100,c2[2]/100)]
}
window.addEventListener("DOMContentLoaded",init,false)
