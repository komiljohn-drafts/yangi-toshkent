import { Box, Modal } from "@mui/material";

import FullScreenSpinner from "@/components/atoms/FullScreenSpinner";
// import { LightIcon } from "@/screen-capture/icons";
import { deleteProfile } from "@/services/getProfile";
import styles from "./style.module.scss";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { LightingIcon } from "@/screen-capture/icons";
import { getBonus } from "@/services/setOrder";
import ErrorAlert from "@/components/UI/ErrorAlert/ErrorAlert";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  width: "300px",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  borderRadius: "12px",
  boxShadow: 24,
  p: "16px",
};

const ProfilePage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const userData = useSelector((state) => state.userData?.data);
  const userDebt = useSelector((state) => state.userData?.debt)
  const orderData = useSelector((state) => state.orderDetails?.data);
  const [bonus, setBonus] = useState("");
  const [isErrorAlertOpen, setErrorAlertOpen] = useState(false);
  const [errorAlertProps, setErrorAlertProps] = useState({})  

  const checkBeforeDeleting = () => {
    if (orderData?.order_guid) {
      setErrorAlertOpen(true)
      setErrorAlertProps({
        title: "You cannot delete accout", // staticd ata
        text: t("youHaveChargerInUse"), // temporary data
        action: () => {
          setErrorAlertOpen(false);
        }
      })
    } else if (userDebt) {
      setErrorAlertOpen(true)
      setErrorAlertProps({
        title: "You cannot delete accout", // staticd ata
        text: t("youHaveDebt"), // temporary data
        action: () => {
          setErrorAlertOpen(false);
        }
      })
    } else {
      setOpen(true)
    }
  }

  const handleClose = () => setOpen(false);

  const handleUserDelete = () => {
    deleteProfile({
      data: {
        phone_after_deletion: userData?.phone || "",
        email: "",
        email_after_deletion: "",
        guid: userData?.guid || "",
        is_deleted: true,
        phone: "",
      },
    })
      .then((res) => {
        console.log("profile delete res", res);
        window.Telegram?.WebApp?.close();
      })
      .catch((err) => {
        console.log("profile delete err", err);
      });
  };

  useEffect(() => {
    getBonus({
      data: {
        guid: userData?.guid
      }
    })
      .then(res => {
        const resData = res?.data?.data?.data?.response?.[0]?.bonus
        if( resData || resData == 0){
          setBonus(resData)
        } else {
          setErrorAlertOpen(true)
        }
      })
      .catch(err => {
        console.log("getBonus Err", err); // log
        setErrorAlertOpen(true);
      })
  },[userData])

  if (Object.entries(userData).length == 0) {
    return <FullScreenSpinner />;
  }

  return (
    <div className={styles.profileBox}>
      <div className={styles.profileData}>
        <p className={styles.profileHeader}>{t("personal_details")}</p>
        <p className={styles.profileText}>{userData?.phone || ""}</p>
        <div className={styles.bonus}>
          <LightingIcon />
          <p>{bonus !== "" ? (bonus +" "+ t("score")) : ""}</p>
        </div>
        <div className={styles.editButton} onClick={() => navigate("add-data")}>
          {t("change")}
        </div>
      </div>
      <div className={styles.profileBtn}>
        <div
          className={styles.logout}
          onClick={() => {
            window.Telegram?.WebApp?.close();
          }}
        >
          {t("logout")}
        </div>
        <div onClick={checkBeforeDeleting} className={styles.deleteAccount}>
          {t("delete_account")}
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <p className={styles.modalHeader}> {t("delete_account")} ?</p>
          <p className={styles.modalSubtext}>
            {t("delete_account_confirmation")}
          </p>
          <div className={styles.modalBtns}>
            <button
              className={styles.cancelBtn}
              onClick={() => {
                setOpen(false);
              }}
            >
              {t("cancel")}
            </button>
            <button
              className={styles.deleteBtn}
              onClick={() => {
                handleUserDelete();
                setOpen(false);
              }}
            >
              {t("delete")}
            </button>
          </div>
        </Box>
      </Modal>

      <ErrorAlert
        openAlert={isErrorAlertOpen}
        setOpenAlert={setErrorAlertOpen}
        title={errorAlertProps.title}
        errorMesage={errorAlertProps.text}
        action={errorAlertProps.action}
      />
    </div>
  );
};

export default ProfilePage;
