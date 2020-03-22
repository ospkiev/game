<template lang="html">
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
    </li>
  </ul>
</template>

<script>
import { mapState } from 'vuex';

export default {
  props: {
    isShow: {
      type: Boolean,
      dafault: false,
    },
  },
  computed: {
    ...mapState({
      modes: state => state.getmode.getmode,
    }),
  },
  methods: {
    changeMode(name, value) {
      this.$emit('change-mode', name, value);
    },
  },
};
</script>

<style lang="scss" scoped>

.modes {
  background-color: #1B3950;
  top: 37px;
  position: absolute;
  left: -500px;
  width: 100%;
  text-align: left;
  transition: 0.3s ease-in-out;
  &-item {
    cursor: pointer;
    color: #ffffff;
    font-size: 14px;
    text-transform: uppercase;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
    padding: 5px 0;
  }
  &-subitem {
    font-size: 10px;
  }
}
</style>
