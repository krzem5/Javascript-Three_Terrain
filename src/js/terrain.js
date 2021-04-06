function Terrain(){
	var g=new THREE.Group()
	g.rotation.x=Math.PI/2
	for (var y=0;y<SIZE;y++){
		for (var x=0;x<SIZE;x++){
			var c=Chunk(x-Math.floor(SIZE/2),y-Math.floor(SIZE/2))
			g.add(c.object)
			all_objects.push(c)
		}
	}
	scene.add(g)
	return {
		type: "terrain",
		chunkList: g,
		update: function(){
		}
	}
}
function get_noise(x,y){return NOISE(x,y,SEED)*600}
function Chunk(x,y){
	var mt=new THREE.MeshStandardMaterial({color:0xffffff,side:THREE.DoubleSide,flatShading:true,metalness:0.5,roughness:0.9,vertexColors:THREE.VertexColors})
	var mesh=new THREE.Mesh(new THREE.PlaneGeometry(1000,1000,10,10),mt)
	mesh.material.vertexColors=THREE.FaceColors
	mesh.reciveShadow=true
	mesh.castShadow=true
	mesh.position.set(x*1000,y*-1000,0)
	scene.add(mesh)
	for (var j=0;j<11;j++){
		for (var i=0;i<11;i++){
			mesh.geometry.vertices[j*11+i].z=get_noise(x+i/10,y+j/10)
		}
	}
	let p=0
	for (var f of mesh.geometry.faces){
		y=mesh.geometry.vertices[Math.floor(p)].z
		for (var i=0;i<3;i++){
			let r=y.map(-600,600,0,1)
			f.vertexColors[i]=new THREE.Color(r,r,r)
		}
		p+=0.5
	}
	mesh.geometry.faces[0].vertexColors=[new THREE.Color(0xff0000),new THREE.Color(0x00ff00),new THREE.Color(0x0000ff)]
	return {
		type: "chunk",
		object: mesh,
		v: true,
		update: function(){
			this.object.visible=this.v
		}
	}
}
