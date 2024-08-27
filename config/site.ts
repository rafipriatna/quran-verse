export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Ayat Al-Quran",
  description: "Sebuah pesan dari Al-Qur'an untuk setiap emosi.",
  navItems: [
    {
      label: "Beranda",
      href: "/",
    },
    {
      label: "Tentang",
      href: "/about",
    },
  ],
  links: {
    github: "https://github.com/rafipriatna/quran-verse",
    twitter: "https://twitter.com/rafipriatna",
  },
};
