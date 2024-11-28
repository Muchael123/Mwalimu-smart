import { Dimensions } from "react-native";

export default {
    card: {
        height: Dimensions.get('window').height / 3,
    },
    scroll: {
        height: Dimensions.get('window').height ,
        width: Dimensions.get('window').width*.9,
    }
}