-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th5 15, 2019 lúc 04:17 PM
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
  `moTa` mediumtext NOT NULL,
  `noiDung` longtext NOT NULL,
  `nguoiDang` varchar(20) NOT NULL,
  `idChuyenMuc` int(11) NOT NULL,
  `trangThai` varchar(20) NOT NULL,
  `ngayDang` datetime NOT NULL,
  `daXoa` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `baiviet`
--

INSERT INTO `baiviet` (`idBaiViet`, `tieuDe`, `moTa`, `noiDung`, `nguoiDang`, `idChuyenMuc`, `trangThai`, `ngayDang`, `daXoa`) VALUES
(1, 'Hôm nay đúng là ngày mệt mỏi nhất trong năm', 'Sau Min, đến Hai Phượng rồi cả Lisa hay Captain America đều than thở \"mệt rồi\"!', '<h2><strong style=\"font-size:13px\">L&agrave; một ng&agrave;y thứ 7 cuối tuần trong năm nhưng 20/4/2019 phải được trao danh hiệu l&agrave; một ng&agrave;y c&oacute; qu&aacute; nhiều sự mệt mỏi. Thời tiết nắng n&oacute;ng đến suy nhược tr&ecirc;n diện rộng đ&atilde; đ&agrave;nh, l&ecirc;n facebook vốn định than thở một ch&uacute;t th&igrave; &ocirc;i th&ocirc;i... chỉ to&agrave;n thấy c&aacute;c bạn trẻ chia sẻ b&agrave;i hit mới của&nbsp;<a href=\"http://kenh14.vn/min.html\" target=\"_blank\">Min</a>&nbsp;với c&aacute;i t&ecirc;n chỉ đọc l&ecirc;n th&ocirc;i đ&atilde; muốn thở d&agrave;i: &quot;<a href=\"http://kenh14.vn/dung-yeu-nua-em-met-roi.html\" target=\"_blank\">Đừng y&ecirc;u nữa em mệt rồi</a>!&quot;</strong></h2>\r\n\r\n		<p>Mệt thật lu&ocirc;n!! Thế l&agrave; chỉ từ một b&agrave;i h&aacute;t, to&agrave;n d&acirc;n giới trẻ lại thi nhau lan truyền một c&acirc;u n&oacute;i xu hướng mới. Nhưng n&agrave;o ai biết đ&acirc;u, c&acirc;u n&oacute;i n&agrave;y lại lan truyền một sự mệt mỏi tr&ecirc;n diện rộng l&agrave;m khơi dậy ham muốn than thở của c&aacute;c thanh ni&ecirc;n cộng đồng mạng.&nbsp;</p>\r\n\r\n		<p>V&agrave; đương nhi&ecirc;n, kh&ocirc;ng thể kh&ocirc;ng l&ocirc;i k&eacute;o c&aacute;c ng&ocirc;i sao nổi tiếng v&agrave;o cuộc chơi n&agrave;y được. Từ Hoa hậu Hương Giang, Ng&ocirc; Thanh V&acirc;n cho đến Lisa hay mỹ nam Captain America sắp t&aacute;i xuất với &quot;Avengers: End Game&quot;... Ai cũng đều mang trong m&igrave;nh một sự mệt mỏi nhất định.</p>\r\n\r\n		<h3>Thay lời chị Hai Phượng c&oacute; đ&ocirc;i lời gửi tới hội Thanh S&oacute;i:</h3>\r\n\r\n		<p><a href=\"https://kenh14cdn.com/2019/4/20/min1-1555755115701797815997.jpg\" target=\"_blank\"><img alt=\"Hôm nay đúng là ngày mệt mỏi nhất trong năm: Sau Min, đến Hai Phượng rồi cả Lisa hay Captain America đều than thở mệt rồi! - Ảnh 1.\" src=\"https://kenh14cdn.com/2019/4/20/min1-1555755115701797815997.jpg\" style=\"width:100%\" /></a></p>\r\n\r\n		<p><strong>Thời tiết n&agrave;y th&igrave; chỉ cần thở th&ocirc;i l&agrave; cũng mệt đứt cả hơi rồi...</strong></p>\r\n\r\n		<p><a href=\"https://kenh14cdn.com/2019/4/20/photo2019-04-2012-51-44-15557558337381392744103.jpg\" target=\"_blank\"><img alt=\"Hôm nay đúng là ngày mệt mỏi nhất trong năm: Sau Min, đến Hai Phượng rồi cả Lisa hay Captain America đều than thở mệt rồi! - Ảnh 2.\" src=\"https://kenh14cdn.com/2019/4/20/photo2019-04-2012-51-44-15557558337381392744103.jpg\" style=\"width:100%\" /></a></p>\r\n\r\n		<h3>Nếu Hương Giang đang ấp ủ &yacute; tưởng cho phần 3 của MV mới th&igrave; cũng xin l&agrave; chị ơi...</h3>\r\n\r\n		<p><a href=\"https://kenh14cdn.com/2019/4/20/min4-1555755115698165904418.jpg\" target=\"_blank\"><img alt=\"Hôm nay đúng là ngày mệt mỏi nhất trong năm: Sau Min, đến Hai Phượng rồi cả Lisa hay Captain America đều than thở mệt rồi! - Ảnh 3.\" src=\"https://kenh14cdn.com/2019/4/20/min4-1555755115698165904418.jpg\" style=\"width:100%\" /></a></p>\r\n\r\n		<h3>Đ&atilde; nhiều ng&agrave;y tr&ocirc;i qua kể từ khi scandal nổ ra, cho hỏi kỳ &aacute;n Seungri đ&atilde; c&oacute; kết quả cuối c&ugrave;ng chưa ạ?</h3>\r\n\r\n		<p><a href=\"https://kenh14cdn.com/2019/4/20/min6-15557551156941976596911.jpg\" target=\"_blank\"><img alt=\"Hôm nay đúng là ngày mệt mỏi nhất trong năm: Sau Min, đến Hai Phượng rồi cả Lisa hay Captain America đều than thở mệt rồi! - Ảnh 4.\" src=\"https://kenh14cdn.com/2019/4/20/min6-15557551156941976596911.jpg\" style=\"width:100%\" /></a></p>\r\n\r\n		<h3>Mượn rượu tỏ t&igrave;nh từ Valentine cho đến giờ, chắc Big Daddy v&agrave; Emily cảm thấy say lắm rồi.</h3>\r\n\r\n		<p><a href=\"https://kenh14cdn.com/2019/4/20/2019-04-20-164054-15557551431451589017223.jpg\" target=\"_blank\"><img alt=\"Hôm nay đúng là ngày mệt mỏi nhất trong năm: Sau Min, đến Hai Phượng rồi cả Lisa hay Captain America đều than thở mệt rồi! - Ảnh 5.\" src=\"https://kenh14cdn.com/2019/4/20/2019-04-20-164054-15557551431451589017223.jpg\" style=\"width:100%\" /></a></p>\r\n\r\n		<h3>Trước thềm trận chiến cuối c&ugrave;ng của biệt đội Avengers v&agrave; Thanos&nbsp;sắp diễn ra, Captain America c&oacute; đ&ocirc;i lời muốn n&oacute;i...</h3>\r\n\r\n		<p><a href=\"https://kenh14cdn.com/2019/4/20/2019-04-20-164059-15557551431391171349308.jpg\" target=\"_blank\"><img alt=\"Hôm nay đúng là ngày mệt mỏi nhất trong năm: Sau Min, đến Hai Phượng rồi cả Lisa hay Captain America đều than thở mệt rồi! - Ảnh 6.\" src=\"https://kenh14cdn.com/2019/4/20/2019-04-20-164059-15557551431391171349308.jpg\" style=\"width:100%\" /></a></p>\r\n\r\n		<h3>Nhưng tất cả những lời nhắn nhủ tr&ecirc;n cũng kh&ocirc;ng thể n&agrave;o bằng c&acirc;u chuyện t&oacute;c m&aacute;i của Lisa l&uacute;c n&agrave;y. Đi diễn sương sương ở trời T&acirc;y th&ocirc;i m&agrave; ai cũng hỏi b&iacute; quyết giữ t&oacute;c m&aacute;i kh&ocirc;ng dịch chuyển l&agrave; g&igrave;? Mọi người hỏi &iacute;t th&ocirc;i, Lisa mới l&agrave; người mệt đ&acirc;y n&agrave;y!!</h3>\r\n\r\n		<p><a href=\"https://kenh14cdn.com/2019/4/20/min7-15557534000591130250245.jpg\" target=\"_blank\"><img alt=\"Hôm nay đúng là ngày mệt mỏi nhất trong năm: Sau Min, đến Hai Phượng rồi cả Lisa hay Captain America đều than thở mệt rồi! - Ảnh 7.\" src=\"https://kenh14cdn.com/2019/4/20/min7-15557534000591130250245.jpg\" style=\"width:100%\" /></a></p>\r\n\r\n		<p>&nbsp;</p>\r\n', 'huy', 1, '', '2019-05-23 00:00:00', 0);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `chuyenmuc`
--

CREATE TABLE `chuyenmuc` (
  `idChuyenMuc` int(11) NOT NULL,
  `tenChuyenMuc` varchar(100) NOT NULL,
  `daXoa` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `chuyenmuc`
--

INSERT INTO `chuyenmuc` (`idChuyenMuc`, `tenChuyenMuc`, `daXoa`) VALUES
(1, 'Điện ảnh', 0);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `nguoidung`
--

CREATE TABLE `nguoidung` (
  `username` varchar(20) NOT NULL,
  `password` varchar(20) NOT NULL,
  `ten` varchar(100) NOT NULL,
  `anhDaiDien` varchar(100) NOT NULL,
  `ngaySinh` date NOT NULL,
  `HSD` date NOT NULL,
  `loaiTaiKhoan` varchar(20) NOT NULL,
  `idChuyenMuc` int(11) NOT NULL,
  `daXoa` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `nguoidung`
--

INSERT INTO `nguoidung` (`username`, `password`, `ten`, `anhDaiDien`, `ngaySinh`, `HSD`, `loaiTaiKhoan`, `idChuyenMuc`, `daXoa`) VALUES
('huy', 'huy', 'huy', 'N/A', '2019-05-23', '2019-05-31', 'edittor', 1, 0);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `tag`
--

CREATE TABLE `tag` (
  `idTag` int(11) NOT NULL,
  `tenTag` int(11) NOT NULL,
  `daXoa` int(11) NOT NULL
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
  ADD PRIMARY KEY (`idChuyenMuc`);

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
