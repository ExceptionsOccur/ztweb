<template>
    <div style="height: 100%;">
        <n-card style="height: 48%;">
            <n-scrollbar style="max-height: 420px;">
                <n-card size="small" hoverable v-for="(item, index) in names_and_ips" :key="item.id"
                    style="margin-bottom: 10px;">
                    <n-space :align="'center'">
                        <n-space @click="select_network(index)">
                            <div v-if="item.accessable" style="width: 345px"
                                :class="item.state != 'OK' ? 'network-is-inactive' : ''">
                                <div style="font-weight: bold;">{{ item.name }}</div>
                                <div style="margin-top: 10px;">
                                    <n-tag type="info" v-for="ip in item.ips" :key="ip" style="margin-top: 5px;">{{ ip
                                    }}</n-tag>
                                </div>
                            </div>
                            <div v-else="item.accessable" style="width: 345px" class="network-is-inactive">
                                待授权接入
                            </div>
                        </n-space>
                        <div>
                            <n-button type="error" @click="leave_network(index)">退出</n-button>
                        </div>
                    </n-space>
                </n-card>
            </n-scrollbar>
            <template #footer>
                <n-space justify="center">
                    <n-input size="small" maxlength="16" placeholder="网络id" :allow-input="input_rule" v-model:value="nwid"
                        show-count />
                    <n-button type="success" size="small" :disabled="join_btn_enable" @click="join_network">加入网络</n-button>
                </n-space>
            </template>
        </n-card>
        <n-card style="height: 48%; margin-top: 20px;">
            <n-scrollbar style="max-height: 420px;">
                <div v-for="(value, key) in selected_network" :key="key" style="margin-top: 5px;">
                    <div v-if="key == 'assignedAddresses'">
                        <div style="font-weight: bold;">{{ key }}:</div>
                        <div v-for="subValue in value">
                            <n-space>
                                <n-tag type="info" style="font-weight: bold; margin-left: 20px; margin-top: 5px;">{{
                                    subValue }}</n-tag>
                            </n-space>
                        </div>
                    </div>
                    <div v-else-if="key == 'dns'">
                        <div style="font-weight: bold;">{{ key }}:</div>
                        <div v-for="subValue, subKey in value" :key="subKey">
                            <n-space style="align-items: center;">
                                <div style="font-weight: bold; margin-left: 20px;">{{ subKey }}:</div>
                                <n-tag v-for="dnsServer in subValue" type="info" :key="dnsServer">{{ dnsServer }}</n-tag>
                            </n-space>
                        </div>
                    </div>
                    <div v-else-if="key == 'multicastSubscriptions'">
                        <div style="font-weight: bold;">{{ key }}:</div>
                        <div v-for="subValue, index in value" style="margin-top: 5px;">
                            <n-space>
                                <div
                                    style="font-weight: bold; margin-left: 20px; display: flex;align-items: center;justify-content: center;height: 100%;">
                                    {{ parseInt(index as string) + 1 }}:</div>
                                <n-tag type="info" style="height: 36px;">
                                    <div v-for="v, k in subValue" :key="v">
                                        {{ k }}:{{ v }}
                                    </div>
                                </n-tag>
                            </n-space>
                        </div>
                    </div>
                    <div v-else-if="key == 'routes'">
                        <div style="font-weight: bold;">{{ key }}:</div>
                        <div v-for="subValue, index in value" style="margin-top: 5px;">
                            <n-space>
                                <div
                                    style="font-weight: bold; margin-left: 20px; display: flex;align-items: center;justify-content: center;height: 100%;">
                                    {{ parseInt(index as string) + 1 }}:</div>
                                <n-tag type="info" style="height: 70px;">
                                    <div v-for="v, k in subValue" :key="v" style="height: 16px;">
                                        {{ k }}:{{ v }}
                                    </div>
                                </n-tag>
                            </n-space>
                        </div>
                    </div>
                    <div v-else>
                        <n-space style="align-items: center;">
                            <div style="font-weight: bold;">{{ key }}:</div>
                            <n-tag type="info">{{ value }}</n-tag>
                        </n-space>
                    </div>
                    <n-divider style="margin-bottom: 0px; margin-top: 5px;" />
                </div>
            </n-scrollbar>
        </n-card>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";


import { NCard, NScrollbar, NButton, NSpace, NInput, NTag, NDivider } from "naive-ui";
import Network from "../request/Network";
import { MemberState, NetworkType } from "../data/Types";
import TypesDefault from "../data/TypesDefault";
import { whenever } from "@vueuse/core";


interface NetworkState {
    name: string,
    ips: Array<string>,
    state: string,
    accessable: boolean
    id: string
}

const props = defineProps(["nodeType"])
const node_type = computed(() => props.nodeType)

const network_detail_list = ref<Array<NetworkType>>([])

const status_keys = ref<Array<string>>()
const networks_class_array = ref<Array<NetworkType>>([])
const names_and_ips = ref<Array<NetworkState>>([])
const selected_network = ref<NetworkType>()
const join_btn_enable = ref(true)
const nwid = ref("")


onMounted(() => {
    init()
})

const init = () => {
    networks_class_array.value = []
    names_and_ips.value = []
    Network.getAllNetworks().then(res => {
        network_detail_list.value = res
        for (let index = 0; index < network_detail_list.value.length; index++) {
            networks_class_array.value.push(TypesDefault.NetworkType())
        }
        for (let index = 0; index < network_detail_list.value.length; index++) {
            names_and_ips.value.push({ name: network_detail_list.value[index].name, ips: network_detail_list.value[index].assignedAddresses, state: network_detail_list.value[index].status, accessable: network_detail_list.value[index].status == MemberState.OK, id: network_detail_list.value[index].id })
        }
        if (network_detail_list.value.length > 0) {
            status_keys.value = Object.keys(network_detail_list.value[0])
            selected_network.value = network_detail_list.value[0];
        }
    })
}

whenever(nwid, () => {
    if (nwid.value.length == 16)
        join_btn_enable.value = false
    else join_btn_enable.value = true
})

const select_network = (index: number) => {
    selected_network.value = network_detail_list.value[index];
}
const leave_network = (index: number) => {
    Network.leaveNetwork(network_detail_list.value[index], node_type.value).then(() => {
        names_and_ips.value = names_and_ips.value.slice(0, index).concat(names_and_ips.value.slice(index + 1))
        networks_class_array.value = networks_class_array.value.slice(0, index).concat(networks_class_array.value.slice(index + 1))
        init()
    })
}
const input_rule = (value: string) => {
    let tmp = value.toLowerCase()
    for (let index = 0; index < tmp.length; index++) {
        if (tmp[index] < '0' || tmp[index] > 'f')
            return false
    }
    return true
}

const join_network = () => {
    Network.joinNetwork(nwid.value).then(() => {
        init()
    })
}


</script>

<style scope>
.network-is-inactive {
    color: gray;
}
</style>