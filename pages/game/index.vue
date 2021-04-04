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
    await store.dispatch('getmode/fetch');
    await store.dispatch('winners/fetch');
  },
};
</script>

<style lang="scss" scoped>
</style>
