'use client';

import { useMemo, useRef, useState } from 'react';
import { modules } from '@/data/modules';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { completeModule } from '@/lib/firestore';
import { useAuth } from '@/lib/auth';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { QRCodeSVG } from 'qrcode.react';

export default function ModulePlayground({ id }: { id: string }) {
  const meta = useMemo(() => modules.find((m) => m.id === id), [id]);
  const { user } = useAuth();
  const [points, setPoints] = useState(0);
  const [done, setDone] = useState(false);
  const [clickedHotspots, setClickedHotspots] = useState<string[]>([]);
  const [checklist, setChecklist] = useState<boolean[]>(Array(21).fill(false));
  const [greenScore, setGreenScore] = useState(0);
  const [storyScore, setStoryScore] = useState(0);
  const [quiz, setQuiz] = useState(0);
  const [surveyDone, setSurveyDone] = useState(false);
  const certRef = useRef<HTMLCanvasElement>(null);

  if (!meta) return <Card>Không tìm thấy module.</Card>;

  const finish = async (value: number) => {
    if (!user || done) return;
    setPoints(value);
    setDone(true);
    await completeModule(user.uid, id, value);
  };

  return (
    <Card className="space-y-4">
      <h1 className="text-3xl font-bold">{meta.title}</h1>
      <p>{meta.shortDescription}</p>

      {id === 'module1' && (
        <div className="grid grid-cols-2 gap-3">
          {['Đèn bật ban ngày', 'TV bật không xem', 'Mở tủ lạnh lâu', 'Quạt chạy phòng trống'].map((h) => (
            <Button
              key={h}
              onClick={() => {
                if (!clickedHotspots.includes(h)) {
                  const next = [...clickedHotspots, h];
                  setClickedHotspots(next);
                  if (next.length === 4) finish(80);
                }
              }}
            >
              Hotspot: {h}
            </Button>
          ))}
        </div>
      )}

      {id === 'module2' && (
        <div className="space-y-2">
          {Array.from({ length: 7 }).map((_, day) => (
            <div key={day} className="grid grid-cols-3 gap-2">
              {Array.from({ length: 3 }).map((_, t) => {
                const idx = day * 3 + t;
                return (
                  <label key={idx} className="rounded bg-black/40 p-2 text-sm">
                    <input
                      type="checkbox"
                      checked={checklist[idx]}
                      onChange={() => {
                        const next = [...checklist];
                        next[idx] = !next[idx];
                        setChecklist(next);
                        if (next.every(Boolean)) finish(120);
                      }}
                    />{' '}
                    Ngày {day + 1} - Việc {t + 1}
                  </label>
                );
              })}
            </div>
          ))}
        </div>
      )}

      {id === 'module3' && (
        <div className="space-y-3">
          <p>Điểm xanh: {greenScore}/100</p>
          {['Cây xanh', 'Đèn LED', 'Cửa sổ thông gió', 'Pin mặt trời'].map((item) => (
            <Button key={item} onClick={() => {
              const next = Math.min(100, greenScore + 25);
              setGreenScore(next);
              if (next >= 100) finish(90);
            }}>Thêm {item}</Button>
          ))}
        </div>
      )}

      {id === 'module4' && (
        <div className="space-y-3">
          <Button onClick={() => setStoryScore((s) => s + 20)}>Chọn phương án A</Button>
          <Button onClick={() => setStoryScore((s) => s + 10)}>Chọn phương án B</Button>
          <input type="range" min={0} max={100} onChange={(e) => setStoryScore((s) => s + Number(e.target.value) / 10)} />
          <Button onClick={() => finish(Math.min(100, Math.floor(storyScore)))}>Tạo năng lượng sạch</Button>
        </div>
      )}

      {id === 'module5' && (
        <div className="space-y-3">
          <Button onClick={() => setQuiz((q) => q + 20)}>Trả lời đúng/sai (+20)</Button>
          <Button onClick={() => setQuiz((q) => q + 15)}>Click năng lượng sạch (+15)</Button>
          <Button onClick={() => finish(Math.min(140, quiz))}>Chốt điểm mini game</Button>
        </div>
      )}

      {id === 'module6' && (
        <div className="space-y-3">
          <p>Khảo sát 5 câu (mô phỏng).</p>
          <Button
            onClick={async () => {
              if (!user) return;
              await addDoc(collection(db, 'surveyResponses', user.uid, 'responses'), {
                answers: { q1: 'A', q2: 'B', q3: 'A', q4: 'C', q5: 'B' },
                createdAt: serverTimestamp()
              });
              setSurveyDone(true);
              finish(75);
            }}
          >
            Gửi khảo sát
          </Button>
          {surveyDone && <p>Đã lưu khảo sát thành công!</p>}
        </div>
      )}

      {id === 'module7' && (
        <div className="space-y-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <Button key={i} onClick={() => setPoints((p) => p + 15)}>Tình huống {i + 1}</Button>
          ))}
          <Button onClick={() => finish(Math.min(90, points))}>Hoàn thành tình huống</Button>
        </div>
      )}

      {id === 'module8' && (
        <div className="space-y-3">
          <p>10 quy tắc năng lượng bền vững cho học sinh.</p>
          <canvas ref={certRef} width={600} height={320} className="w-full rounded bg-white" />
          <QRCodeSVG value="https://vercel.com" bgColor="transparent" fgColor="#ffc400" />
          <Button onClick={() => {
            const canvas = certRef.current;
            if (!canvas) return;
            const ctx = canvas.getContext('2d');
            if (!ctx) return;
            ctx.fillStyle = '#fff';
            ctx.fillRect(0, 0, 600, 320);
            ctx.fillStyle = '#000';
            ctx.font = 'bold 30px sans-serif';
            ctx.fillText('Chứng nhận Năng lượng bền vững', 40, 90);
            ctx.fillText(`Học sinh: ${user?.displayName || user?.email || 'Bạn'}`, 40, 150);
            ctx.fillText(`Ngày: ${new Date().toLocaleDateString('vi-VN')}`, 40, 210);
            const url = canvas.toDataURL('image/png');
            const a = document.createElement('a');
            a.href = url;
            a.download = 'chung-nhan.png';
            a.click();
            finish(110);
          }}>Tôi cam kết & Tải chứng nhận</Button>
        </div>
      )}

      <p className="font-semibold text-fireYellow">Điểm nhận được: {done ? points : 0}</p>
    </Card>
  );
}
