<template lang="html">
  <game />
</template>

<script>
import game from '~/components/game.vue';

export default {
  components: {
    game,
  },
  async fetch({ store }) {
    await store.dispatch('getMode/fetch');
    await store.dispatch('winners/fetch');
  },
};
</script>

<style lang="css" scoped>
</style>
