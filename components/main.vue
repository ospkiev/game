<template lang="html">
  <div class="main">
    <nuxt-link to="/game">
      <h1 class="start">
        Lets start game
      </h1>
    </nuxt-link>
  </div>
</template>

<script>
export default {
};
</script>

<style lang="scss" scoped>
.main {
  margin: 0;
  padding: 0;
  background-color: #85D6CE;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  min-height: 100vh;
}

h1 {
  color: #fff;
  font-family: 'Inter', sans-serif;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-size: 140px;
  position: relative;

&:after,
&:before {
  content: 'Lets start game';
  position: absolute;
  top: 0;
  color: #fff;
  background-color: #85D6CE;
  overflow: hidden;
}

&:after {
  left: 2px;
  text-shadow: -1px 0 #ff1b1b;
  animation: glitch1 2s infinite ease;
}

&:before {
  left: -2px;
  text-shadow: 1px 0 #2124ff;
  animation: glitch2 10s infinite ease;
}
}

@keyframes glitch1 {
$steps: 25;
@for $i from 0 through $steps {
  #{percentage($i*(1/$steps))} {
    $top: random(100);
    $bottom: random(101 - $top);
    clip-path: inset(#{$top}% 0 #{$bottom}% 0);
  }
}
}

@keyframes glitch2 {
$steps: 25;
@for $i from 0 through $steps {
  #{percentage($i*(1/$steps))} {
    $top: random(100);
    $bottom: random(101 - $top);
    clip-path: inset(#{$top}% 0 #{$bottom}% 0);
  }
}
}
</style>
