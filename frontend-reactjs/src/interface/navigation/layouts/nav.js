
import React from 'react';
// @material-ui/icons
import { Dashboard, Warning } from "@material-ui/icons";

//loadable
import loadable from 'react-loadable';
import { LoadingComponent } from 'interface/components'

const CaNhan = loadable({ loader: () => import('interface/screens/canhan/thongtin'), loading: LoadingComponent });
const MatKhau = loadable({ loader: () => import('interface/screens/canhan/matkhau'), loading: LoadingComponent });

const DanhSachDonVi = loadable({ loader: () => import('interface/screens/donvi/danhsach'), loading: LoadingComponent });
const ChiTietDonVi = loadable({ loader: () => import('interface/screens/donvi/chitiet'), loading: LoadingComponent });
const DanhSachSinhVien = loadable({ loader: () => import('interface/screens/donvi/danhsachsv'), loading: LoadingComponent });

const DanhSachNhomQuyen = loadable({ loader: () => import('interface/screens/nhomquyen/danhsach'), loading: LoadingComponent });
const ChiTietNhomQuyen = loadable({ loader: () => import('interface/screens/nhomquyen/chitiet'), loading: LoadingComponent });

const DanhSachNguoiDung = loadable({ loader: () => import('interface/screens/nguoidung/danhsach'), loading: LoadingComponent });
const ChiTietNguoiDung = loadable({ loader: () => import('interface/screens/nguoidung/chitiet'), loading: LoadingComponent });

const DanhSachMonHoc = loadable({ loader: () => import('interface/screens/monhoc/danhsach'), loading: LoadingComponent });
const ChiTietMonHoc = loadable({ loader: () => import('interface/screens/monhoc/chitiet'), loading: LoadingComponent });

const DanhSachChuyenNganh = loadable({ loader: () => import('interface/screens/chuyennganh/danhsach'), loading: LoadingComponent });
const ChiTietChuyenNganh = loadable({ loader: () => import('interface/screens/chuyennganh/chitiet'), loading: LoadingComponent });

const DanhSachCapBac = loadable({ loader: () => import('interface/screens/capbac/danhsach'), loading: LoadingComponent });
const ChiTietCapBac = loadable({ loader: () => import('interface/screens/capbac/chitiet'), loading: LoadingComponent });

const DanhSachBangDiem = loadable({ loader: () => import('interface/screens/bangdiem/danhsach'), loading: LoadingComponent });
const ChiTietBangDiem = loadable({ loader: () => import('interface/screens/bangdiem/chitiet'), loading: LoadingComponent });

const DanhSachMenu = loadable({ loader: () => import('interface/screens/menu/danhsach'), loading: LoadingComponent });
const ChiTietMenu = loadable({ loader: () => import('interface/screens/menu/chitiet'), loading: LoadingComponent });

const PhanQuyen = loadable({ loader: () => import('interface/screens/phanquyen'), loading: LoadingComponent });

const DanhSachLogApi = loadable({ loader: () => import('interface/screens/logapi/danhsach'), loading: LoadingComponent });
const ChiTietLogApi = loadable({ loader: () => import('interface/screens/logapi/chitiet'), loading: LoadingComponent });

const DanhSachDanhMuc = loadable({ loader: () => import('interface/screens/danhmucungdung/danhsach'), loading: LoadingComponent });
const ChiTietDanhMuc = loadable({ loader: () => import('interface/screens/danhmucungdung/chitiet'), loading: LoadingComponent });

const HomePage = loadable({ loader: () => import('interface/screens/home'), loading: LoadingComponent });
const Page401 = loadable({ loader: () => import('interface/screens/error/401'), loading: LoadingComponent });
const Page404 = loadable({ loader: () => import('interface/screens/error/404'), loading: LoadingComponent });
const Page500 = loadable({ loader: () => import('interface/screens/error/500'), loading: LoadingComponent });

const dashboardRoutes = [
  {
    path: "/ca-nhan",
    component: CaNhan,
    roles: []
  },
  {
    path: "/mat-khau",
    component: MatKhau,
    roles: []
  },
  {
    path: "/home",
    component: HomePage,
    roles: []
  },
  {
    path: "/401",
    component: Page401,
    roles: []
  },
  {
    path: "/404",
    component: Page404,
    roles: []
  },
  {
    path: "/500",
    component: Page500,
    roles: []
  },
  {
    path: "/quan-ly/don-vi/danhsachsv/:id",
    component: DanhSachSinhVien,
    roles: []
  },
  {
    path: "/quan-ly/don-vi/:id",
    component: ChiTietDonVi,
    roles: []
  },
  {
    path: "/quan-ly/don-vi",
    component: DanhSachDonVi,
    roles: []
  },
  {
    path: "/quan-ly/nguoi-dung/:id",
    component: ChiTietNguoiDung,
    roles: []
  },
  {
    path: "/quan-ly/nguoi-dung",
    component: DanhSachNguoiDung,
    roles: []
  },
  {
    path: "/quan-ly/ql-cap-bac/:id",
    component: ChiTietCapBac,
    roles: []
  },
  {
    path: "/quan-ly/ql-cap-bac",
    component: DanhSachCapBac,
    roles: []
  },
  {
    path: "/quan-ly/chuyen-nganh/:id",
    component: ChiTietChuyenNganh,
    roles: []
  },
  {
    path: "/quan-ly/chuyen-nganh",
    component: DanhSachChuyenNganh,
    roles: []
  },
  {
    path: "/quan-ly/bang-diem/:id",
    component: ChiTietBangDiem,
    roles: []
  },
  {
    path: "/quan-ly/bang-diem",
    component: DanhSachBangDiem,
    roles: []
  },
  {
    path: "/quan-ly/mon-hoc/:id",
    component: ChiTietMonHoc,
    roles: []
  },
  {
    path: "/quan-ly/mon-hoc",
    component: DanhSachMonHoc,
    roles: []
  },
  {
    path: "/quan-tri/menu/:id",
    component: ChiTietMenu,
    roles: []
  },
  {
    path: "/quan-tri/menu",
    component: DanhSachMenu,
    roles: []
  },
  {
    path: "/quan-tri/danh-muc-ung-dung/:id",
    component: ChiTietDanhMuc,
    roles: []
  },
  {
    path: "/quan-tri/danh-muc-ung-dung",
    component: DanhSachDanhMuc,
    roles: []
  },
  {
    path: "/quan-tri/log-api/:id",
    component: ChiTietLogApi,
    roles: []
  },
  {
    path: "/quan-tri/log-api",
    component: DanhSachLogApi,
    roles: []
  },
  {
    path: "/phan-quyen/nhom-quyen/:id",
    component: ChiTietNhomQuyen,
    roles: []
  },
  {
    path: "/phan-quyen/nhom-quyen",
    component: DanhSachNhomQuyen,
    roles: []
  },
  {
    path: "/phan-quyen/phan-quyen",
    component: PhanQuyen,
    roles: []
  },

  { redirect: true, path: "*", to: "/home", navbarName: "Redirect" }
];

export default dashboardRoutes;
