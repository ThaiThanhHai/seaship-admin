export const orderColumns = [
  { field: "ma_don_hang", headerName: "Mã đơn", width: 80 },
  { field: "ten_nguoi_nhan", headerName: "Tên người nhận", width: 200 },
  {
    field: "so_dien_thoai",
    headerName: "Số điện thoại",
    width: 160,
  },
  {
    field: "trong_luong",
    headerName: "Trọng lượng",
    width: 120,
  },
  {
    field: "kich_thuoc",
    headerName: "Trọng lượng",
    width: 120,
  },
  {
    field: "ngay_giao",
    headerName: "Ngày giao",
    width: 140,
  },
  {
    field: "status",
    headerName: "Trạng thái",
    width: 120,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.status}`}>
          {params.row.status}
        </div>
      );
    },
  },
];

export const orderRows = [
  {
    id: 1,
    ma_don_hang: "DH01",
    ten_nguoi_nhan: "Nguyễn T Thanh Duy",
    so_dien_thoai: "0223395111",
    trong_luong: "2kg",
    kich_thuoc: "20x20",
    ngay_giao: "30-10-2022",
    status: "Đã nhận",
  },
  {
    id: 2,
    ma_don_hang: "DH01",
    ten_nguoi_nhan: "Nguyễn T Thanh Duy",
    so_dien_thoai: "0223395111",
    trong_luong: "2kg",
    kich_thuoc: "20x20",
    ngay_giao: "30-10-2022",
    status: "Đã nhận",
  },
  {
    id: 3,
    ma_don_hang: "DH01",
    ten_nguoi_nhan: "Nguyễn T Thanh Duy",
    so_dien_thoai: "0223395111",
    trong_luong: "2kg",
    kich_thuoc: "20x20",
    ngay_giao: "30-10-2022",
    status: "Đã nhận",
  },
  {
    id: 4,
    ma_don_hang: "DH01",
    ten_nguoi_nhan: "Nguyễn T Thanh Duy",
    so_dien_thoai: "0223395111",
    trong_luong: "2kg",
    kich_thuoc: "20x20",
    ngay_giao: "30-10-2022",
    status: "Đã nhận",
  },
  {
    id: 5,
    ma_don_hang: "DH01",
    ten_nguoi_nhan: "Nguyễn T Thanh Duy",
    so_dien_thoai: "0223395111",
    trong_luong: "2kg",
    kich_thuoc: "20x20",
    ngay_giao: "30-10-2022",
    status: "Đã nhận",
  },
  {
    id: 6,
    ma_don_hang: "DH01",
    ten_nguoi_nhan: "Nguyễn T Thanh Duy",
    so_dien_thoai: "0223395111",
    trong_luong: "2kg",
    kich_thuoc: "20x20",
    ngay_giao: "30-10-2022",
    status: "Đã nhận",
  },
];
