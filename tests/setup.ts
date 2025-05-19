import { config } from '@vue/test-utils'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faStar, faImage, faChevronLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'

// Add FontAwesome icons used in tests
library.add(faStar, faImage, faChevronLeft, faArrowRight)

// Mock FontAwesome component
config.global.stubs = {
  'font-awesome-icon': {
    template: '<span class="fa-icon"></span>',
  },
  'router-link': {
    name: 'router-link',
    template: '<a><slot /></a>',
  },
}
