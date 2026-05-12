<template>
  <v-card
    class="home-server-card px-4 py-3 flex items-center gap-4"
    outlined
  >
    <!-- Favicon / Icon -->
    <v-img
      v-if="status.favicon"
      :src="status.favicon"
      class="w-12 h-12 rounded shadow-sm flex-none"
    />
    <div
      v-else
      class="w-12 h-12 rounded bg-[#2d2d2d] flex items-center justify-center flex-none"
    >
      <v-icon
        size="24"
        color="primary"
      >
        dns
      </v-icon>
    </div>

    <!-- Server Info -->
    <div class="flex-1 min-w-0">
      <div class="flex items-center gap-2">
        <span class="text-base font-bold text-white truncate">
          {{ serverName || instance.name }}
        </span>
        <v-chip
          v-if="status.ping > 0"
          x-small
          label
          color="success"
          class="px-1.5 h-5 font-bold"
        >
          {{ status.players.online }} / {{ status.players.max }}
        </v-chip>
      </div>
      <div class="text-xs text-gray-400 truncate">
        {{ instance.server?.host }}:{{ instance.server?.port || 25565 }}
      </div>
    </div>

    <!-- Status & Actions -->
    <div class="flex items-center gap-3 flex-none">
      <div class="text-right">
        <div
          v-if="status.ping > 0"
          class="text-xs font-medium text-green-400"
        >
          {{ status.ping }}ms
        </div>
        <div
          v-else
          class="text-xs font-medium text-red-400"
        >
          {{ t('server.offline') }}
        </div>
      </div>
      
      <v-divider vertical class="h-8" />
      
      <v-btn
        icon
        small
        variant="text"
        :loading="pinging"
        @click="refresh"
        class="hover:bg-white/10"
      >
        <v-icon size="18">refresh</v-icon>
      </v-btn>
    </div>
  </v-card>
</template>

<script lang="ts" setup>
import { kInstance } from '@/composables/instance'
import { useServerStatus } from '@/composables/serverStatus'
import { injection } from '@/util/inject'

const { t } = useI18n()
const { instance } = injection(kInstance)

const server = computed(() => instance.value.server || { host: '', port: 25565 })
const { status, pinging, refresh } = useServerStatus(server, ref(undefined))

const serverName = computed(() => instance.value.name)

onMounted(() => {
  if (instance.value.server) {
    refresh()
  }
})
</script>

<style scoped>
.home-server-card {
  background: rgba(30, 30, 30, 0.7);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  max-width: 600px; /* Limit width so it doesn't look huge */
  margin-left: auto;
  margin-right: auto;
}
</style>
