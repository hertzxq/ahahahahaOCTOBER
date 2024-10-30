
<script setup>
import { ref, onMounted } from 'vue';
import config from '../cfg.json';
  
      const playerLives = ref(config.playerLives);
      const currentRoom = ref(1);
      const monsterRoom = ref(Math.floor(Math.random() * config.rooms) + 1);
      const gameOver = ref(false);
      const gameResult = ref('');
      const logs = ref([])
      let date = new Date(2011, 0, 1, 0, 0, 0, 0)

      const logEvent = (event) => {
        console.log(`${date.toISOString()} - ${event}`);
      };
  
      const startMonsterMovement = () => {
        setInterval(() => {
          const previousRoom = monsterRoom.value;
          monsterRoom.value = Math.floor(Math.random() * config.rooms) + 1;
          logEvent(`Монстр переместился из комнаты ${previousRoom} в комнату ${monsterRoom.value}`);
          
          if (monsterRoom.value === currentRoom.value) {
            handleMonsterEncounter();
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


    const reloadPage = () => {
        location.reload();
      };
  
      onMounted(() => {
        startMonsterMovement();
      });

  
  </script>
  
  <template>
    <div class="flex justify-center items-center min-h-screen bg-gray-900 bg-dungeon-pattern p-4 text-gray-100">
      <div class="bg-gray-800 bg-opacity-90 shadow-xl rounded-lg border border-gray-600 p-10 max-w-4xl w-full text-center text-shadow-md">
        <h2 class="text-2xl font-bold text-amber-500 tracking-wide mb-4">
          Локация: <span class="text-amber-400">{{ currentRoom }}</span>
        </h2>
        <p class="text-lg mb-8">
          Осталось жизней: <span class="font-semibold text-red-500">{{ playerLives }}</span>
        </p>
  
        <transition name="fade">
          <div v-if="gameOver" key="gameOver">
            <p class="text-2xl text-red-600 font-bold tracking-wide">
              {{ gameResult }}
            </p>
            <button @click="reloadPage" class="mt-8 px-6 py-3 bg-red-700 rounded-lg text-white font-semibold hover:bg-red-800 transition-all shadow-md">
              🔄 Начать заново?
            </button>
          </div>
        </transition>
  
        <transition name="fade">
          <div v-if="!gameOver" key="game">
            <div class="flex flex-col gap-4 mt-10">
              <button class="action-btn" @click="searchDresser">
                🔍 Обыскать комод
              </button>
              <button class="action-btn" @click="inspectThings">
                🔎 Осмотреть вещи
              </button>
              <button class="action-btn" @click="findExit">
                🚪 Искать выход из подвала
              </button>
            </div>
            <div class="code-block mt-4">
              <p>Монстр переместился в комнату {{ monsterRoom }}</p>
              <p>Игрок столкнулся с монстром. Осталось жизней: {{ playerLives }}</p>
              <p>Игрок перешёл в комнату {{ currentRoom }}</p>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </template>
  
  <style scoped>
  .bg-dungeon-pattern {
  background-image: url('path/to/dungeon-pattern.jpg'); 
  background-size: cover;
}

.code-block {
    background-color: #282c34; 
    color: #ffffff; 
    font-family: 'Courier New', Courier, monospace; 
    padding: 15px; 
    border-radius: 5px; 
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2); 
    overflow-x: auto; 
}

.code-block p {
    margin: 0; 
    line-height: 1.5;
}

.text-shadow-md {
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.action-btn {
  display: inline-block;
  padding: 12px 24px;
  font-size: 1.125rem;
  font-weight: bold;
  color: #f1f1f1;
  background-color: #4a4a4a;
  border: 2px solid #6b6b6b;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.6);
}

.action-btn:hover {
  background-color: #5c5c5c;
  border-color: #848484;
  transform: scale(1.05);
}

  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.3s ease;
  }
  .fade-enter-to, .fade-leave-to {
    opacity: 0;
  }
  </style>
  
  