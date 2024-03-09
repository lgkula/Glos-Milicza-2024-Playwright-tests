interface ThumbnailArticle {
  title: string;
  subTitle: string;
  link: string;
}

export const pinedArticle: ThumbnailArticle = {
  title: "Niemal miliard złotych na pożyczki dla dolnośląskich przedsiębiorców",
  subTitle:
    "Dzięki umowie podpisanej przez Samorząd Województwa Dolnośląskiego oraz przedstawicieli Banku Gospodarstwa Krajowego już wiosną przyszłego roku dolnośląscy przedsiębiorcy będą mogli ubiegać się o atrakcyjne pożyczki.",
  link: "article/niemal-miliard-zlotych-na-pozyczki-dla-dolnoslaskich-przedsiebiorcow/",
};

export const articles: ThumbnailArticle[] = [
  {
    title: "Sytuacja na rzece Barycz jest stabilna",
    subTitle:
      "W poprzednim numerze „Głosu Milicza” informowaliśmy o przekroczeniu stanu alarmowego na rzece Barycz. Jak ustaliliśmy, poziom wody w Baryczy spada i aktualnie wynosi 293 cm, czyli jest o 43 cm niższy niż tydzień temu.",
    link: "article/sytuacja-na-rzece-barycz-jest-stabilna/",
  },
];
