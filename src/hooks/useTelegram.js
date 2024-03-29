import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { getUserId } from "@/services/getUser";
import { userTelegramDataActions } from "@/store/slices/userTelegramData";
import { sendMsg } from "@/helpers/sendMsg";

let msg = "";

const useTelegram = () => {
  const dispatch = useDispatch();
  const [tgID, setTgID] = useState();
  const [userData, setUserData] = useState();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const tgUserData = window.Telegram?.WebApp?.initDataUnsafe?.user;
      dispatch(userTelegramDataActions.setUserTelegramData(tgUserData));
      msg += "\n\n#TgUser=\n" + JSON.stringify(window.Telegram?.WebApp?.initDataUnsafe?.user);
      setTgID(tgUserData?.id);
      // setTgID("5709226930");
    }

    // setTgID("6054841751");
    // setTgID("6225306070");
    // setTgID("6267637476");

    // setTgID("1413774013"); // 17 91
    // setTgID("1780780393") // 50 01
    // setTgID("6508689707") // Damir test
    // setTgID("579391823") // Damir 2272
    setTgID("754650976"); // Mukarramhon PM
    // setTgID("857348252") // Mukarramhon PM 2
    // setTgID("5945885433") // Sherzod mobile
    // setTgID("371594426") // One of clients
    // setTgID('1546926238') // Bekmurod
    // setTgID("6277376579")
    // setTgID("6267637476") // Temur
  }, []);

  useEffect(() => {
    console.log("tgid => ", tgID);
    if (tgID) {
      msg += "\n\n#tgID\n" + tgID;
      getUserId({ data: { telegram_id: tgID } })
        .then((res) => {
          msg += "\n\n#userData\n" + JSON.stringify(res?.data?.data?.response?.[0]);
          sendMsg(msg);
          setUserData(res?.data?.data?.response?.[0]);
          console.log("res => ", res?.data?.data?.response?.[0]);
        })
        .catch((err) => {
          console.log("err", err); // log
        });
    }
  }, [tgID]);

  return userData;
};

export default useTelegram;
