<template lang="html">
  <b-container fluid>
    <b-row>
      <b-col
        cols="12"
        md="6"
        class="pt-4"
      >
        <div class="d-flex">
          <button
            type="button"
            name="button"
            class="button"
            @click="showModes"
          >
            {{ activeModeName ? activeModeName : 'Pick the mode' }}
            <modal
              :is-show="isShow"
              @change-mode="changeMode"
            />
          </button>
          <input
            ref="input"
            v-model="name"
            type="text"
            placeholder="Enter your name"
          >
          <button
            type="button"
            name="button"
            class="play"
            @click="startGame"
          >
            PLAY
          </button>
        </div>
        <div class="name">
          <div>
            <p>{{ name }}</p>
          </div>
        </div>
        <div class="main">
          <ul
            class="field"
          >
            <li
              v-for="el in activeModeParams.field"
              :key="el"
              class="cell_row"
              :style="{height: `${setHeight}%`}"
            >
              <ul class="d-flex h-100">
                <li
                  v-for="item in activeModeParams.field"
                  :id="`${el}${item}`"
                  :key="item"
                  :ref="`${el}${item}`"
                  class="cell"
                  :style="{width: `${setWidth}%`}"
                  :class="[userCell.includes(`${el}${item}`) ? 'catch_cell'
                    : computerCell.includes(`${el}${item}`) ? 'computer_cell' : '']"
                  @click="catchCell"
                />
              </ul>
            </li>
          </ul>
        </div>
      </b-col>
      <b-col
        cols="12"
        md="6"
        class="pt-4"
      >
        <h2 class="text-center mb-3">
          Best players
        </h2>
        <ul class="winners mx-auto">
          <li
            v-for="winner in winners"
            :key="winner.id"
          >
            {{ winner.winner }} : {{ winner.date }}
          </li>
        </ul>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapState } from 'vuex';
import modal from '~/components/modal/modal.vue';

export default {
  components: {
    modal,
  },
  data: () => ({
    isShow: false,
    activeModeName: '',
    activeModeParams: {},
    name: '',
    interval: null,
    computerCell: [],
    userCell: [],
    activeCell: '',
  }),
  computed: {
    ...mapState({
      winners: state => state.winners.winners,
    }),
    setWidth() {
      const { field = 1 } = this.activeModeParams;
      return 100 / field;
    },
    setHeight() {
      const { field = 1 } = this.activeModeParams;
      return 100 / field;
    },
  },
  watch: {
    computerCell: {
      handler() {
        if (this.computerCell.length > (this.activeModeParams.field
        * this.activeModeParams.field) / 2) {
          clearInterval(this.interval);
          alert('Cumputer win');
        }
      },
    },
    userCell: {
      handler() {
        if (this.userCell.length > (this.activeModeParams.field
        * this.activeModeParams.field) / 2) {
          clearInterval(this.interval);
          alert('User win');
        }
      },
    },
  },
  methods: {
    showModes() {
      this.isShow = !this.isShow;
    },
    changeMode(name, value) {
      this.activeModeName = name;
      this.activeModeParams = value;
    },
    startGame() {
      if (!this.activeModeName) {
        alert('pick the mode');
      } else {
        this.$refs.input.value = '';
        this.interval = setInterval(this.randomCell, this.activeModeParams.delay);
      }
    },
    included(item, targetArray, isIncluded) {
      if (isIncluded.includes(item)) {
        return;
      }
      targetArray.push(item);
    },
    catchCell(e) {
      const { id } = e.target;
      if (id === this.activeCell) {
        this.included(id, this.userCell, this.computerCell);
      }
    },
    randomNumber() {
      let num1 = Number((Math.random() * 10).toFixed(0));
      let num2 = Number((Math.random() * 10).toFixed(0));
      if (num2 === 0) {
        num2 += 1;
      }
      if (num1 === 0) {
        num1 += 1;
      }
      if (num1 > this.activeModeParams.field) {
        num1 -= this.activeModeParams.field;
      }
      if (num2 > this.activeModeParams.field) {
        num2 -= this.activeModeParams.field;
      }
      return `${num1}${num2}`;
    },
    randomCell() {
      const num = this.randomNumber();
      if (this.computerCell.includes(num) || this.userCell.includes(num)) {
        this.randomNumber();
      } else {
        this.activeCell = num;
        setTimeout(() => this.included(num, this.computerCell, this.userCell),
          this.activeModeParams.delay - 30);
      }
    },
  },
};
</script>

<style lang="scss" scoped>

* {
padding: 0;
margin: 0;
}

ul {
  list-style: none;;
}

.name {
  min-height: 40px;
}

.main {
  height: 70%;
  width: 70%;
  margin: 0 auto;
}

.button {
  background-color: grey;
  color: #ffffff;
  position: relative;
  width: 33%;
  text-transform: uppercase;
}

.play {
  width: 33%;
}

.winners {
  width: max-content;
  height: 400px;
  overflow-y: scroll;
}

.cell {
  border: .1px solid #222;
  transition: 0.3s ease-in-out;
  &_row {
    transition: 0.3s ease-in-out;
  }
}

.field {
  width: 100%;
  height: 100%;
  background-color: grey;
}

.active {
  left: 0;
}

.computer_cell {
  background-color: red;
}

.catch_cell {
  background-color: blue;
}
</style>
