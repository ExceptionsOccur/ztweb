<template>
    <div style="height: 100%;">
        <n-card style="height: 360px;" :segmented="{
            content: true,
            footer: 'soft'
        }" footer-style="padding: 10px; margin 0px">
            <n-scrollbar style="height: 270px;">
                <n-list hoverable clickable>
                    <n-list-item v-for="value, index in network_detail_list" :key="value.nwid" @click="selectNetwork(index)"
                        style="height: 55px;" :class="controller_selected_index == index ? 'controller-selected' : ''">
                        <n-Space :wrap="false">
                            <n-thing style="width: 140px">
                                <template #description>
                                    <div>{{ value.nwid }}</div>
                                </template>
                            </n-thing>
                            <n-thing content-style="margin-top: 10px;" style="margin-left: 15px;">
                                <template #description style="width: 50%;">
                                    <div>{{ value.name }}</div>
                                </template>
                            </n-thing>
                        </n-Space>
                        <template #suffix>
                            <n-space justify="center">
                                <n-badge type="info" :value="badge_number[value.nwid]" show-zero>
                                    <n-button type="info" @click="clickMember(value.nwid)">成员</n-button>
                                </n-badge>
                                <n-button type="error" @click="clickDeleteBtn(index, value)">删除</n-button>
                            </n-space>
                        </template>
                    </n-list-item>
                </n-list>
            </n-scrollbar>
            <template #footer>
                <div style="display: flex; justify-content: center;" class="n-card-action">
                    <n-button type="primary" @click="openCreateModal()">新增</n-button>
                </div>
            </template>
        </n-card>
        <n-card style="height: 645px; margin-top: 20px;">
            <n-scrollbar style="height: 600px;">
                <n-space vertical>
                    <n-space justify="center">
                        <n-card size="small" style="width: 250px;">
                            <n-input v-model:value="selected_network.name" type="text" maxlength="15" size="small"
                                show-count @focus="handleNetworkNameFocus" @blur="handleNetworkNameBlur" />
                            <template #header>
                                <n-space>
                                    <div style="font-size: 14px;">网络名称</div>
                                    <div style="margin-top: 5px;"
                                        :class="network_name_update_state == UpdateState.none ? '' : (network_name_update_state == UpdateState.updating ? 'loading' : 'check')" />
                                </n-space>
                            </template>
                        </n-card>
                        <n-card size="small" style="width: 150px;">
                            <n-checkbox v-model:checked="selected_network.private">私有</n-checkbox>
                            <template #header>
                                <n-space>
                                    <div style="font-size: 14px;">网络性质</div>
                                    <div style="margin-top: 5px;"
                                        :class="private_update_state == UpdateState.none ? '' : (private_update_state == UpdateState.updating ? 'loading' : 'check')" />
                                </n-space>
                            </template>
                        </n-card>
                    </n-space>

                    <n-space justify="center">
                        <n-card size="small" style="width: 412px;">
                            <template #header>
                                <n-space>
                                    <div style="font-size: 14px;">IPv4地址分配模式</div>
                                    <div style="margin-top: 5px;"
                                        :class="ipv4_update_state == UpdateState.none ? '' : (ipv4_update_state == UpdateState.updating ? 'loading' : 'check')" />
                                </n-space>
                            </template>
                            <div v-if="selected_network.v4AssignMode.zt">
                                <n-space justify="center">
                                    <div style="width: 120px; justify-content: center; display: flex;">起始地址</div>
                                    <div style="width: 120px; justify-content: center; display: flex;">结束地址</div>
                                </n-space>
                                <n-space v-for="pool, _ in selected_network.ipAssignmentPools" :key="pool.ipRangeStart">
                                    <n-icon size="20" style="margin-left: 20px;" @click="deleteIpPool()">
                                        <trash />
                                    </n-icon>
                                    <div style="width: 120px; justify-content: center; display: flex;margin-left: 15px;">{{
                                        pool.ipRangeStart
                                    }}</div>
                                    <div style="width: 120px; justify-content: center; display: flex;">{{ pool.ipRangeEnd }}
                                    </div>
                                </n-space>
                                <n-divider style="margin-bottom: 0px;" />
                            </div>
                            <n-checkbox v-model:checked="selected_network.v4AssignMode.zt"
                                style="margin-top: 12px;">范围内自动分配</n-checkbox>
                            <div v-if="selected_network.v4AssignMode.zt" style="margin-top: 10px;">
                                <n-space justify="center">
                                    <n-button-group>
                                        <n-button ghost :type="quick_assign_ip ? 'success' : 'default'"
                                            @click="quick_assign_ip = true">
                                            快速配置
                                        </n-button>
                                        <n-button ghost :type="!quick_assign_ip ? 'success' : 'default'"
                                            @click="quick_assign_ip = false">
                                            手动配置
                                        </n-button>
                                    </n-button-group>
                                </n-space>
                                <n-space style="margin-top: 5px; padding-top: 10px;" justify="center">
                                    <n-button v-if="quick_assign_ip" v-for="ip in ip_ranges" :key="ip" class="ip-ranges"
                                        hoverable @click="selected_quick_ip(ip)">
                                        {{ ip[0] }}
                                    </n-button>
                                    <n-space v-if="!quick_assign_ip" justify="center" style="margin-top: 10px;">
                                        <n-input v-model:value="ip_range_start" style="width: 150px;" placeholder="起始ip" />
                                        <div style="margin-top: 5px;">~</div>
                                        <n-input v-model:value="ip_range_end" style="width: 150px;" placeholder="结束ip" />
                                    </n-space>
                                </n-space>
                            </div>
                            <template #footer>
                                <n-space justify="center">
                                    <n-button type="info" @click="updateControllerIPv4">提交</n-button>
                                </n-space>
                            </template>
                        </n-card>
                        <n-card size="small" style="width: 412px;">
                            <n-checkbox v-model:checked="selected_network.v6AssignMode.zt" disabled>范围内自动分配
                                <n-tooltip :show-arrow="false" trigger="hover">
                                    <div>暂时不可用</div>
                                    <template #trigger>
                                        <n-icon>
                                            <Help />
                                        </n-icon>
                                    </template>
                                </n-tooltip>

                            </n-checkbox>
                            <!-- <n-space v-if="edit_ipv6_zt" justify="center">
                                <n-input style="width: 150px;" placeholder="起始ip" v-model:value="ipv6_assign_start" />
                                <div style="margin-top: 5px;">~</div>
                                <n-input style="width: 150px;" placeholder="结束ip" v-model:value="ipv6_assign_end" />
                            </n-space> -->
                            <n-checkbox v-model:checked="selected_network.v6AssignMode['6plane']">ZeroTier 6PLANE (/80
                                routable for each
                                device)</n-checkbox>
                            <div v-if="selected_network.v6AssignMode['6plane']">{{ plane6_ip }}</div>
                            <n-checkbox v-model:checked="selected_network.v6AssignMode.rfc4193">ZeroTier RFC4193 (/128 for
                                each device)</n-checkbox>
                            <div v-if="selected_network.v6AssignMode.rfc4193">{{ rfc_ip }}</div>
                            <template #header>
                                <n-space>
                                    <div style="font-size: 14px;">IPv6地址分配模式</div>
                                    <div style="margin-top: 5px;"
                                        :class="ipv6_update_state == UpdateState.none ? '' : (ipv6_update_state == UpdateState.updating ? 'loading' : 'check')" />
                                </n-space>
                            </template>
                            <template #footer>
                                <n-space justify="center">
                                    <n-button type="info" @click="updateControllerIPv6">提交</n-button>
                                </n-space>
                            </template>
                        </n-card>

                        <n-card size="small" style="width: 412px;">
                            <template #header>
                                <n-space>
                                    <div style="font-size: 14px;">路由</div>
                                    <div style="margin-top: 5px;"
                                        :class="routes_update_state == UpdateState.none ? '' : (routes_update_state == UpdateState.updating ? 'loading' : 'check')" />
                                </n-space>
                            </template>
                            <n-space justify="center">
                                <div style="width: 110px; justify-content: center; display: flex; align-items: center;">目的地址
                                    <n-tooltip :show-arrow="false" trigger="hover">
                                        <template #trigger>
                                            <n-icon style="margin-left: 5px;">
                                                <Help />
                                            </n-icon>
                                        </template>
                                        自动生成的都是掩24位，需要按需修改
                                    </n-tooltip>
                                </div>
                                <div style="width: 110px; justify-content: center; display: flex; align-items: center;">下一跳
                                    <n-tooltip :show-arrow="false" trigger="hover">
                                        <template #trigger>
                                            <n-icon style="margin-left: 5px;">
                                                <Help />
                                            </n-icon>
                                        </template>
                                        一般不用填写，除非自定义了某台设备作为网关
                                    </n-tooltip>
                                </div>
                            </n-space>
                            <n-space v-for="route, _ in selected_network.routes" :key="route.target">
                                <n-icon size="20" style="margin-left: 20px;" @click="deleteRoute()">
                                    <trash />
                                </n-icon>
                                <div style="width: 120px; justify-content: center; display: flex;margin-left: 15px;">
                                    {{ route.target }}</div>
                                <div style="width: 120px; justify-content: center; display: flex;">{{ route.via }}</div>
                            </n-space>
                            <n-divider style="margin-bottom: 0px;" />
                            <n-space justify="center" style="margin-top: 10px;">
                                <n-input v-model:value="route_target" style="width: 150px;" placeholder="目的地址" />
                                <n-input v-model:value="route_via" style="width: 150px;" placeholder="下一跳" />
                            </n-space>
                            <template #footer>
                                <n-space justify="center">
                                    <n-button type="info" @click="updateControllerRoutes">提交</n-button>
                                </n-space>
                            </template>
                        </n-card>

                    </n-space>
                </n-space>
            </n-scrollbar>
        </n-card>
        <n-modal v-model:show="create_network_modal">
            <n-card transform-origin="center" style="width: 350px" :bordered="false">
                <n-space>
                    <div style="padding-top: 5px;">网络名称：</div>
                    <n-input :placeholder="'请输入网络名称'" maxlength="15" show-count style="width: 200px;"
                        v-model:value="input_network_name" />
                </n-space>
                <template #footer>
                    <n-space justify="center">
                        <n-button size="small" @click="closeCreateModal">取消</n-button>
                        <n-button size="small" style="margin-left: 50px;" type="success"
                            @click="confirmToCreateNetwork">确认新建</n-button>
                    </n-space>
                </template>
            </n-card>
        </n-modal>
        <n-drawer v-model:show="member_drawer" :width="480">
            <n-card v-for="member, _ in member_settings_list" :key="member.id" content-style="padding-bottom: 5px">
                <n-space justify="center">
                    <n-card size="small">
                        <template #header>
                            <div style="font-size: 14px;">成员地址</div>
                        </template>
                        <n-space justify="center">
                            <div style="font-size: 14px;">{{ member.id }}</div>
                        </n-space>
                    </n-card>
                    <n-card size="small">
                        <template #header>
                            <div style="font-size: 14px;">授权接入</div>
                        </template>
                        <n-space justify="center">
                            <n-switch size="small" v-model:value="member.authorized"
                                @update:value="updateMemberAuthorized(member)" />
                        </n-space>
                    </n-card>
                    <n-card size="small">
                        <template #header>
                            <div style="font-size: 14px;">软件版本</div>
                        </template>
                        <n-space justify="center">
                            <div style="font-size: 14px;">{{ member.version }}</div>
                        </n-space>
                    </n-card>
                </n-space>
                <n-space justify="center" style="margin-top: 5px;">
                    <n-card size="small" style="width: 320px;">
                        <template #header>
                            <n-space>
                                <div style="font-size: 16px;">IP地址</div>
                                <n-input size="tiny" placeholder="新增ip" v-model:value="member_new_ip" />
                                <n-button type="success" size="tiny" @click="addIpToMember(member)">添加</n-button>
                            </n-space>
                        </template>
                        <n-space justify="center">

                            <div v-for="ip, index in member.ipAssignments" :key="ip"
                                style="width: 280px; display: flex; justify-content: center;">
                                <div>
                                    <n-icon style="margin-right: 5px;" @click="deleteMemberIP(member, index)">
                                        <Trash />
                                    </n-icon>
                                    {{ ip }}
                                </div>
                            </div>
                        </n-space>
                    </n-card>
                </n-space>
                <template #footer>
                    <n-space justify="center">
                        <n-button type="error" size="small" @click="deleteMember(member)">删除</n-button>
                    </n-space>
                </template>
            </n-card>
        </n-drawer>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { NCard, NSpace, NScrollbar, NIcon, NInput, NButton, NList, NListItem, NThing, NModal, NBadge, NDrawer, NCheckbox, NDivider, NSwitch, NButtonGroup, NTooltip } from "naive-ui";
import { Trash, Help } from "@vicons/tabler"
import Controller from "../request/Controller";
import { ControllerType, MemberSettings, MemberCount } from "../data/Types";
import TypeDefault from "../data/TypesDefault";
import TypesCovert from "../data/TypesConvert"
import { FunctionArgs, set, useThrottleFn, whenever } from "@vueuse/core";
import { delArrayIndex, executeMoreTimes, get6PlaneIPStr, getRFCIPStr, ptrWhenDel, randomIPRange } from "../utils/utils";


// ------------start: 生命周期钩子------------
onMounted(() => {
    Controller.getAllControllerType().then((res: Array<ControllerType>) => {
        network_detail_list.value = res
        selected_network.value = network_detail_list.value[0];
    })
    Controller.countMembers().then((res) => {
        badge_number.value = res
    })
})
// ------------end: 生命周期钩子------------



// ------------start: 组件全局变量------------
const selected_network = ref(TypeDefault.ControllerType())

enum UpdateState {
    none,
    updating,
    done
}

// 动画更新控制变量
const network_name_update_state = ref(UpdateState.none)
const private_update_state = ref(UpdateState.none)
const ipv4_update_state = ref(UpdateState.none)
const ipv6_update_state = ref(UpdateState.none)
const routes_update_state = ref(UpdateState.none)

// ------------end: 组件全局变量------------



// ------------start: 控制器列表展示------------
const network_detail_list = ref<ControllerType[]>([])
// badge
const badge_number = ref<MemberCount>({})

const create_network_modal = ref(false)
const input_network_name = ref("")

const controller_selected_index = ref(0)
whenever(controller_selected_index, () => {
    set(route_target, "")
    set(route_via, "")
    set(ip_range_start, "")
    set(ip_range_end, "")
})

const selectNetwork = (index: number) => {
    controller_selected_index.value = index
    selected_network.value = network_detail_list.value[index];
}

// 控制器新增和删除操作
const closeCreateModal = () => {
    create_network_modal.value = false
}

const openCreateModal = () => {
    input_network_name.value = ""
    create_network_modal.value = true
}

const clickDeleteBtn = (index: number, ct: ControllerType) => {
    Controller.deleteController(ct.nwid).then((res: ControllerType) => {
        if (res.nwid == ct.nwid) {
            network_detail_list.value = delArrayIndex(network_detail_list.value, index)
            controller_selected_index.value = ptrWhenDel(network_detail_list.value, index)
            selected_network.value = network_detail_list.value[controller_selected_index.value];
        }
    })
}

const confirmToCreateNetwork = () => {
    Controller.createController(input_network_name.value).then((res: ControllerType) => {
        if (res.name == input_network_name.value)
            create_network_modal.value = false
        Controller.getAllControllerType().then(res => {
            network_detail_list.value = res
        })
        Controller.countMembers().then(res => {
            badge_number.value = res
        })
    })
}
// ------------end: 控制器列表展示------------


// ------------start: 控制器更新：名称和性质------------
const network_name_watch = ref("")
const handleNetworkNameFocus = () => {
    network_name_watch.value = selected_network.value.name
}
const handleNetworkNameBlur = () => {
    if (selected_network.value.name != "" && selected_network.value.name != network_name_watch.value) {
        network_name_update_state.value = UpdateState.updating
        Controller.updateControllerNameSetting(selected_network.value).then((res) => {
            if (res.name == selected_network.value.name) {
                network_name_update_state.value = UpdateState.done
                setTimeout(() => {
                    network_name_update_state.value = UpdateState.none
                }, 3000);
            }
        })
    }
}
//@ts-ignore
const private_watch = watch(() => selected_network.value.private, (n: boolean, o: boolean) => {
    if ((n || o) && !(n && o)) {
        throttlenFn(() => {
            private_update_state.value = UpdateState.updating
            Controller.updateControllerPrivateSetting(selected_network.value).then((res) => {
                if (res.private == selected_network.value.private) {
                    private_update_state.value = UpdateState.done
                    setTimeout(() => {
                        private_update_state.value = UpdateState.none
                    }, 3000);
                }
            })
        }, 1000)
    }
})
// ------------end: 控制器更新：名称和性质------------

// ------------start: 控制器更新：ipv4------------

const ip_ranges = ref()
const quick_assign_ip = ref(true)
// 更新时看情况需要同步更新路由
const route_target = ref("")
const route_via = ref("")
const ip_range_start = ref("")
const ip_range_end = ref("")

whenever(() => selected_network.value.v4AssignMode.zt, () => {
    if (quick_assign_ip.value)
        ip_ranges.value = executeMoreTimes(randomIPRange, 6)
})

const plane6_ip = ref<string>()
whenever(() => selected_network.value.v6AssignMode["6plane"], () => {
    plane6_ip.value = get6PlaneIPStr(selected_network.value.nwid)
})

const rfc_ip = ref<string>()
whenever(() => selected_network.value.v6AssignMode.rfc4193, () => {
    rfc_ip.value = getRFCIPStr(selected_network.value.nwid)
})
const deleteIpPool = () => {
    selected_network.value.ipAssignmentPools = []
    Controller.updateControllerIPv4Setting(selected_network.value).then(() => { })
}
const selected_quick_ip_range = ref<string[]>([])
const selected_quick_ip = (ip: string[]) => {
    selected_quick_ip_range.value = ip
}

const updateControllerIPv4 = () => {
    if (quick_assign_ip.value) {
        selected_network.value.ipAssignmentPools = []
        selected_network.value.ipAssignmentPools.push({
            ipRangeStart: selected_quick_ip_range.value[1],
            ipRangeEnd: selected_quick_ip_range.value[2]
        })
    } else {
        if (ip_range_start.value == "" || ip_range_end.value == "") return
        selected_network.value.ipAssignmentPools = []
        selected_network.value.ipAssignmentPools.push({
            ipRangeStart: ip_range_start.value,
            ipRangeEnd: ip_range_end.value
        })

    }
    Controller.updateControllerIPv4Setting(selected_network.value).then(() => { })
}
// ------------end: 控制器更新：ipv4------------

// ------------start: 控制器更新：ipv6------------

// const ipv6_assign_start = ref("")
// const ipv6_assign_end = ref("")
const updateControllerIPv6 = () => {
    // if (ipv6_assign_start.value == "" || ipv6_assign_end.value == "") return
    // if (selected_network.value.v6AssignMode.zt)
    //     selected_network.value.ipAssignmentPools.push({
    //         ipRangeStart: ipv6_assign_start.value, ipRangeEnd: ipv6_assign_end.value
    //     })
    Controller.updateControllerIPv6Setting(selected_network.value).then(() => { })
}   // end: 控制器更新：ipv6

// ------------start: 控制器更新：路由------------
const deleteRoute = () => {
    selected_network.value.routes = []
    Controller.updateControllerRouteSetting(selected_network.value).then(() => { })
}

const updateControllerRoutes = () => {
    selected_network.value.routes = []
    selected_network.value.routes.push({
        target: route_target.value,
        via: route_via.value
    })

    Controller.updateControllerRouteSetting(selected_network.value).then(() => { })
}
// ------------end: 控制器更新：路由------------

//------------start: 成员管理------------

const member_settings_list = ref<MemberSettings[]>([])
const member_drawer = ref(false)
const clickMember = (network_id: string) => {
    member_settings_list.value = []
    member_drawer.value = true
    Controller.getAllMembersTypeByNwid(network_id).then(res => {
        res.map(item => {
            member_settings_list.value.push(TypesCovert.toMemberSettings(item))
        })
    })
}


const updateMemberAuthorized = (member: MemberSettings) => {
    throttlenFn(() => {
        Controller.updateMember(member)
    }, 1000)
}

//------删除成员-------
const deleteMember = (ms: MemberSettings) => {
    throttlenFn(() => {
        Controller.deleteMember(ms)
    }, 1000)
}

//------更新成员ip------
const member_new_ip = ref("")
const addIpToMember = (ms: MemberSettings) => {
    throttlenFn(() => {
        ms.ipAssignments.push(member_new_ip.value)
        Controller.updateMember(ms)
    }, 1000)
}

const deleteMemberIP = (ms: MemberSettings, index: number) => {
    throttlenFn(() => {
        if (ms.ipAssignments.length == 1) ms.ipAssignments = []
        else if (ms.ipAssignments.length == index + 1) ms.ipAssignments.pop()
        else ms.ipAssignments = ms.ipAssignments.slice(0, index).concat(ms.ipAssignments.slice(index + 1))
        Controller.updateMember(ms)
    }, 1000)
}



// ------------功能函数------------

const throttlenFn = (fn: FunctionArgs<any[], void>, time: number) => {
    useThrottleFn(fn, time)()
}
// ------------end: 成员管理------------
</script>

<style scope>
.n-card.n-card--content-segmented>.n-card__content,
.n-card.n-card--content-soft-segmented>.n-card__content {
    padding-bottom: 10px;
}

.n-list .n-list-item .n-list-item__suffix {
    margin: 0;
    flex: none;
}

.ip-ranges .n-card__content,
.n-card>.n-card__footer {
    padding: 5px;
}

.ip-ranges .n-card__content:first-child,
.n-card>.n-card__footer:first-child {
    padding: 2px 20px 0px 20px
}




.loading {
    width: 10px;
    height: 10px;
    border: 1px solid gray;
    border-top-color: transparent;
    border-radius: 100%;

    animation: circle infinite 0.75s linear;
}

@keyframes circle {
    0% {
        transform: rotate(0);
    }

    100% {
        transform: rotate(360deg);
    }
}

.check {
    width: 10px;
    height: 5px;
    border: 1px solid green;
    border-top-width: 0px;
    border-right-width: 0px;
    transform: rotate(-45deg);
    animation: check 0.75s linear;
}


@keyframes check {
    0% {
        opacity: 0;
    }

    50% {
        opacity: 0.5;
    }

    100% {
        opacity: 1;
    }
}

.controller-selected {
    background-color: rgba(209, 209, 212, 0.34);
}
</style>