<template>
    <div v-for="value, key in systemInfo" :key="value">
        <n-space>
            <div>{{ show_keys[key] }}: </div>
            <div>{{ value }}</div>
        </n-space>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue";

import { NSpace } from "naive-ui";
// import NodeCache from "../request/NodeCache";
const props = defineProps(["systemInfo"])

interface anyObject {
    [key: string]: string
}

const show_keys: anyObject = {
    host: "系统",
    cpu: "CPU",
    memory: "内存",
    uptime: "启动时间",
    load: "负载"
}

const system_info = computed({
    get: () => props.systemInfo,
    set: (v) => { system_info.value = v }
})

onMounted(() => {
    // NodeCache.getSystemInfo().then(res => {
    console.log(system_info.value);

    // })
})

</script>

<style scope></style>