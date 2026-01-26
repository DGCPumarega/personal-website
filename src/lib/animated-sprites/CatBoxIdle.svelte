<script lang="ts">
  import { T, Canvas} from "@threlte/core";
  import { AnimatedSpriteMaterial } from "@threlte/extras";
</script>

<div class="h-8 w-8">
  <Canvas>
    <T.Sprite
      scale={[7,7,1]}
    >
      <AnimatedSpriteMaterial
        textureUrl="/src/lib/assets/cat-box-idle.png"
        totalFrames={4}
        fps={4}
      />
    </T.Sprite>
  </Canvas>
</div>
