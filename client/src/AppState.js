import { reactive } from 'vue'
import { can } from './json/canada.js'
import { usa } from "./json/usa.js"
import { shs } from './json/southern_hemisphere.js'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  /** @type {import('./models/Account.js').Account} */
  account: {},
  /** @type {import('./models/Resort.js').Resort} */
  pinedResort: {},
  /** @type {Resort} */
  activeResort:{},
  resorts: [...usa, ...can, ...shs],
  comments: [],
})
