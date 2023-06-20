import { deleteCard, getCards } from "@/services/getCards";
import { useEffect, useState } from "react";

import cardicon from "@/assets/images/card.jpg";
import { checkCardType } from "@/helpers/checkCardType";
import styles from "./style.module.scss";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const MyCardsPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const userData = useSelector((state) => state.userData?.data);
  const [data, setData] = useState(null);

  const getMyCards = () => {
    if (!userData?.guid) return;

    getCards({
      data: {
        with_relations: false,
        user_id: userData?.guid,
      },
    })
      .then((res) => {
        setData(res?.data?.data?.response);
      })
      .catch((err) => {
        console.log("my-cards err", err);
      });
  };

  const deleteMyCard = (guid) => {
    deleteCard(guid, { data: {} })
      .then((res) => {
        console.log("delete-cards res", res);
        getMyCards();
      })
      .catch((err) => {
        console.log("delete-cards err", err);
      });
  };

  useEffect(() => {
    getMyCards();
  }, []);

  return (
    <div className={styles.myCards}>
      {data?.length ? (
        <>
          <div className={styles.text}>
            <p>{t("this_is_cards")}</p>
          </div>
          {data?.map((card) => {
            const { icon } = checkCardType(card?.credit_card);
            return (
              <div className={styles.paymentMethod} key={card.guid}>
                <div className={styles.editCard}>
                  <img
                    className={styles.images}
                    src={icon || cardicon}
                    alt="icon"
                  ></img>
                  <div>{card?.credit_card}</div>
                </div>
                <button
                  className={styles.editBtn}
                  onClick={() => {
                    deleteMyCard(card?.guid, { data: {} });
                  }}
                >
                  {t("delete")}
                </button>
              </div>
            );
          })}
        </>
      ) : (
        <>
          {" "}
          <div className={styles.headerText}>
            <p>{t("this_is_cards")}</p>
          </div>
          <div className={styles.myCardsBody}>
            <h1>{t("no_cards")}</h1>
            <p>{t("add_card_and_order")}</p>
          </div>
        </>
      )}

      <div className={styles.addBtn} onClick={() => navigate("/add-card")}>
        + {t("add_card")}
      </div>
    </div>
  );
};

export default MyCardsPage;
