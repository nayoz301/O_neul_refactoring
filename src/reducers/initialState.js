import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngry as farAngry,
  faFlushed as farFlushed,
  faGrimace as farGrimace,
  faDizzy as farDizzy,
  faMeh as farMeh,
  faFrown as farFrown,
  faSmile as farSmile,
  faGrinBeamSweat as farGrinBeamSweat,
  faGrinHearts as farGrinHearts,
  faTired as farTired,
  faSadTear as farSadTear,
  faSadCry as farSadCry,
  faMehRollingEyes as farMehRollingEyes,
  faGrinStars as farGrinStars,
  faSurprise as farSurprise,
  faLaughBeam as farLaughBeam,
  faKissWinkHeart as farKissWinkHeart,
  faLaughSquint as farLaughSquint,
  faGrinSquintTears as farGrinSquintTears,
  faGrinTongueWink as farGrinTongueWink,
} from "@fortawesome/free-regular-svg-icons";
import { Icon } from "react-icons-kit";

import {
  weatherSunny,
  weatherCloudy,
  weatherPartlySunny,
  weatherShower,
  weatherSnow,
} from "react-icons-kit/typicons/";

const makeFaceIcon = (iconName, color) => {
  return <Icon face icon={iconName} style={{ color: `#${color}` }} />;
};

const makeWeatherIcon = (iconName, color) => {
  return <Icon weather icon={iconName} style={{ color: `#${color}` }} />;
};

export const initialState = {
  userState: {
    login: {
      accessToken: "",
    },
    userInfo: {},
  },
  diaryState: {
    publicDiary: [],
    myDiary: [],
    musicList: [],
  },
  icons: {
    faceIcons: [
      { id: 1, icon: makeFaceIcon(farMeh, "a1a1a4") },
      { id: 2, icon: makeFaceIcon(farSmile, "ffdb00") },
      { id: 3, icon: makeFaceIcon(farLaughBeam, "fdca30") },
      { id: 4, icon: makeFaceIcon(farLaughSquint, "ffcb00") },
      {
        id: 5,
        icon: makeFaceIcon(farGrinSquintTears, "fdbb30"),
      },
      {
        id: 6,
        icon: makeFaceIcon(farKissWinkHeart, "ea4c89"),
      },
      { id: 7, icon: makeFaceIcon(farGrinHearts, "ea4c89") },
      { id: 8, icon: makeFaceIcon(farGrinStars, "6b5aed") },
      {
        id: 9,
        icon: makeFaceIcon(farGrinTongueWink, "2d72d9"),
      },
      {
        id: 10,
        icon: makeFaceIcon(farGrinBeamSweat, "7acef4"),
      },
      { id: 11, icon: makeFaceIcon(farFrown, "ff8200") },
      { id: 12, icon: makeFaceIcon(farAngry, "fe423f") },
      { id: 13, icon: makeFaceIcon(farGrimace, "e32119") },
      { id: 14, icon: makeFaceIcon(farTired, "97a2a2") },
      { id: 15, icon: makeFaceIcon(farDizzy, "8a8b8c") },
      { id: 16, icon: makeFaceIcon(farSurprise, "8ee000") },
      { id: 17, icon: makeFaceIcon(farFlushed, "6cc24a") },
      {
        id: 18,
        icon: makeFaceIcon(farMehRollingEyes, "8a8acb"),
      },
      { id: 19, icon: makeFaceIcon(farSadTear, "2bb3f3") },
      { id: 20, icon: makeFaceIcon(farSadCry, "147efb") },
    ],
    weatherIcons: [
      { id: 1, icon: makeWeatherIcon(weatherSunny, "f96854") },
      { id: 2, icon: makeWeatherIcon(weatherCloudy, "ffb900") },
      { id: 3, icon: makeWeatherIcon(weatherPartlySunny, "a5a9ab") },
      { id: 4, icon: makeWeatherIcon(weatherShower, "0099e5") },
      { id: 5, icon: makeWeatherIcon(weatherSnow, "90cef1") },
    ],
  },
};
