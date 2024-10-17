<template>
    <div>
        <div class="text-center mt-24">
            <h1 class="text-3xl">Добро пожаловать в SurnameQuest!</h1>
            <p class="text-lg">Вы находитесь в комнате {{ currentRoom }}. У вас осталось жизней: {{ playerLives }}</p>
      <p v-if="gameOver">{{ gameResult }}</p>
      <div v-else>
        <button class="m-12" @click="searchDresser">Обыскать комод</button>
        <button class="m-12" @click="inspectThings">Осмотреть вещи</button>
        <button class="m-12" @click="findExit">Осмотреть подвал на наличие выхода</button>
      </div>
    </div>
</div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import config from '../cfg.json';
  
  export default {
    setup() {
      // Настройки игры
      const playerLives = ref(config.playerLives);
      const currentRoom = ref(1);
      const monsterRoom = ref(Math.floor(Math.random() * config.rooms) + 1);
      const gameOver = ref(false);
      const gameResult = ref('');
  
      const logEvent = (event) => {
        console.log(`${new Date().toISOString()} - ${event}`);
      };
  
      const startMonsterMovement = () => {
        setInterval(() => {
          monsterRoom.value = Math.floor(Math.random() * config.rooms) + 1;
          logEvent(`Монстр переместился в комнату ${monsterRoom.value}`);
          
          if (monsterRoom.value === currentRoom.value) {
            playerLives.value--;
            logEvent(`Игрок столкнулся с монстром. Осталось жизней: ${playerLives.value}`);
            if (playerLives.value <= 0) {
              endGame('Вы проиграли!');
            }
          }
        }, config.monsterSleepTime);
      };
  
      const searchDresser = () => takeAction('обыскали комод');
      const inspectThings = () => takeAction('осмотрели вещи');
      const findExit = () => takeAction('искали выход');
  
      const takeAction = (action) => {
        logEvent(`Игрок ${action}`);
        if (Math.random() > 0.5) {
          playerLives.value--;
          logEvent(`Игрок потерял жизнь. Осталось жизней: ${playerLives.value}`);
          if (playerLives.value <= 0) {
            endGame('Вы проиграли!');
            return;
          }
        } else {
          currentRoom.value++;
          logEvent(`Игрок перешёл в комнату ${currentRoom.value}`);
          if (currentRoom.value > config.rooms) {
            endGame('Вы выиграли!');
          }
        }
      };
  
      const endGame = (result) => {
        gameOver.value = true;
        gameResult.value = result;
        logEvent(result);
      };
  
      onMounted(() => {
        startMonsterMovement();
      });
  
      return {
        playerLives,
        currentRoom,
        gameOver,
        gameResult,
        searchDresser,
        inspectThings,
        findExit
      };
    }
  };
  </script>
  
  <style scoped>
  /* Добавьте свои стили здесь */
  </style>
  