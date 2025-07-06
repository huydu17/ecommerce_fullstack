import mongoose from 'mongoose';
export const categoriesData = [
  {
    _id: new mongoose.Types.ObjectId('6514231234567890abcdef01'),
    name: 'Máy tính',
    description: 'Các loại máy tính để bàn và laptop, từ cấu hình cơ bản đến cao cấp, phục vụ đa dạng nhu cầu sử dụng.',
    icon: 'bi bi-laptop',
    attributes: [
      {
        key: 'CPU',
        value: ['Intel i5', 'Intel i7', 'Intel i9', 'AMD Ryzen 7', 'AMD Ryzen 9']
      },
      {
        key: 'RAM',
        value: ['8GB', '16GB', '32GB']
      },
      {
        key: 'Ổ cứng',
        value: ['SSD 512GB', 'SSD 1TB']
      },
      {
        key: 'VGA',
        value: ['Intel Arc Graphics', 'NVIDIA GTX 1650', 'NVIDIA RTX 3070', 'NVIDIA RTX 3060', 'NVIDIA GTX 1660 Ti']
      },
      {
        key: 'Hệ điều hành',
        value: ['Windows 10 Home', 'Windows 10 Pro', 'Windows 11 Home']
      },
      {
        key: 'Màn hình',
        value: ['15.6 inch', '14 inch', '17 inch']
      }
    ]
  },
  {
    _id: new mongoose.Types.ObjectId('6514231234567890abcdef02'),
    name: 'Điện thoại',
    description: 'Điện thoại di động thông minh',
    icon: 'bi bi-phone',
    attributes: [
      {
        key: 'Hãng',
        value: ['Apple', 'Samsung', 'Xiaomi', 'Oppo']
      },
      {
        key: 'Bộ nhớ',
        value: ['64GB', '128GB', '256GB']
      }
    ]
  },
  {
    _id: new mongoose.Types.ObjectId('6514231234567890abcdef03'),
    name: 'Camera',
    description: 'Máy ảnh chuyên nghiệp',
    icon: 'bi bi-camera',
    attributes: [
      {
        key: 'Độ phân giải',
        value: ['20MP', '24MP', '36MP']
      },
      {
        key: 'Loại',
        value: ['DSLR', 'Mirrorless', 'Compact']
      }
    ]
  },
  {
    _id: new mongoose.Types.ObjectId('6514231234567890abcdef04'),
    name: 'Máy tính bảng',
    description: 'Các loại máy tính bảng',
    icon: 'bi bi-tablet-landscape',
    attributes: [
      {
        key: 'Kích thước màn hình',
        value: ['8 inch', '10 inch', '12 inch']
      },
      {
        key: 'Kết nối',
        value: ['Wifi', '4G', '5G']
      }
    ]
  },
  {
    _id: new mongoose.Types.ObjectId('6514231234567890abcdef05'),
    name: 'Máy in',
    description: 'Máy in văn phòng',
    icon: 'bi bi-printer',
    attributes: [
      {
        key: 'Loại máy in',
        value: ['Laser', 'Phun mực', 'Đa năng']
      },
      {
        key: 'Khổ giấy',
        value: ['A4', 'A3', 'A5']
      }
    ]
  },
  {
    _id: new mongoose.Types.ObjectId('6514231234567890abcdef06'),
    name: 'Âm thanh',
    description: 'Thiết bị âm thanh chuyên nghiệp',
    icon: 'bi bi-headphones',
    attributes: [
      {
        key: 'Loại',
        value: ['Tai nghe', 'Loa bluetooth', 'Soundbar', 'Hệ thống âm thanh']
      },
      {
        key: 'Kết nối',
        value: ['Có dây', 'Bluetooth', 'Không dây', 'Wi-Fi']
      },
      {
        key: 'Thương hiệu',
        value: ['Sony', 'Bose', 'JBL', 'Marshall']
      }
    ]
  },
  {
    _id: new mongoose.Types.ObjectId('6514231234567890abcdef07'),
    name: 'Thiết bị gaming',
    description: 'Phụ kiện và thiết bị chuyên dụng cho game thủ',
    icon: 'bi bi-controller',
    attributes: [
      {
        key: 'Loại',
        value: ['Chuột gaming', 'Bàn phím cơ', 'Tai nghe gaming', 'Ghế gaming']
      },
      {
        key: 'Đèn nền',
        value: ['RGB', 'Đơn sắc', 'Không đèn']
      },
      {
        key: 'Thương hiệu',
        value: ['Razer', 'Logitech', 'Corsair', 'SteelSeries']
      }
    ]
  }
];
