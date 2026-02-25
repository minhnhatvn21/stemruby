# STEM RUBY - 8 Module Năng Lượng Xanh (Next.js + Firebase)

Web app cho học sinh lớp 5 với giao diện game rực lửa, có đăng ký/đăng nhập và 8 module tương tác.

## Công nghệ
- Next.js App Router + TypeScript
- TailwindCSS + Framer Motion
- Firebase Authentication (Email/Password)
- Firestore (users/progress/surveyResponses/usernames)
- Vercel deployment

## 1) Tạo Firebase project
1. Vào Firebase Console -> Create project.
2. Bật Authentication -> Sign-in method -> Email/Password.
3. Tạo Firestore Database ở chế độ production/test theo nhu cầu.
4. Lấy cấu hình Web App trong Project Settings.

## 2) Cấu hình ENV local
Tạo file `.env.local`:

```bash
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...
```

## 3) Chạy local
```bash
npm i
npm run dev
```
Mở `http://localhost:3000`.

## 4) Auth theo “tài khoản + mật khẩu”
- UI đăng ký/đăng nhập dùng **tài khoản** thay vì email.
- Nội bộ hệ thống tạo "email ảo" dạng `taikhoan@stemruby.local` để tương thích Firebase Email/Password.
- Firestore lưu mapping tại `usernames/{account}` để tra cứu email ảo khi đăng nhập.

## 5) Firestore schema đề xuất
- `users/{uid}`: account, displayName, className, school, province, email, createdAt, totalPoints
- `usernames/{account}`: uid, email, createdAt
- `progress/{uid}`: modules.{moduleId}, streak
- `surveyResponses/{uid}/responses/{autoId}`: answers, createdAt

## 6) Deploy Vercel
1. Push code lên GitHub.
2. Vào Vercel -> New Project -> Import repo.
3. Add toàn bộ biến ENV như `.env.local`.
4. Deploy (build command mặc định `npm run build`).

## 7) Cấu trúc chính
- `src/lib/firebase.ts`: init Firebase
- `src/lib/auth.tsx`: AuthProvider + hook
- `src/lib/firestore.ts`: bootstrap user + cập nhật điểm + map tài khoản
- `src/data/modules.ts`: metadata 8 module
- `src/components/effects/*`: hiệu ứng nền lửa + ember
- `src/components/modules/ModulePlayground.tsx`: logic 8 module

## Lưu ý
- Đây là bản mẫu đầy đủ luồng chính, có thể mở rộng thêm âm thanh, leaderboard realtime, và rules Firestore chi tiết theo lớp/trường.
