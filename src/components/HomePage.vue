<script setup>
</script>

<template>
    <RouterLink to="/history" class="bg-color cursor-pointer min-h-screen bg-gray-100 items-center flex justify-center">
        <h1 class="text-5xl font-bold text-white mb-8">Добро пожаловать в <span class="text-neutral-600 animate-gradient-text">MaksonchikQuest!</span></h1>
    </RouterLink>  
</template>

<style scoped>
  .animate-gradient-text {
  background: linear-gradient(90deg, #ff0080, #ff8c00, #40e0d0, #ff0080);
  background-size: 300%;
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  animation: gradientAnimation 10s ease-in-out infinite;
}

@keyframes gradientAnimation {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.bg-color {
  background-color: #111827;
}

</style>