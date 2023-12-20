<template>
    <n-card size="huge" hoverable style="width: 180px;height: 100px;"
        content-style="padding: 0;align-items: center;display: flex;justify-content: center">
        <!-- <n-space justify="center" v-for="(value, name) in card_data" :key="value">
            <div style="justify-content: right; display: flex; font-weight: bold;">{{ card_keys[name] }}:</div>
            <div style="justify-content: left; display: flex;">{{ value }}</div>
        </n-space> -->
        <div style="font-size: 20px; font-weight: bold;">{{ props.title }}</div>
    </n-card>
</template>

<script setup lang="ts">
// import { ref, onMounted } from "vue";


import { NCard } from 'naive-ui'
// import { CardType } from "../data/Types";
// const props = defineProps(["cardData", "title"])
const props = defineProps(["title"])

// const card_data = computed(() => props.cardData)

// interface anyObject {
//     [key: string]: string
// }

// var card_keys = ref<anyObject>({})
// const node_keys = {
//     naddress: "节点地址",
//     ntime: "节点时间",
//     nstatus: "在线状态",
//     nid: "节点id",
//     nversion: "节点版本"
// }
// const network_keys = {
//     ntotal: "网络数量",
//     nrecent: "最近加入网络",
//     cauths: "待授权接入数量",
//     nversion: "节点版本"
// }
// const controller_keys = {
//     ctotal: "控制器数量",
//     cmember: "成员数量",
//     cauths: "待授权节点数量",
//     cversion: "控制器版本"
// }
// const system_keys = {
//     cpu: "处理器",
//     load: "负载",
//     memory: "内存",
//     host: "系统",
//     uptime: "运行时间"
// }

// onMounted(() => {
//     if (props.title == CardType.node)
//         card_keys.value = node_keys
//     else if (props.title == CardType.network)
//         card_keys.value = network_keys
//     else if (props.title == CardType.controller)
//         card_keys.value = controller_keys
//     else if (props.title == CardType.system)
//         card_keys.value = system_keys
// })


</script>

<style scope lang="scss"></style>