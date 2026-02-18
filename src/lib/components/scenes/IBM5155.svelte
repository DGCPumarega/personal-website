<script lang="ts">
  import { T, useTask } from "@threlte/core";
  import { GLTF, interactivity } from "@threlte/extras";

  let rotation = $state(0);

  useTask((delta) => {
    rotation += delta;
  });

  interactivity();
</script>

<T.PerspectiveCamera 
  position={[10,10,10]}
  oncreate={(ref) => {
    ref.lookAt(0,0,0)
  }}
/>
<T.AmbientLight intensity={0.5} />
<GLTF
  position={[0, 0, 0]}
  rotation.x={rotation} rotation.y={rotation} rotation.z={rotation}
  scale={2.35}
  url="/models/IBM5155.glb"
/>

<!--
<Text 
  text={"i luv compootr"}
  scale={7}
  position={[-2, -2.5, 0]}
  textAlign={"center"}
/>
-->
