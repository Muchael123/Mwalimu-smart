import { Dimensions } from "react-native";

const window = Dimensions.get('window');

export default {
  card: {
    height: window.height / 3,
  },
  scroll: {
    height: window.height,
    width: window.width * 0.9, 
  },
  gap: 20,
};
