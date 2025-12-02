<template>
  <div class="snowfall">
    <div v-for="i in 150" :key="i" class="snowflake"></div>
  </div>
</template>

<style scoped>
.snowfall {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 9999;
}

.snowflake {
  position: absolute;
  top: -10px;
  background: white;
  border-radius: 50%;
  opacity: 0.6;
  animation: fall linear infinite;
}

@keyframes fall {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(100vh);
  }
}
</style>

<script setup>
import { onMounted } from 'vue';

onMounted(() => {
  const snowflakes = document.querySelectorAll('.snowflake');
  snowflakes.forEach(snowflake => {
    const size = Math.random() * 3 + 1;
    snowflake.style.width = `${size}px`;
    snowflake.style.height = `${size}px`;
    snowflake.style.left = `${Math.random() * 100}%`;
    snowflake.style.animationDuration = `${Math.random() * 10 + 5}s`;
    snowflake.style.animationDelay = `${Math.random() * 5}s`;
    snowflake.style.opacity = `${Math.random() * 0.7 + 0.2}`;
  });
});
</script>
