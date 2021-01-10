<template lang="html">
  <div class="main">
    <h1 class="start">
      Nimble
    </h1>
    <nuxt-link to="/game">
      <h6>Lets start the game</h6>
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
  flex-direction: column;
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
  content: 'Nimble';
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
@media(max-width: 992px) {
  font-size: 50px;
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
