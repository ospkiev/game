<template lang="html">
  <div class="main">
    <nuxt-link to="/game">
      <button
        type="button"
        name="button"
        class="button"
      >
        Lets start game
      </button>
    </nuxt-link>
  </div>
</template>

<script>
export default {
};
</script>

<style lang="scss" scoped>
  .main {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .button {
    border: 1px solid #222;
    color: #ffffff;
    background-color: grey;
    font-size: 40px;
    padding: 16px;
    cursor: pointer;
  }
</style>
