<template>
  <div class="vue-easymde-editor">
    <textarea ref="textArea"></textarea>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted, watch } from 'vue'
import EasyMDE, { Options } from 'easymde'

export default defineComponent({
  name: 'Editor',
  props: {
    modelValue: {
      type: String,
      default: ''
    },
    options: {
      type: Object as () => Options,
      default: () => ({})
    }
  },
  emits: ['update:modelValue', 'change', 'blur'],
  setup (props, { emit }) {
    const textArea = ref<null | HTMLTextAreaElement>(null)
    let easyMDEInstance: EasyMDE | null = null
    const innerValue = ref(props.modelValue || '')

    watch(() => props.modelValue, (newValue) => {
      if (easyMDEInstance) {
        if (newValue !== innerValue.value) {
          easyMDEInstance.value(newValue || '')
        }
      }
    })

    onMounted(() => {
      if (textArea.value) {
        const config: Options = {
          ...(props.options || {}),
          element: textArea.value,
          initialValue: innerValue.value
        }
        easyMDEInstance = new EasyMDE(config)
        easyMDEInstance.codemirror.on('change', () => {
          if (easyMDEInstance) {
            const updatedValue = easyMDEInstance.value()
            innerValue.value = updatedValue
            emit('update:modelValue', updatedValue)
            emit('change', updatedValue)
          }
        })
        easyMDEInstance.codemirror.on('blur', () => {
          if (easyMDEInstance) {
            emit('blur')
          }
        })
      }
    })

    onUnmounted(() => {
      if (easyMDEInstance) {
        easyMDEInstance.cleanup()
      }
      easyMDEInstance = null
    })

    const clear = () => {
      if (easyMDEInstance) {
        easyMDEInstance.value('')
      }
    }

    const getMDEInstance = () => {
      return easyMDEInstance
    }

    return {
      textArea,
      clear,
      getMDEInstance
    }
  }
})
</script>
<style>
.vue-easymde-editor.is-invalid {
  border: 1px solid #dc3545;
}
</style>
