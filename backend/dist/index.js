"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const teamRoutes_1 = __importDefault(require("./routes/teamRoutes"));
const logRoutes_1 = __importDefault(require("./routes/logRoutes"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const settingsRoutes_1 = __importDefault(require("./routes/settingsRoutes"));
const translateRoutes_1 = __importDefault(require("./routes/translateRoutes"));
const clientRoutes_1 = __importDefault(require("./routes/clientRoutes"));
const uploadRoutes_1 = __importDefault(require("./routes/uploadRoutes"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5002;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/tavan_bogd_tech';
app.use((0, cors_1.default)());
app.use('/api/upload', uploadRoutes_1.default);
app.use(express_1.default.json({ limit: '50mb' }));
app.use(express_1.default.urlencoded({ limit: '50mb', extended: true }));
// Ensure uploads directory exists
const uploadDir = path_1.default.join(process.cwd(), 'uploads');
if (!fs_1.default.existsSync(uploadDir)) {
    fs_1.default.mkdirSync(uploadDir);
}
app.use('/uploads', express_1.default.static(uploadDir));
mongoose_1.default.connect(MONGODB_URI)
    .then(() => console.log('✅ Connected to MongoDB'))
    .catch(err => console.error('❌ MongoDB connection error:', err));
// ── Routes ────────────────────────────────────────────────────
app.use('/api/team', teamRoutes_1.default);
app.use('/api/logs', logRoutes_1.default);
app.use('/api/auth', authRoutes_1.default);
app.use('/api/users', userRoutes_1.default);
app.use('/api/settings', settingsRoutes_1.default);
app.use('/api/translate', translateRoutes_1.default);
app.use('/api/client', clientRoutes_1.default);
// Root route to prevent "Cannot GET /"
app.get('/', (req, res) => {
    res.json({ status: 'ok', message: 'Tavan Bogd Tech API is running' });
});
// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', uptime: process.uptime() });
});
app.use((err, req, res, next) => {
    console.error('❌ Global Error Handler:', err);
    if (err instanceof Error && err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ message: 'Зурагны хэмжээ хэтэрхий их байна (Max 5MB)' });
    }
    res.status(err.status || 500).json({
        message: err.message || 'Internal Server Error',
        error: process.env.NODE_ENV === 'development' ? err : {}
    });
});
app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
