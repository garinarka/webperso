import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {codeInput} from '@sanity/code-input'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'webperso',

  projectId: process.env.SANITY_STUDIO_PROJECT_ID || '2l57jfxs',
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',

  plugins: [
    structureTool(),
    visionTool(),
    codeInput(), // ← NEW: enables code block editor in Studio
  ],

  schema: {
    types: schemaTypes,
  },
})
