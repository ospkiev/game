<template lang="html">
  <b-container
    fluid
  >
    <b-row>
      <b-col
        cols="12"
        md="8"
        class="pt-4"
      >
        <div class="d-flex input_wrapper">
          <b-button
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
          </b-button>
          <b-form-input
            ref="input"
            v-model="name"
            class="px-1"
            type="text"
            placeholder="Enter your name"
          />
          <b-button
            type="button"
            name="button"
            class="play"
            @click="play"
          >
            {{ playButton }}
          </b-button>
        </div>
        <div class="name">
          <div class="d-flex justify-content-between">
            <p class="date pl-3">
              {{ date }}
            </p>
            <p class="pr-3">
              {{ name }}
            </p>
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
              <ul
                class="d-flex h-100"
                @click="catchCell"
              >
                <li
                  v-for="item in activeModeParams.field"
                  :id="`${el}${item}`"
                  :key="item"
                  :ref="`${el}${item}`"
                  class="cell"
                  :style="{width: `${setWidth}%`}"
                  :class="[userCell.includes(`${el}${item}`) ? 'catch_cell'
                    : computerCell.includes(`${el}${item}`)
                      || activeCell === `${el}${item}` ? 'computer_cell' : '']"
                />
              </ul>
            </li>
          </ul>
        </div>
      </b-col>
      <b-col
        cols="12"
        md="4"
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
    <b-modal
      id="modal-center"
      ref="winner-modal"
      hide-footer
      centered
      title="Winner"
    >
      <p class="my-4">
        {{ `${name} winner` }}
      </p>
    </b-modal>
  </b-container>
</template>

<script>
import { mapActions, mapState } from 'vuex';
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
    timer: null,
    computerCell: [],
    userCell: [],
    activeCell: '',
    playButton: 'Play',
    date: null,
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
          this.end('Computer');
        }
      },
    },
    userCell: {
      handler() {
        if (this.userCell.length > (this.activeModeParams.field
        * this.activeModeParams.field) / 2) {
          this.end(this.name);
        }
      },
    },
  },
  created() {
    this.time();
  },
  methods: {
    ...mapActions({
      add: 'winners/add',
    }),
    async updateWinnres() {
      const error = await this.add({ id: Date.now(), winner: this.name, date: this.date });
      if (error) {
        alert('error', error);
      }
    },
    showModes() {
      this.isShow = !this.isShow;
    },
    changeMode(name, value) {
      this.activeModeName = name;
      this.activeModeParams = value;
    },
    startPosition() {
      this.playButton = 'Play';
      this.computerCell = [];
      this.userCell = [];
      this.name = '';
      this.activeModeParams = {};
      clearTimeout(this.timer);
    },
    end(winner) {
      clearTimeout(this.timer);
      this.name = `${winner}`;
      this.$refs['winner-modal'].show();
      this.playButton = 'Play again';
      this.activeModeName = '';
      this.activeCell = '';
      this.updateWinnres();
    },
    play() {
      if (this.playButton === 'Play again' || this.playButton === 'Stop') {
        this.startPosition();
      } else {
        this.start();
      }
    },
    start() {
      if (!this.activeModeName) {
        alert('pick the mode');
      } else if (!this.name) {
        alert('Enter your name');
      } else {
        this.$refs.input.value = '';
        this.playButton = 'Stop';
        this.randomCell();
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
        this.activeCell = '';
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
        this.randomCell();
      } else if (this.activeModeName) {
        this.activeCell = num;
        setTimeout(() => this.included(num, this.computerCell, this.userCell),
          this.activeModeParams.delay - 50);
        this.timer = setTimeout(() => this.randomCell(), this.activeModeParams.delay);
      }
    },
    time() {
      setInterval(() => {
        this.date = new Date().toLocaleString().substr(0, 20);
      }, 1000);
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

.input_wrapper {
  padding: 30px 10px 10px;
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
  background-color: #1B3950;
  color: #ffffff;
  position: relative;
  width: 33%;
  text-transform: uppercase;
  min-width: max-content;
  padding: 0 10px;
}

.play {
  width: 33%;
  background-color: #1B3950;
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
  min-height: 280px;
  background-color: #85D6CE;
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

.date {
  width: max-content;
}
</style>
