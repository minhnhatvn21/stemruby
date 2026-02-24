export type ModuleMeta = {
  id: string;
  title: string;
  shortDescription: string;
  maxPoints: number;
};

export const modules: ModuleMeta[] = [
  { id: 'module1', title: 'Ngôi nhà tiết kiệm điện', shortDescription: 'Tìm điểm lãng phí điện trong hình', maxPoints: 80 },
  { id: 'module2', title: 'Thử thách 7 ngày sống xanh', shortDescription: 'Hoàn thành checklist 7 ngày', maxPoints: 120 },
  { id: 'module3', title: 'Thiết kế Trường học Xanh', shortDescription: 'Kéo thả vật phẩm để tăng điểm xanh', maxPoints: 90 },
  { id: 'module4', title: 'Siêu anh hùng Năng lượng tái tạo', shortDescription: 'Chọn tình tiết + chỉnh slider năng lượng', maxPoints: 100 },
  { id: 'module5', title: 'Săn năng lượng sạch', shortDescription: 'Quiz đúng/sai và mini game click', maxPoints: 140 },
  { id: 'module6', title: 'Bản đồ tiết kiệm điện của lớp em', shortDescription: 'Khảo sát nhanh + xem thống kê', maxPoints: 75 },
  { id: 'module7', title: 'Chọn đúng – Sai trong lớp học', shortDescription: 'Giải quyết 6 tình huống', maxPoints: 90 },
  { id: 'module8', title: 'Bộ quy tắc Năng lượng bền vững', shortDescription: 'Cam kết và tạo chứng nhận PNG', maxPoints: 110 }
];
