import CurseforgeIcon from '@/components/CurseforgeIcon.vue'
import FTBIcon from '@/components/FTBIcon.vue'
import ImageIcon from '@/components/ImageIcon.vue'
import JarFileIcon from '@/components/JarFileIcon.vue'
import ModrinthIcon from '@/components/ModrinthIcon.vue'
import PackageFileIcon from '@/components/PackageFileIcon.vue'
import ZipFileIcon from '@/components/ZipFileIcon.vue'
import { h } from 'vue'
import { IconProps, IconSet, createVuetify } from 'vuetify'
import { aliases, md } from 'vuetify/iconsets/md'
import { ar, ru, zhHans } from 'vuetify/locale'
import 'vuetify/styles'
import { BuiltinImages } from './constant'
import { DEFAULT_SURFACE_BUTTON_RADIUS } from './composables/surfaceTokens'

const xmcl: IconSet = {
  component: (props: IconProps) => {
    switch (props.icon) {
      case 'ftb': return h(FTBIcon)
      case 'curseforge': return h(CurseforgeIcon)
      case 'zip': return h(ZipFileIcon)
      case 'jar': return h(JarFileIcon)
      case 'package': return h(PackageFileIcon)
      case 'modrinth': return h(ModrinthIcon)
      case 'forge': return h(ImageIcon, { src: BuiltinImages.forge })
      case 'fabric': return h(ImageIcon, { src: BuiltinImages.fabric })
      case 'quilt': return h(ImageIcon, { src: BuiltinImages.quilt })
      case 'minecraft': return h(ImageIcon, { src: BuiltinImages.minecraft })
      case 'prism': return h(ImageIcon, { src: BuiltinImages.prism })
      case 'neoForged': return h(ImageIcon, { src: BuiltinImages.neoForged })
      case 'optifine': return h(ImageIcon, { src: BuiltinImages.optifine })
      case 'iris': return h(ImageIcon, { src: BuiltinImages.iris })
      case 'oculus': return h(ImageIcon, { src: BuiltinImages.oculus })
      case 'mmc': return h(ImageIcon, { src: BuiltinImages.mmc })
      default: return null
    }
  },
}

export const vuetify = createVuetify({
  locale: {
    locale: 'en',
    fallback: 'en',
    messages: { zhHans, ru, ar },
    rtl: {
      ar: true,
    },
  },
  icons: {
    defaultSet: 'md',
    aliases,
    sets: { md, xmcl },
  },
  defaults: {
    VSwitch: {
      inset: true,
      color: 'primary',
    },
    VBtn: {
      rounded: DEFAULT_SURFACE_BUTTON_RADIUS,
    },
    VChip: {
      rounded: DEFAULT_SURFACE_BUTTON_RADIUS,
    },
    VAvatar: {
      color: 'transparent'
    }
  },
  theme: {
    defaultTheme: 'dark',
    themes: {
      light: {},
      system: {},
      dark: {
        dark: true,
        colors: {
          primary: '#13C52F',
          accent: '#00e676',
        },
      },
    },
  },
  defaults: {
    global: {
      ripple: false,
    },
    VBtn: { rounded: 'pill' },
    VCard: { rounded: 'xl' },
    VDialog: { rounded: 'xl' },
    VTextField: { variant: 'solo-filled', flat: true, rounded: 'lg' },
    VSelect: { variant: 'solo-filled', flat: true, rounded: 'lg' },
    VTextarea: { variant: 'solo-filled', flat: true, rounded: 'lg' },
    VCombobox: { variant: 'solo-filled', flat: true, rounded: 'lg' },
    VSwitch: { inset: true, color: 'primary' },
    VProgressLinear: { rounded: 'pill' },
    VSlider: { color: 'primary', trackSize: 4, thumbSize: 16 },
    VCheckbox: { color: 'primary', trueIcon: 'check_circle', falseIcon: 'radio_button_unchecked' },
  },
})

