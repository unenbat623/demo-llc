"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const SettingsSchema = new mongoose_1.default.Schema({
    siteTitle: { type: String, default: 'Tavan Bogd Tech' },
    navbarLogo: { type: String, default: 'TAVAN BOGD TECH' },
    heroTitle: { type: String, default: 'Ирээдүйн Технологийг Өнөөдөр' },
    heroDescription: { type: String, default: 'Бид дэлхийн жишигт нийцсэн программ хангамжийн шийдлүүдийг Монголдоо нутагшуулан, бизнесийн цар хүрээг тэлэхэд тусалдаг.' },
    ctaText: { type: String, default: 'Хамтран ажиллах' },
    aboutTitle: { type: String, default: 'Бидний тухай' },
    aboutDescription: { type: String, default: 'Бид 20 гаруй жилийн туршлагатай хамт олон бөгөөд Монголын технологийн салбарт тэргүүлэгч байхыг зорьдог.' },
    contactEmail: { type: String, default: 'info@tavanbogd.tech' },
    contactPhone: { type: String, default: '+976 7700 0000' },
    address: { type: String, default: 'Улаанбаатар хот, ХУД, 15-р хороо' },
    footerText: { type: String, default: '© 2024 Таван Богд Технологи ХХК. Бүх эрх хуулиар хамгаалагдсан.' },
    updatedAt: { type: Date, default: Date.now }
});
exports.default = mongoose_1.default.model('Settings', SettingsSchema);
