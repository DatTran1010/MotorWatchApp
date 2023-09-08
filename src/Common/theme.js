import colors from "./colors";
import { windowWidth } from "./dimentions";

export default {
  fontFamily: "Segoe UI",
  font: {
    fontWeight: "400",
    fontSize: windowWidth / 30,
    color: colors.black,
    fontFamily: "Segoe UI",
  },
  fontTitle: {
    fontWeight: "bold",
    fontSize: 18,
    color: colors.white,
    fontFamily: "Segoe UI",
  },
  shadow: {
    backgroundColor: colors.backgroundColor,
    shadowColor: colors.black,
    shadowOffset: { width: 5, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 3.85,
    elevation: 5,
  },
  fontSize: windowWidth / 30,
};
