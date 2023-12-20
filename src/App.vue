<script setup lang="ts">

import { onBeforeUnmount, onMounted } from 'vue'
import WebSocketConnection from './utils/websocket';
import api from './api/api';


var connection: any;

onMounted(() => {
  connection = new WebSocketConnection(api.ws)
})

onBeforeUnmount(() => {
  connection.closeConnection()
})


</script>

<template>
  <router-view />
</template>

<style scoped></style>
