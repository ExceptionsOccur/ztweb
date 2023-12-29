<template>
    <div>
        <div style="font-size: 20px; font-weight: bold;">
            访问验证
        </div>
        <n-space style="margin-top: 10px;">
            <n-input size="large" v-for="_, index in passcode" maxlength="1" :key="index" :placeholder="''"
                @click="onfocus(index)" v-model:value="passcode[index]" :allow-input="onlyAllowNumber"
                :style="{ width: '40px' }" :ref="setItemRef" />
        </n-space>
    </div>
</template>

<script setup lang="ts">
import { onKeyStroke } from '@vueuse/core';
import { NSpace, NInput, InputInst } from 'naive-ui';
import { computed, onMounted, ref, watch } from 'vue';
import ValidCache from '../request/Valid';

const input_refs = ref<Array<InputInst>>([]);

const setItemRef = (el: any) => {
    if (el && input_refs.value.length < 6) {
        input_refs.value.push(el);
    }
}

const passcode = ref<Array<string>>(new Array(6).fill(""))
const onlyAllowNumber = (value: string) => !value || /^\d+$/.test(value)

const current_focus = ref(0)

const onfocus = (index: number) => {
    if (passcode.value[index] != "")
        input_refs.value[index].select()
    current_focus.value = index
}


const setNextFocus = () => {
    if (current_focus.value == 5) {
        ValidCache.validPasscode(code.value).then(() => { })
        return
    }
    current_focus.value += 1
    input_refs.value[current_focus.value].focus()
    if (passcode.value[current_focus.value] != "")
        input_refs.value[current_focus.value].select()

}
const setPreFocus = () => {
    if (current_focus.value == 0) return
    current_focus.value -= 1
    input_refs.value[current_focus.value].focus()
    if (passcode.value[current_focus.value] != "")
        input_refs.value[current_focus.value].select()
}

onMounted(() => {
    input_refs.value[0].focus()
})

onKeyStroke(['Backspace'], () => {

    if (code.value.length > 0 && !passcode.value[current_focus.value].length) {
        passcode.value[current_focus.value - 1] = ""
    }
})


const code = computed(() => passcode.value.join(""))

watch(code, (n: string, o: string) => {
    if (n.length >= o.length)
        setNextFocus()
    else
        setPreFocus()
})

</script>

<style scope></style>