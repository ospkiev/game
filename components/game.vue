<template lang="html">
  <b-container fluid>
    <b-row>
      <b-col
        cols="12"
        md="6"
        class="pt-4"
      >
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
          @click="startGame()"
        >
          PLAY
        </button>
        <div class="">
          <p>{{ name }}</p>
        </div>
        <div class="main">
          <ul class="field">
            <li
              v-for="el in activeModeParams.field"
              :key="el"
              class="cell_row"
              :style="{height: `${setHeight}%`}"
            >
              <ul class="d-flex h-100">
                <li
                  v-for="item in activeModeParams.field"
                  :key="item"
                  class="cell"
                  :style="{width: `${setWidth}%`}"
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
  methods: {
    showModes() {
      this.isShow = !this.isShow;
    },
    changeMode(name, value) {
      this.activeModeName = name;
      this.activeModeParams = value;
    },
    startGame() {
      this.$refs.input.value = '';
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
  background-color: #8FBC8F;
  display: flex;
  justify-content: center;
  align-items: center;
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
  top: 25px;
}
</style>
