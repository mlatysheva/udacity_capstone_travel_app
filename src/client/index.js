import { travelApp } from './js/app'
import { checkInput } from './js/inputChecker'
import { checkDate } from './js/inputChecker'
import { checkTripLength } from './js/inputChecker'
import { handleSubmit } from './js/app'
import { duration } from './js/duration'
import { geonames } from './js/geonames'
import { temperature } from './js/weatherbit'
import { weatherbit } from './js/weatherbit'
import { weatherbitHistory } from './js/weatherbit'
import { pixabay } from './js/pixabay'

import './styles/resets.scss'
import './styles/base.scss'
import './styles/form.scss'
import './styles/responsive.scss'

alert("I EXIST");
const buttonClick = document.getElementById("submit-button");
buttonClick.addEventListener('click', handleSubmit);
buttonClick.addEventListener('click', checkInput)

export {
    travelApp,
    checkInput,
    checkDate,
    checkTripLength,
    handleSubmit,
    duration,
    geonames,
    temperature,
    weatherbit,
    weatherbitHistory,
    pixabay,

}
