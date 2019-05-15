-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th5 15, 2019 lúc 07:28 PM
-- Phiên bản máy phục vụ: 10.1.38-MariaDB
-- Phiên bản PHP: 7.3.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `16thnewsdb`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `baiviet`
--

CREATE TABLE `baiviet` (
  `idBaiViet` int(11) NOT NULL,
  `tieuDe` varchar(100) NOT NULL,
  `anhDaiDien` varchar(100) NOT NULL,
  `moTa` mediumtext NOT NULL,
  `noiDung` longtext NOT NULL,
  `nguoiDang` varchar(20) NOT NULL,
  `idChuyenMuc` int(11) NOT NULL,
  `trangThai` varchar(20) NOT NULL,
  `ngayDang` datetime NOT NULL,
  `daXoa` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `chuyenmuc`
--

CREATE TABLE `chuyenmuc` (
  `idChuyenMuc` int(11) NOT NULL,
  `tenChuyenMuc` varchar(100) NOT NULL,
  `daXoa` tinyint(1) DEFAULT NULL,
  `chuyenMucCha` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `comment`
--

CREATE TABLE `comment` (
  `nguoiBinhLuan` varchar(20) NOT NULL,
  `baiBinhLuan` int(11) NOT NULL,
  `ngayBinhLuan` datetime NOT NULL,
  `noiDung` mediumtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `nguoidung`
--

CREATE TABLE `nguoidung` (
  `username` varchar(20) NOT NULL,
  `password` varchar(20) NOT NULL,
  `ten` varchar(100) DEFAULT NULL,
  `anhDaiDien` varchar(100) DEFAULT NULL,
  `ngaySinh` date DEFAULT NULL,
  `HSD` date DEFAULT NULL,
  `loaiTaiKhoan` varchar(20) NOT NULL,
  `idChuyenMuc` int(11) DEFAULT NULL,
  `daXoa` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `tag`
--

CREATE TABLE `tag` (
  `idTag` int(11) NOT NULL,
  `tenTag` int(11) NOT NULL,
  `daXoa` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `thuoctag`
--

CREATE TABLE `thuoctag` (
  `idBaiViet` int(11) NOT NULL,
  `idTag` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `baiviet`
--
ALTER TABLE `baiviet`
  ADD PRIMARY KEY (`idBaiViet`),
  ADD KEY `nguoiDang` (`nguoiDang`),
  ADD KEY `idChuyen,Muc` (`idChuyenMuc`);

--
-- Chỉ mục cho bảng `chuyenmuc`
--
ALTER TABLE `chuyenmuc`
  ADD PRIMARY KEY (`idChuyenMuc`),
  ADD KEY `chuyenMucCha` (`chuyenMucCha`);

--
-- Chỉ mục cho bảng `comment`
--
ALTER TABLE `comment`
  ADD PRIMARY KEY (`nguoiBinhLuan`,`baiBinhLuan`),
  ADD KEY `baiBinhLuan` (`baiBinhLuan`);

--
-- Chỉ mục cho bảng `nguoidung`
--
ALTER TABLE `nguoidung`
  ADD PRIMARY KEY (`username`),
  ADD KEY `idChuyenMuc` (`idChuyenMuc`);

--
-- Chỉ mục cho bảng `tag`
--
ALTER TABLE `tag`
  ADD PRIMARY KEY (`idTag`);

--
-- Chỉ mục cho bảng `thuoctag`
--
ALTER TABLE `thuoctag`
  ADD PRIMARY KEY (`idBaiViet`,`idTag`),
  ADD KEY `idTag` (`idTag`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `baiviet`
--
ALTER TABLE `baiviet`
  MODIFY `idBaiViet` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT cho bảng `chuyenmuc`
--
ALTER TABLE `chuyenmuc`
  MODIFY `idChuyenMuc` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT cho bảng `tag`
--
ALTER TABLE `tag`
  MODIFY `idTag` int(11) NOT NULL AUTO_INCREMENT;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `baiviet`
--
ALTER TABLE `baiviet`
  ADD CONSTRAINT `baiviet_ibfk_1` FOREIGN KEY (`nguoiDang`) REFERENCES `nguoidung` (`username`),
  ADD CONSTRAINT `baiviet_ibfk_2` FOREIGN KEY (`idChuyenMuc`) REFERENCES `chuyenmuc` (`idChuyenMuc`);

--
-- Các ràng buộc cho bảng `chuyenmuc`
--
ALTER TABLE `chuyenmuc`
  ADD CONSTRAINT `chuyenmuc_ibfk_1` FOREIGN KEY (`chuyenMucCha`) REFERENCES `chuyenmuc` (`idChuyenMuc`);

--
-- Các ràng buộc cho bảng `comment`
--
ALTER TABLE `comment`
  ADD CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`nguoiBinhLuan`) REFERENCES `nguoidung` (`username`),
  ADD CONSTRAINT `comment_ibfk_2` FOREIGN KEY (`baiBinhLuan`) REFERENCES `baiviet` (`idBaiViet`);

--
-- Các ràng buộc cho bảng `nguoidung`
--
ALTER TABLE `nguoidung`
  ADD CONSTRAINT `nguoidung_ibfk_1` FOREIGN KEY (`idChuyenMuc`) REFERENCES `chuyenmuc` (`idChuyenMuc`);

--
-- Các ràng buộc cho bảng `thuoctag`
--
ALTER TABLE `thuoctag`
  ADD CONSTRAINT `thuoctag_ibfk_1` FOREIGN KEY (`idBaiViet`) REFERENCES `baiviet` (`idBaiViet`),
  ADD CONSTRAINT `thuoctag_ibfk_2` FOREIGN KEY (`idTag`) REFERENCES `tag` (`idTag`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
