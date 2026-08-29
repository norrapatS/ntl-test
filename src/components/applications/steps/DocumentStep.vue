<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { Paperclip, Upload, X } from 'lucide-vue-next'

import { useApplicationStore } from '@/stores/application'

const store = useApplicationStore()

const { documents } = storeToRefs(store)

const docKinds = [
  'บัตรประชาชน',
  'ทะเบียนบ้าน',
  'หลักฐานรายได้',
  'อื่น ๆ',
]

const uploadDocument = (kind: string) => {
  documents.value.push({
    id: crypto.randomUUID(),
    name: `${kind}.pdf`,
    size: Math.round(200000 + Math.random() * 800000),
    kind,
  })
}

const removeDocument = (id: string) => {
  const index = documents.value.findIndex((document) => document.id === id)

  if (index !== -1) {
    documents.value.splice(index, 1)
  }
}
</script>

<template>
  <div class="space-y-4">
    <p class="text-sm text-muted-foreground">
      แนบสำเนาบัตรประชาชน ทะเบียนบ้าน
      และหลักฐานรายได้
      (ไฟล์ JPG/PNG/PDF ไม่เกิน 5 MB)
    </p>

    <div class="grid gap-3 sm:grid-cols-2">
      <button
        v-for="kind in docKinds"
        :key="kind"
        type="button"
        class="flex items-center gap-3 rounded-xl border border-dashed border-border bg-secondary/40 p-4 text-left transition-colors hover:border-accent hover:bg-secondary"
        @click="uploadDocument(kind)"
      >
        <Upload class="size-5 text-accent" />

        <span class="text-sm font-medium">
          อัปโหลด{{ kind }}
        </span>
      </button>
    </div>

    <ul class="space-y-2">
      <li
        v-for="document in documents"
        :key="document.id"
        class="flex items-center gap-3 rounded-lg border border-border p-3"
      >
        <Paperclip class="size-4 text-muted-foreground" />

        <div class="min-w-0 flex-1">
          <p class="truncate text-sm font-medium">
            {{ document.name }}
          </p>

          <p class="text-xs text-muted-foreground">
            {{ document.kind }}
            ·
            {{ (document.size / 1024).toFixed(0) }} KB
          </p>
        </div>

        <button
          type="button"
          aria-label="ลบไฟล์"
          class="rounded-md p-1 text-muted-foreground hover:bg-secondary hover:text-destructive"
          @click="removeDocument(document.id)"
        >
          <X class="size-4" />
        </button>
      </li>
    </ul>
  </div>
</template>