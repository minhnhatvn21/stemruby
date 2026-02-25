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

## 8) Khắc phục lỗi đăng ký (rất quan trọng)
Nếu bạn gặp lỗi kiểu “không thể đăng ký lúc này”, nguyên nhân thường là:
- Firestore Rules chặn ghi hồ sơ sau khi Auth đã tạo user.
- Mã lỗi Firebase chưa được hiển thị rõ.

Bản mới đã hiển thị mã lỗi thật trong toast (ví dụ: `auth/email-already-in-use`, `auth/weak-password`, `permission-denied`) để dễ debug.

### Firestore Rules gợi ý cho bản demo
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{uid} {
      allow read, write: if request.auth != null && request.auth.uid == uid;
    }
    match /progress/{uid} {
      allow read, write: if request.auth != null && request.auth.uid == uid;
    }
    match /surveyResponses/{uid}/responses/{docId} {
      allow read, write: if request.auth != null && request.auth.uid == uid;
    }
    // Mapping tài khoản -> email ảo
    match /usernames/{account} {
      allow read, write: if request.auth != null;
    }
  }
}
```

### Lưu ý ENV
- Biến `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID` không bắt buộc (không có cũng chạy được).
- `AUTH_DOMAIN`, `PROJECT_ID`, `APP_ID` phải cùng đúng 1 project Firebase.
