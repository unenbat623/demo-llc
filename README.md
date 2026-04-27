# Tavan Bogd Tech LLC — Static Website
 
> Black & white minimal editorial React website for Tavan Bogd Tech LLC
 
---
 
## Төслийн тойм
 
Tavan Bogd Tech LLC-ийн корпорейт вебсайт. ERP, бизнес процессын автоматжуулалт, хиймэл оюун ухааны шийдлийг танилцуулсан цэвэр, хурдан, responsive вебсайт.
 
---
 
## Технологи
 
| Хэрэгсэл | Тайлбар |
|---|---|
| React (JSX) | UI framework |
| CSS-in-JS | Embedded styles, no external CSS lib |
| Google Fonts | DM Sans font family |
| Intersection Observer API | Scroll-triggered fade-in animations |
| Vanilla JS | Nav scroll behavior, smooth scroll |
 
---
 
## Файлын бүтэц
 
```
TavanBogdTech.jsx     ← Бүх website нэг файлд (component + styles + animations)
README.md             ← Энэ файл
```
 
---
 
## Хэсгүүд (Sections)
 
| # | Section | Тайлбар |
|---|---|---|
| 1 | **Header / Nav** | Sticky navbar, scroll-triggered border, logo |
| 2 | **Hero** | Full-height, editorial typography, Vision card, stats |
| 3 | **About Us** | 2-баганат layout, компанийн танилцуулга |
| 4 | **Services** | 2×2 grid, 4 үндсэн үйлчилгээ |
| 5 | **Team** | Хар дэвсгэр дээр team members — **gold accent дизайн** |
| 6 | **Footer / Contact** | Хаяг, утас, имэйл, social links |
 
---
 
## Дизайны чиглэл
 
- **Өнгөний палитр:** Цагаан `#fafafa`, Хар `#0a0a0a`, Саарал `#888`, **Алт `#C9A84C`** (Team section)
- **Фонт:** DM Sans — 300 (italic hero), 400, 600, 700, 800
- **Анимейшн:** Scroll-triggered fade-in (opacity + translateY), CSS keyframe scroll indicator
- **Hover effects:** Service card background, team card border/background, nav links, buttons
- **Layout:** CSS Grid, asymmetric hero, editorial number styling
---
 
## Ашиглах заавар
 
### 1. React төсөлд оруулах
 
```bash
# Шинэ React төсөл үүсгэх
npx create-react-app tavan-bogd-tech
cd tavan-bogd-tech
 
# Файлыг хуулах
cp TavanBogdTech.jsx src/App.jsx
 
# Ажиллуулах
npm start
```
 
### 2. Vite + React
 
```bash
npm create vite@latest tavan-bogd-tech -- --template react
cd tavan-bogd-tech
npm install
 
cp TavanBogdTech.jsx src/App.jsx
npm run dev
```
 
### 3. Google Fonts
 
`index.html`-д дараах мөрийг `<head>` дотор нэмнэ:
 
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,300;0,400;0,600;0,700;0,800;1,300&display=swap" rel="stylesheet">
```
 
---
 
## Team Section — Gold дизайн
 
Team хэсэг нь тусгай **алтан өнгийн** (gold accent) дизайнтай:
 
- Хар `#0a0a0a` дэвсгэр
- Avatar: алтан gradient border + алтан initials
- Нэр: алтан өнгө `#C9A84C`
- Card hover: алтан border `#C9A84C`
- Section label: алтан өнгө
```
Gold color: #C9A84C
Gold light: #E8C97A
Gold dark:  #A8893A
```
 
---
 
## Хөгжүүлэлтийн дараагийн алхмууд
 
- [ ] Team members-ийн бодит нэр, зураг нэмэх
- [ ] Contact form функциональ болгох (EmailJS эсвэл backend)
- [ ] LinkedIn, Facebook жинхэнэ линк нэмэх
- [ ] Утасны дугаар оруулах
- [ ] SEO meta tags нэмэх
- [ ] Mongolian / English хэл солих функц
---
 
## Компанийн мэдээлэл
 
| | |
|---|---|
| **Компани** | Tavan Bogd Tech LLC |
| **Байршил** | Ulaanbaatar, Mongolia |
| **Имэйл** | info@tavanbogdtech.mn |
| **Утас** | +976 XXXX XXXX |
| **Odoo Partner** | 2022 оноос |
| **Эцэг компани** | Tavan Bogd Group |
 
---
 
© 2026 Tavan Bogd Tech LLC. All Rights Reserved.
