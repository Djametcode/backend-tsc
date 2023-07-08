import axios from "axios";
import Cookies from "js-cookie";
import { authAction } from "../redux/store";

const loginHandler = async (
  event,
  item,
  navigate,
  dispatch,
  setError,
  setText
) => {
  event.preventDefault();
  try {
    const response = await axios.post(
      "https://wandering-undershirt-dog.cyclic.app/api/v11/no-life/login-user",
      item
    );
    const datas = await response.data;

    const { token, user } = datas;
    await Cookies.set("token", token);
    await Cookies.set("userId", user._id);
    const intervals = setInterval(() => {
      navigate("/welcome");
      clearInterval(intervals);
    }, 1000);
    console.log(datas);
  } catch (error) {
    const errorText = error.response.data.msg;
    setText(errorText);
    setError(true);
  }
};

export { loginHandler };
