import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faArrowUpRightFromSquare,
  faStar,
  faChevronLeft,
  faChevronRight,
  faImage,
  faSearch,
} from '@fortawesome/free-solid-svg-icons'
// Agregá los que uses acá

library.add(faArrowUpRightFromSquare, faStar, faChevronLeft, faChevronRight, faImage, faSearch)

export { FontAwesomeIcon }
