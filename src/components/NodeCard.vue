<template>
    <div>
        <n-space v-for="value, key in node_type" :key="key" style="align-items: center; margin-top: 5px;">
            <div v-if="(key as unknown) == 'config'">
                <div v-for="subValue, subKey in value['settings']" :key="subKey" style="margin-top: 5px;">
                    <div v-if="(subKey as unknown) == 'listeningOn'">
                        <div style="font-weight: bold;">{{ subKey }}:</div>
                        <n-space style="margin-left: 20px;">
                            <div v-for="ip in subValue" :key="ip">
                                <n-tag type="info" style="width: 100%;">{{ ip }}</n-tag>
                            </div>
                        </n-space>
                    </div>
                    <div v-else>
                        <n-space>
                            <div style="font-weight: bold;">{{ subKey }}:</div>
                            <n-tag type="info" style="width: 100%;">{{ subValue }}</n-tag>
                        </n-space>
                    </div>
                </div>
            </div>
            <div v-else-if="(key as unknown) == 'publicIdentity'">
                <n-space>
                    <div style="font-weight: bold;">{{ key }}:</div>
                    <n-tag type="info" style="width: 100%; white-space: break-spaces; height: 50px;">{{
                        value }}</n-tag>
                </n-space>
            </div>
            <div v-else>
                <n-space>
                    <div style="font-weight: bold;">{{ key }}:</div>
                    <n-tag type="info" style="width: 100%;">{{ value }}</n-tag>
                </n-space>
            </div>
            <n-divider style="margin-bottom: 0px; margin-top: 5px;" />
        </n-space>
    </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

import { NSpace, NTag, NDivider } from "naive-ui";

const props = defineProps(["nodeType"])

const node_type = computed(() => props.nodeType)

</script>

<style scope></style>