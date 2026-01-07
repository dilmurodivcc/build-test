"use client"

import Container from "@/components/Container";
import styles from "./index.module.scss";
import SectionTitle from "@/components/SectionTitle";
import { useQuery } from "@tanstack/react-query";
import strapiRequest from "@/api/strapiRequest";
import Loader from "@/components/Loader";
import getImageFormat from "@/utils/getImageFormat";
import { useLanguage } from "@/context/LanguageContext";
import { useTranslations } from "next-intl";

const cards = [
  {
    name: "Анна Петрова",
    text: "Очень непривычно организованные туры превосходят все ожидания.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBG71Is3PIq78iq6sU0sRvSIrzDcHH2XfDmws7GCIV62zAklxqytTrcsq_JuPmZIdFd5ls0pUcDU396laJLlcx67fqT3zRwuKSgwEbIgrMHf0FPsqxzsccRcUE3FwJZSD-lvHWha6MDb6hp0xOrj_0WMn0N19_bBk7lxV7lKCAZV1B7KxQHwlzZ1b6uMJT_ZVHB0SSznqHLk-L1Jgl0huV0BTrAx5GNxvck_TBsB4c_3MF-ZDtfNgrnFY5li2SYnZSzjA6ydVHiVw"
  },
  {
    name: "Иван Кравцов",
    text: "Атмосфера и организация на профессиональном уровне. Рад сотрудничеству.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuArnE0YEcB8VlIcYA4MCzg5EKMmoU3h-fm_I4OdMebxkFPZgD9dX4s_cpIEdqbkMitjhpANcOV8867tCwR-zdZL2b1Wg5GOII6zF-I5iH9l0BLS-tMbOyHxYmIwNVxpjJwF06YCFy76kY2RG-iAH3LrqTzl4mAOKyLqff3Hyc1O70YBUIghCrCdlV2YVULAHk2UhycqajVkequ6ogVGUALgwNiZUQfgkSd2FS7I_WOBJ_39-i3a7lEF03elUuV3dwTH2tfc4bXkvQ"
  },
  {
    name: "Ольга Смирнова",
    text: "Качественный, расслабляющий отдых с первоклассным сервисом",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuB7PCGaie2QSjAhkmm-oeuXRcvjmjcuMSO7G1WgXWI4yDBASbXHe6Uf3U9Ioi9GD_p5tDhHMFSTpcPnIVJH-qmNuM9gvcCpt0gs0rGckTXTysyk3K0KmhleMSCtv6pwHaOoDcZWDvQopWslxx7kfS05jmeg9X7h1j1LaWwTvmJbmPcDos4tYVmZ0jOeqmMg8rSihaRw8v66hUxRcGoykbh_IRLB84woEqw7kRrK9Skjp46hLXEwB2HUI48_elX_mzdIVeKCBlQQ9w"
  }
]

const ReviewsSection = () => {
  const {language} = useLanguage();
  const t = useTranslations();

  const { data: reviews, isLoading: reviewsIsLoading } = useQuery({
    queryKey: ['REVIEWS', language],
    queryFn: () => strapiRequest.get('/reviews', { params: { populate: '*', locale: language } }),
    select: res => res.data
  })


  if(reviewsIsLoading) return <Loader />

  return (
    <div className={styles.section} >
      <Container>
        <SectionTitle>{t("main.reviewsTitle")}</SectionTitle>
        <div className={styles.cards} >
          {
            reviews?.map(review => (
              <div key={review.id} className={styles.card} >
                  <img src={getImageFormat(review.author_photo, 'thumbnail')} alt={review.author_name} className={styles.avatar} />
                <div className={styles.content} >
                  <div className={styles.name} >{review.author_name}</div>
                  <div className={styles.text} > {review.text} </div>
                </div>
              </div>
            ))
          }
        </div>
      </Container>
    </div>
  )
}

export default ReviewsSection;