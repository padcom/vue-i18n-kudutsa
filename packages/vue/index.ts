import { ref, computed, readonly } from 'vue'
import { useI18n as sourceUseI18n, createI18n as sourceCreateI18n } from 'vue-i18n'

type CreateI18nParams = Parameters<typeof sourceCreateI18n>
type CreateI18nResult = ReturnType<typeof sourceCreateI18n>

type CreateI18n = (...params: CreateI18nParams) => CreateI18nResult

const i18n = ref<CreateI18nResult>()

export const createI18n: CreateI18n = (...params: CreateI18nParams) => {
  params[0].legacy = params[0].legacy || false
  // @ts-ignore
  params[0].missingWarn = params[0].missingWarn || false
  // @ts-ignore
  params[0].fallbackWarn = params[0].fallbackWarn || false

  i18n.value = sourceCreateI18n(...params)

  return i18n.value
}

type UseI18nParams = Parameters<typeof sourceUseI18n>
type UseI18nResult = ReturnType<typeof sourceUseI18n>

type UseI18n = (...params: UseI18nParams) => UseI18nResult

// Computed properties to access the "global" scope "locally"
const availableLocales = computed(() => i18n.value?.global.availableLocales)
const locale = computed({
  get() {
    return i18n.value?.global.locale as string
  },
  set(newValue: string) {
    if (i18n.value) {
      i18n.value.global.locale = newValue
    }
  },
})
const fallbackLocale = computed({
  get() {
    return i18n.value?.global.fallbackLocale as string
  },
  set(newValue: string) {
    if (i18n.value) {
      i18n.value.global.fallbackLocale = newValue
    }
  },
})

export const useI18n: UseI18n = (...params: UseI18nParams) => {
  const result = sourceUseI18n(...params)

  // Use global locale, fallbackLocale and availableLocales instead of local ones
  return {
    ...result,
    availableLocales: readonly(availableLocales),
    locale,
    fallbackLocale,
  }
}
