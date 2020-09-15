import { LocalStorage } from 'quasar'

export default {
  isConected: false, //verifica se está conectado á internet,
  fonts: {
    font1: {
      title: "text-h6",
      text: "text-caption",
    },
    font2: {
      title: "text-h5",
      text: "text-body1",
    },
    font3: {
      title: "text-h4",
      text: "text-h5",
    }
  },
  fontConfig: LocalStorage.getItem("fontSize") ? LocalStorage.getItem("fontSize") : 2,
  appMode: LocalStorage.getItem("lightMode") ? LocalStorage.getItem("lightMode") : 1,
  darkModeConf: {
    bgColor: "bg-white",
    textColor: "text-black",
    color: "black",
    textBtn: "text-white",
    icon: "primary",
    iconVar: "primary",
  },
  homeSpeak: true,
  vibrateState: LocalStorage.getItem("vibrate") ? LocalStorage.getItem("vibrate") : 1,
}
