<template>
  <LogoArea/>
  <HeaderPart/>
</template>

<script>
import HeaderPart from './HeaderPart.vue';
import LogoArea from './LogoArea.vue';

export default {
  name: "NavBar",
  components: {
    LogoArea ,
    HeaderPart// Register the LogoArea component
  }
};
</script>