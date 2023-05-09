import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faUserSecret, faUser, faLock, faEye, faEyeSlash, faChevronDown, faSort } from '@fortawesome/free-solid-svg-icons'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faFileLines } from '@fortawesome/free-regular-svg-icons'
import Vue from 'vue'

library.add(faUserSecret, faTwitter, faUser, faLock, faEye, faEyeSlash, faChevronDown, faSort, faFileLines)
Vue.component('font-awesome-icon', FontAwesomeIcon)
