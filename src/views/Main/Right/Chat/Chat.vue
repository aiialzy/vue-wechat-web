<template>
  <div class="chat-wrap">
    <right-header></right-header>
    <right-content></right-content>
    <right-footer></right-footer>
  </div>
</template>

<script>
import RightHeader from './RightHeader';
import RightContent from './RightContent';
import RightFooter from './RightFooter';

export default {
  name: 'Chat',
  components: {
    RightHeader,
    RightContent,
    RightFooter,
  }
}
</script>

<style scoped>
.chat-wrap {
  display: flex;
  flex-direction: column;
  height: 100%;
}
</style>