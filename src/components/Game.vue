
<script setup>
import { ref, onMounted } from 'vue';
import config from '../cfg.json';
  
      const playerLives = ref(config.playerLives);
      const currentRoom = ref(1);
      const monsterRoom = ref(Math.floor(Math.random() * config.rooms) + 1);
      const gameOver = ref(false);
      const gameResult = ref('');

      let date = new Date(2011, 0, 1, 0, 0, 0, 0)

      const logEvent = (event) => {
        console.log(`${date.toISOString()} - ${event}`);
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

      const reloadPage = () => {
        location.reload();
      };
  
  </script>
  
  <template>
    <div class="min-h-screen bg-gray-100 flex items-center justify-center">
      <div class="bg-white shadow-lg rounded-lg p-12 max-w-4xl w-full text-center px-32">
        <h1 class="text-5xl font-bold text-gray-800 mb-8">Добро пожаловать в <span class="text-neutral-600 animate-gradient-text">SurnameQuest!</span></h1>
        <p class="text-xl text-gray-600 mb-6">Вы находитесь в комнате <span class="font-semibold">{{ currentRoom }}</span>. У вас осталось жизней: <span class="font-semibold">{{ playerLives }}</span></p>
        <transition name="fade">
          <div v-if="gameOver" key="gameOver">
              <p class="text-red-600 font-bold text-2xl">{{ gameResult }}</p>
            <button @click="reloadPage" class="mt-8 rounded-md border border-transparent py-2 px-4 text-center text-sm transition-all text-gray-600 hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">Начать заново?</button>
          </div>
        </transition>
  
        <transition name="fade">
          <div v-if="!gameOver" key="game">
            <button class="m-6 rounded-md bg-neutral-600 py-3 px-8 text-base font-semibold text-white transition-all hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-black-500 focus:ring-opacity-50 active:bg-gray-600 disabled:bg-gray-400 disabled:opacity-50"
              @click="searchDresser">Обыскать комод</button>
            <button class="m-6 rounded-md bg-neutral-600 py-3 px-8 text-base font-semibold text-white transition-all hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-black-500 focus:ring-opacity-50 active:bg-gray-600 disabled:bg-gray-400 disabled:opacity-50"
              @click="inspectThings">Осмотреть вещи</button>
            <button class="m-6 rounded-md bg-neutral-600 py-3 px-8 text-base font-semibold text-white transition-all hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-black-500 focus:ring-opacity-50 active:bg-gray-600 disabled:bg-gray-400 disabled:opacity-50"
              @click="findExit">Осмотреть подвал на наличие выхода</button>
          </div>
        </transition>
      </div>
    </div>
  </template>
  
  <style scoped>
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.3s ease;
  }
  .fade-enter-to, .fade-leave-to {
    opacity: 0;
  }

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

  </style>
  
  