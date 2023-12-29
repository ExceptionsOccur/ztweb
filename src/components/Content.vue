<script setup lang="ts">


import { NSpace, NDrawer, NDrawerContent } from 'naive-ui'
import type { DrawerPlacement } from 'naive-ui'
import MiniCard from './MiniCard.vue';
import ControllerCard from './ControllerCard.vue';
import NetworkCard from './NetworkCard.vue';
import NodeCard from './NodeCard.vue';
import SystemCard from './SystemCard.vue';
import { ref, onMounted } from 'vue'
import { CardType, NodeType, SystemInfoMini } from "../data/Types"
import NodeCache from '../request/Node';
import TypeDefault from '../data/TypesDefault'
import TypesDefault from '../data/TypesDefault';
import emiter from '../utils/bus';


const active = ref(false)
const placement = ref<DrawerPlacement>("left")

// const node_mini = ref<MiniNodeType>()
const node_type = ref<NodeType>(TypeDefault.NodeType())
const selected_card = ref<CardType>()
const system_data = ref<SystemInfoMini>(TypesDefault.SystemInfoMini())

onMounted(() => {
  NodeCache.getNodeStatus().then((res: NodeType) => {
    node_type.value = res
    // node_mini.value = TypesConvert.toMiniNodeType(node_type.value)
  })
  NodeCache.getSystemInfo().then(res => {
    system_data.value.cpu = res.cpu.cores + " cores" + " / " + res.cpu.name
    system_data.value.host = res.host.os + " " + res.host.platform + " " + res.host.arch + " " + res.host.version + " "
    system_data.value.memory = (res.memory.used / 1024 / 1024 / 1024).toFixed(1).toString() + "GB/" + (res.memory.total / 1024 / 1024 / 1024).toFixed(1).toString() + "GB, " + (100 - res.memory.usedPercent).toFixed(1).toString() + "% is FREE"
    system_data.value.load = "1min: " + res.load.load1 + ", 5min: " + res.load.load5 + ", 15min: " + res.load.load15
    system_data.value.uptime = (res.host.uptime / 60 / 60 / 24).toFixed(1).toString() + " 天"
  })
  emiter.on("member", (res: any) => {
    console.log(res);
  })
})



const activate = (place: DrawerPlacement, type: CardType) => {
  active.value = true
  placement.value = place
  selected_card.value = type
}





</script>

<template>
  <n-space vertical>
    <!-- <n-space justify="center">
                        <MiniCard :cardData="node_mini" :title="CardType.node" @click="activate('left', CardType.node)" />
                        <MiniCard :cardData="node_mini" :title="CardType.controller" @click="activate('right', CardType.controller)" />
                      </n-space>
                      <n-space justify="center">
                        <MiniCard :cardData="node_mini" :title="CardType.network" @click="activate('left', CardType.network)" />
                        <MiniCard :cardData="system_data" :title="CardType.system" @click="activate('right', CardType.system)" />
                      </n-space> -->
    <n-space justify="center">
      <MiniCard :title="CardType.node" @click="activate('left', CardType.node)" />
      <MiniCard :title="CardType.controller" @click="activate('right', CardType.controller)" />
    </n-space>
    <n-space justify="center">
      <MiniCard :title="CardType.network" @click="activate('left', CardType.network)" />
      <MiniCard :title="CardType.system" @click="activate('right', CardType.system)" />
    </n-space>
  </n-space>
  <n-drawer v-model:show="active" :width="550" :placement="placement">
    <n-drawer-content>
      <node-card :nodeType="node_type" v-if="selected_card == CardType.node" />
      <controller-card v-if="selected_card == CardType.controller" />
      <network-card :nodeType="node_type" v-if="selected_card == CardType.network" />
      <system-card :systemInfo="system_data" v-if="selected_card == CardType.system" />
    </n-drawer-content>
  </n-drawer>
</template>

<style scoped></style>
