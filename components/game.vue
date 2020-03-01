<template lang="html">
  <b-container fluid>
    <b-row>
      <b-col
        cols="12"
        md="6"
        class="pt-4"
      >
        <div class="">
          <button
            type="button"
            name="button"
            class="button"
            @click="showModes"
          >
            {{ activeModeName ? activeModeName : 'Pick the mode' }}
            <ul
              class="modes"
              :class="{active : isShow}"
            >
              <li
                v-for="(value, name) in modes"
                :key="name"
                @click="changeMode(name, value)"
              >
                <p class="modes-item">
                  {{ name }}
                </p>
                <ul>
                  <li
                    v-for="(el, title) in value"
                    :key="el"
                    class="modes-subitem"
                  >
                    {{ title }} : {{ el }}
                  </li>
                </ul>
              </li>
            </ul>
          </button>
          <input
            v-model="name"
            type="text"
            name=""
          >
          <button
            type="button"
            name="button"
            class="play"
          >
            PLAY
          </button>
          <div class="">
            <p>{{ name }}</p>
          </div>
          <div class="field">
            <div class="cell">
              1
            </div>
          </div>
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

export default {
  data: () => ({
    isShow: false,
    activeModeName: '',
    activeModeParams: {},
    name: '',
  }),
  computed: {
    ...mapState({
      modes: state => state.getMode.getMode,
      winners: state => state.winners.winners,
    }),
  },
  methods: {
    showModes() {
      this.isShow = !this.isShow;
    },
    changeMode(item, value) {
      this.activeModeName = item;
      this.activeModeParams = value;
      this.setWidth();
    },
    setWidth() {
      const cell = document.querySelector('cell');
      cell.style.setProperty('--width', '100px');
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

.button {
  background-color: grey;
  color: #ffffff;
  position: relative;
  width: 33%;
  text-transform: uppercase;
}

.modes {
  background-color: grey;
  top: 47px;
  position: absolute;
  right: 110%;
  width: 100%;
  text-align: left;
  transition: 0.3s ease-in-out;
  &-item {
    cursor: pointer;
    color: #222;
    font-size: 14px;
    text-transform: uppercase;
  }
  &-subitem {
    font-size: 10px;
  }
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
  display: inline-block;
  --width: 30px;
  height: 33px;
  background-color: #8FBC8F;
  text-align: center;
  vertical-align: middle;
}

.active {
  right: 0;
}
</style>
