import mongoose from 'mongoose';

export const productsData = [
  // Máy tính - Desktop & Laptop (10 products)
  {
    _id: new mongoose.Types.ObjectId('67305f3c417471294b040b20'),
    name: 'Laptop HP 15-fd1045TU 9Z2X1PA (Intel i5, RAM 16GB, SSD 512GB, VGA Intel Arc, Màn Hình 15.6inch FHD, Windows 11, Màu Bạc)',
    shortDescription: 'Laptop HP 15-fd1045TU với cấu hình mạnh mẽ, lý tưởng cho công việc và giải trí đa năng',
    description:
      'Laptop HP 15-fd1045TU (9Z2X1PA) là lựa chọn tuyệt vời cho những ai cần một chiếc laptop mạnh mẽ, đa năng. Với bộ vi xử lý Intel Core i5 thế hệ 12, RAM 16GB và ổ cứng SSD 512GB, chiếc laptop này giúp bạn xử lý mượt mà các tác vụ văn phòng, giải trí và chơi game nhẹ nhàng. Màn hình FHD 15.6 inch đem lại hình ảnh sắc nét và sống động. Đặc biệt, với card đồ họa Intel Arc, bạn có thể trải nghiệm những tựa game yêu thích ở mức đồ họa tốt.Ngoài hiệu năng ấn tượng, HP 15-fd1045TU còn có thiết kế tinh tế với màu bạc sang trọng, kết hợp cùng hệ điều hành Windows 11, mang lại trải nghiệm người dùng mượt mà và hiện đại. Đây là một lựa chọn lý tưởng cho những ai đang tìm kiếm một chiếc laptop đa dụng, hiệu suất cao, với giá trị tuyệt vời.',
    category: new mongoose.Types.ObjectId('6514231234567890abcdef01'),
    price: 17490000,
    totalQty: 50,
    totalSold: 20,
    totalReviews: 0,
    averageRating: 4.8,
    attributes: [
      { key: 'CPU', value: 'Intel i5' },
      { key: 'RAM', value: '16GB' },
      { key: 'Ổ cứng', value: 'SSD 512GB' },
      { key: 'VGA', value: 'Intel Arc Graphics' },
      { key: 'Hệ điều hành', value: 'Windows 11 Home 64' },
      { key: 'Màn hình', value: '15.6 inch' }
    ],
    reviews: [],
    images: [
      {
        url: 'https://res.cloudinary.com/db5xbbdbc/image/upload/v1733413399/product_ecommerce/Screenshot_2024-12-05_224312_amqp9q.png',
        public_id: 'image-1'
      },
      {
        url: 'https://res.cloudinary.com/db5xbbdbc/image/upload/v1733413399/product_ecommerce/Screenshot_2024-12-05_224232_vcscrw.png',
        public_id: 'image-2'
      },
      {
        url: 'https://res.cloudinary.com/db5xbbdbc/image/upload/v1733413399/product_ecommerce/Screenshot_2024-12-05_224327_bqnctb.png',
        public_id: 'pc-gaming-1'
      }
    ]
  },
  {
    _id: new mongoose.Types.ObjectId('67305f3c417471294b040b21'),
    name: 'Laptop Dell Inspiron 15 (Intel Core i7, RAM 16GB, SSD 512GB, VGA NVIDIA GTX 1650, Màn Hình 15.6 inch FHD, Windows 10)',
    shortDescription: 'Laptop Dell Inspiron với hiệu năng mạnh mẽ, lý tưởng cho công việc và giải trí.',
    description:
      'Laptop Dell Inspiron 15 trang bị vi xử lý Intel Core i7, RAM 16GB, ổ cứng SSD 512GB và card đồ họa NVIDIA GTX 1650 cho khả năng xử lý mượt mà các tác vụ văn phòng, thiết kế đồ họa, và chơi game. Màn hình FHD 15.6 inch mang đến trải nghiệm hình ảnh tuyệt vời. Windows 10 giúp làm việc hiệu quả hơn.',
    category: new mongoose.Types.ObjectId('6514231234567890abcdef01'),
    price: 18990000,
    totalQty: 30,
    totalSold: 12,
    totalReviews: 5,
    averageRating: 4.7,
    attributes: [
      { key: 'CPU', value: 'Intel i7' },
      { key: 'RAM', value: '16GB' },
      { key: 'Ổ cứng', value: 'SSD 512GB' },
      { key: 'VGA', value: 'NVIDIA GTX 1650' },
      { key: 'Hệ điều hành', value: 'Windows 10 Pro' },
      { key: 'Màn hình', value: '15.6 inch' }
    ],
    reviews: [],
    images: [
      {
        url: 'https://res.cloudinary.com/db5xbbdbc/image/upload/v1733415591/product_ecommerce/Screenshot_2024-12-05_231950_iwzi9q.png',
        public_id: 'laptop-dell-1'
      },
      {
        url: 'https://res.cloudinary.com/db5xbbdbc/image/upload/v1733415590/product_ecommerce/Screenshot_2024-12-05_231930_tk6r4a.png',
        public_id: 'laptop-dell-1'
      },
      {
        url: 'https://res.cloudinary.com/db5xbbdbc/image/upload/v1733415590/product_ecommerce/Screenshot_2024-12-05_231942_p4bqno.png',
        public_id: 'laptop-dell-1'
      }
    ]
  },
  {
    _id: new mongoose.Types.ObjectId('67305f3c417471294b040b22'),
    name: 'Laptop ASUS ROG Strix G15 (AMD Ryzen 9, RAM 32GB, SSD 1TB, VGA NVIDIA RTX 3070)',
    shortDescription: 'Laptop gaming ASUS với cấu hình cực mạnh, lý tưởng cho game thủ chuyên nghiệp.',
    description:
      'ASUS ROG Strix G15 là lựa chọn lý tưởng cho game thủ với bộ vi xử lý AMD Ryzen 9, RAM 32GB và SSD 1TB. Card đồ họa NVIDIA RTX 3070 mang đến khả năng xử lý đồ họa đỉnh cao. Màn hình 15.6 inch FHD 144Hz cho trải nghiệm gaming mượt mà. Hệ điều hành Windows 11 mới nhất giúp tối ưu hóa hiệu suất.',
    category: new mongoose.Types.ObjectId('6514231234567890abcdef01'),
    price: 32990000,
    totalQty: 20,
    totalSold: 8,
    totalReviews: 2,
    averageRating: 4.9,
    attributes: [
      { key: 'CPU', value: 'AMD Ryzen 9' },
      { key: 'RAM', value: '32GB' },
      { key: 'Ổ cứng', value: 'SSD 1TB' },
      { key: 'VGA', value: 'NVIDIA RTX 3070' },
      { key: 'Hệ điều hành', value: 'Windows 11 Home' },
      { key: 'Màn hình', value: '14 inch' }
    ],
    reviews: [],
    images: [
      {
        url: 'https://res.cloudinary.com/db5xbbdbc/image/upload/v1733415711/product_ecommerce/Screenshot_2024-12-05_232141_ee0gk2.png',
        public_id: 'asus-rog-1'
      },
      {
        url: 'https://res.cloudinary.com/db5xbbdbc/image/upload/v1733415711/product_ecommerce/Screenshot_2024-12-05_232155_fhcwes.png',
        public_id: 'asus-rog-1'
      }
    ]
  },
  {
    _id: new mongoose.Types.ObjectId('67305f3c417471294b040b23'),
    name: 'Laptop HP Omen 15 (Intel i9, RAM 8GB, SSD 512GB, VGA NVIDIA GTX 1660 Ti)',
    shortDescription: 'Laptop HP Omen, thiết kế mạnh mẽ cho game thủ và các tác vụ đồ họa nặng.',
    description:
      'Laptop HP Omen 15 trang bị Intel Core i9, RAM 16GB, ổ cứng SSD 512GB và card đồ họa NVIDIA GTX 1660 Ti giúp xử lý nhanh chóng các tác vụ nặng. Màn hình 15.6 inch Full HD 144Hz cực kỳ sắc nét, tối ưu cho chơi game và làm việc đồ họa. Cùng với hệ điều hành Windows 10, HP Omen mang đến một trải nghiệm tuyệt vời.',
    category: new mongoose.Types.ObjectId('6514231234567890abcdef01'),
    price: 24990000,
    totalQty: 25,
    totalSold: 15,
    totalReviews: 7,
    averageRating: 4.6,
    attributes: [
      { key: 'CPU', value: 'Intel i9' },
      { key: 'RAM', value: '8GB' },
      { key: 'Ổ cứng', value: 'SSD 512GB' },
      { key: 'VGA', value: 'NVIDIA GTX 1660 Ti' },
      { key: 'Hệ điều hành', value: 'Windows 10 Home' },
      { key: 'Màn hình', value: '15.6 inch' }
    ],
    reviews: [],
    images: [
      {
        url: 'https://res.cloudinary.com/db5xbbdbc/image/upload/v1733415773/product_ecommerce/Screenshot_2024-12-05_232302_awjzwb.png',
        public_id: 'hp-omen-1'
      }
    ]
  },
  {
    _id: new mongoose.Types.ObjectId('67305f3c417471294b040b24'),
    name: 'Laptop Acer Predator Helios 300 (Intel i7, RAM 16GB, SSD 1TB, VGA NVIDIA RTX 3070)',
    shortDescription: 'Laptop gaming cao cấp với cấu hình mạnh mẽ, màn hình 144Hz.',
    description:
      'Acer Predator Helios 300 được trang bị bộ vi xử lý Intel Core i7, RAM 16GB, SSD 1TB và card đồ họa NVIDIA RTX 3070 cho khả năng chơi game và xử lý đồ họa mạnh mẽ. Màn hình 15.6 inch Full HD 144Hz cho trải nghiệm chơi game mượt mà và sắc nét. Hệ điều hành Windows 11 giúp nâng cao hiệu suất sử dụng.',
    category: new mongoose.Types.ObjectId('6514231234567890abcdef01'),
    price: 28990000,
    totalQty: 40,
    totalSold: 18,
    totalReviews: 4,
    averageRating: 4.8,
    attributes: [
      { key: 'CPU', value: 'Intel i7' },
      { key: 'RAM', value: '16GB' },
      { key: 'Ổ cứng', value: 'SSD 1TB' },
      { key: 'VGA', value: 'NVIDIA RTX 3070' },
      { key: 'Hệ điều hành', value: 'Windows 11 Home' },
      { key: 'Màn hình', value: '17 inch' }
    ],
    reviews: [],
    images: [
      {
        url: 'https://res.cloudinary.com/db5xbbdbc/image/upload/v1733415841/product_ecommerce/Screenshot_2024-12-05_232413_cnvfpk.png',
        public_id: 'acer-predator-1'
      }
    ]
  },
  {
    _id: new mongoose.Types.ObjectId('67305f3c417471294b040b25'),
    name: 'Laptop Lenovo Legion 5 (AMD Ryzen 7, RAM 16GB, SSD 512GB, VGA NVIDIA RTX 3060)',
    shortDescription: 'Laptop gaming mạnh mẽ với thiết kế tối ưu cho game thủ.',
    description:
      'Laptop Lenovo Legion 5 trang bị bộ vi xử lý AMD Ryzen 7, RAM 16GB và ổ cứng SSD 512GB. Card đồ họa NVIDIA RTX 3060 mang lại hiệu suất cao cho các trò chơi hiện đại. Màn hình 15.6 inch Full HD với tốc độ làm mới 120Hz cho trải nghiệm chơi game mượt mà. Được cài sẵn hệ điều hành Windows 10.',
    category: new mongoose.Types.ObjectId('6514231234567890abcdef01'),
    price: 19990000,
    totalQty: 50,
    totalSold: 22,
    totalReviews: 6,
    averageRating: 4.7,
    attributes: [
      { key: 'CPU', value: 'AMD Ryzen 7' },
      { key: 'RAM', value: '16GB' },
      { key: 'Ổ cứng', value: 'SSD 512GB' },
      { key: 'VGA', value: 'NVIDIA RTX 3060' },
      { key: 'Hệ điều hành', value: 'Windows 10 Home' },
      { key: 'Màn hình', value: '17 inch' }
    ],
    reviews: [],
    images: [
      {
        url: 'https://res.cloudinary.com/db5xbbdbc/image/upload/v1733415711/product_ecommerce/Screenshot_2024-12-05_232155_fhcwes.png',
        public_id: 'lenovo-legion-1'
      }
    ]
  },

  //điện thoại
  {
    _id: new mongoose.Types.ObjectId('67305f3c417471294b040b26'),
    name: 'Apple iPhone 14 Pro Max 128GB',
    shortDescription: 'iPhone 14 Pro Max với màn hình Super Retina XDR, chip A16 Bionic.',
    description:
      'iPhone 14 Pro Max với màn hình 6.7 inch Super Retina XDR, chip A16 Bionic mạnh mẽ, bộ nhớ trong 128GB, và hệ thống camera Pro với cảm biến 48MP. Được trang bị Face ID và hệ điều hành iOS 16, mang lại trải nghiệm mượt mà và bảo mật tuyệt đối.',
    category: new mongoose.Types.ObjectId('6514231234567890abcdef02'),
    price: 32990000,
    totalQty: 50,
    totalSold: 30,
    totalReviews: 120,
    averageRating: 4.9,
    attributes: [
      { key: 'Hãng', value: 'Apple' },
      { key: 'Bộ nhớ', value: '128GB' }
    ],
    reviews: [],
    images: [
      {
        url: 'https://res.cloudinary.com/db5xbbdbc/image/upload/v1733415926/product_ecommerce/iphone-14-pro-max-tim-purple-iphonedoc-vinh-ha-tinh_pwk9qo.jpg',
        public_id: 'iphone14promax-1'
      },
      {
        url: 'https://res.cloudinary.com/db5xbbdbc/image/upload/v1733415926/product_ecommerce/iphone-14-pro-max-tim-purple-iphonedoc-vinh-ha-tinh_pwk9qo.jpg',
        public_id: 'iphone14promax-2'
      },
      {
        url: 'https://res.cloudinary.com/db5xbbdbc/image/upload/v1733415926/product_ecommerce/iphone-14-pro-max-tim-purple-iphonedoc-vinh-ha-tinh_pwk9qo.jpg',
        public_id: 'iphone14promax-3'
      }
    ]
  },
  {
    _id: new mongoose.Types.ObjectId('67305f3c417471294b040b27'),
    name: 'Samsung Galaxy S23 Ultra 256GB',
    shortDescription: 'Samsung Galaxy S23 Ultra với camera 200MP và màn hình Dynamic AMOLED 2X.',
    description:
      'Samsung Galaxy S23 Ultra sở hữu màn hình 6.8 inch Dynamic AMOLED 2X, camera chính 200MP, và bộ xử lý Snapdragon 8 Gen 2. Bộ nhớ trong 256GB, kết hợp cùng viên pin 5000mAh cho hiệu suất mạnh mẽ và thời gian sử dụng lâu dài.',
    category: new mongoose.Types.ObjectId('6514231234567890abcdef02'),
    price: 35990000,
    totalQty: 40,
    totalSold: 25,
    totalReviews: 90,
    averageRating: 4.8,
    attributes: [
      { key: 'Hãng', value: 'Samsung' },
      { key: 'Bộ nhớ', value: '256GB' }
    ],
    reviews: [],
    images: [
      {
        url: 'https://res.cloudinary.com/db5xbbdbc/image/upload/v1733415979/product_ecommerce/samsung-galaxy-s23-ultra-thumbnail-xanh-240524024505_ikrobh.webp',
        public_id: 'samsunggalaxy-s23ultra-1'
      },
      {
        url: 'https://res.cloudinary.com/db5xbbdbc/image/upload/v1733415979/product_ecommerce/samsung-galaxy-s23-ultra-thumbnail-xanh-240524024505_ikrobh.webp',
        public_id: 'samsunggalaxy-s23ultra-2'
      }
    ]
  },
  {
    _id: new mongoose.Types.ObjectId('67305f3c417471294b040b28'),
    name: 'Xiaomi 13 Pro 128GB',
    shortDescription: 'Xiaomi 13 Pro với camera 50MP và màn hình AMOLED 120Hz.',
    description:
      'Xiaomi 13 Pro có màn hình AMOLED 6.73 inch với tần số quét 120Hz, bộ vi xử lý Snapdragon 8 Gen 2, và camera chính 50MP. Bộ nhớ trong 128GB giúp bạn lưu trữ mọi dữ liệu quan trọng, và viên pin 4820mAh cho thời gian sử dụng cả ngày.',
    category: new mongoose.Types.ObjectId('6514231234567890abcdef02'),
    price: 17990000,
    totalQty: 60,
    totalSold: 40,
    totalReviews: 50,
    averageRating: 4.7,
    attributes: [
      { key: 'Hãng', value: 'Xiaomi' },
      { key: 'Bộ nhớ', value: '128GB' }
    ],
    reviews: [],
    images: [
      {
        url: 'https://res.cloudinary.com/db5xbbdbc/image/upload/v1733416058/product_ecommerce/1738488820_rmjxux.jpg',
        public_id: 'xiaomi13pro-1'
      },
      {
        url: 'https://res.cloudinary.com/db5xbbdbc/image/upload/v1733416058/product_ecommerce/1738488820_rmjxux.jpg',
        public_id: 'xiaomi13pro-1'
      }
    ]
  },
  {
    _id: new mongoose.Types.ObjectId('67305f3c417471294b040b29'),
    name: 'Oppo Find X5 Pro 256GB',
    shortDescription: 'Oppo Find X5 Pro với camera 50MP và màn hình AMOLED 120Hz.',
    description:
      'Oppo Find X5 Pro trang bị màn hình AMOLED 6.7 inch với tần số quét 120Hz, camera chính 50MP và vi xử lý Snapdragon 8 Gen 1. Bộ nhớ trong 256GB, viên pin 5000mAh và sạc nhanh 80W giúp bạn sử dụng cả ngày mà không lo hết pin.',
    category: new mongoose.Types.ObjectId('6514231234567890abcdef02'),
    price: 24990000,
    totalQty: 30,
    totalSold: 15,
    totalReviews: 60,
    averageRating: 4.6,
    attributes: [
      { key: 'Hãng', value: 'Oppo' },
      { key: 'Bộ nhớ', value: '256GB' }
    ],
    reviews: [],
    images: [
      {
        url: 'https://res.cloudinary.com/db5xbbdbc/image/upload/v1733416095/product_ecommerce/oppo-find-x5-pro-5g-12gb-256gb-da-kich-hoat-1_osepml.webp',
        public_id: 'oppofindx5pro-1'
      },
      {
        url: 'https://res.cloudinary.com/db5xbbdbc/image/upload/v1733416095/product_ecommerce/oppo-find-x5-pro-5g-12gb-256gb-da-kich-hoat-1_osepml.webp',
        public_id: 'oppofindx5pro-1'
      }
    ]
  },
  {
    _id: new mongoose.Types.ObjectId('67305f3c417471294b040b30'),
    name: 'Samsung Galaxy Z Fold 5 256GB',
    shortDescription: 'Samsung Galaxy Z Fold 5 với màn hình gập, hiệu năng mạnh mẽ.',
    description:
      'Samsung Galaxy Z Fold 5 mang đến trải nghiệm màn hình gập 7.6 inch Dynamic AMOLED 2X. Sản phẩm trang bị chip Snapdragon 8 Gen 2, bộ nhớ trong 256GB và camera chính 50MP. Đây là chiếc smartphone lý tưởng cho những ai yêu thích công nghệ mới.',
    category: new mongoose.Types.ObjectId('6514231234567890abcdef02'),
    price: 57990000,
    totalQty: 20,
    totalSold: 5,
    totalReviews: 10,
    averageRating: 4.8,
    attributes: [
      { key: 'Hãng', value: 'Samsung' },
      { key: 'Bộ nhớ', value: '256GB' }
    ],
    reviews: [],
    images: [
      {
        url: 'https://res.cloudinary.com/db5xbbdbc/image/upload/v1733416188/product_ecommerce/samsung-galaxy-z-fold5-12gb-256gb-chinh-hang-lg-192549_nn8gpd.jpg',
        public_id: 'galaxyzfold5-1'
      },
      {
        url: 'https://res.cloudinary.com/db5xbbdbc/image/upload/v1733416188/product_ecommerce/samsung-galaxy-z-fold5-12gb-256gb-chinh-hang-lg-192549_nn8gpd.jpg',
        public_id: 'galaxyzfold5-1'
      }
    ]
  },
  {
    _id: new mongoose.Types.ObjectId('67305f3c417471294b040b31'),
    name: 'iPhone 13 128GB',
    shortDescription: 'iPhone 13 với màn hình Super Retina XDR, chip A15 Bionic.',
    description:
      'iPhone 13 với màn hình Super Retina XDR 6.1 inch, chip A15 Bionic mạnh mẽ, bộ nhớ trong 128GB và camera kép 12MP. Thiết kế sang trọng với viên pin lâu dài và hỗ trợ 5G.',
    category: new mongoose.Types.ObjectId('6514231234567890abcdef02'),
    price: 24990000,
    totalQty: 80,
    totalSold: 45,
    totalReviews: 150,
    averageRating: 4.7,
    attributes: [
      { key: 'Hãng', value: 'Apple' },
      { key: 'Bộ nhớ', value: '128GB' }
    ],
    reviews: [],
    images: [
      {
        url: 'https://res.cloudinary.com/db5xbbdbc/image/upload/v1733416274/product_ecommerce/Screenshot_2024-12-05_233118_fcnrmj.png',
        public_id: 'iphone13-1'
      }
    ]
  },
  // Camera (6 products)
  {
    _id: new mongoose.Types.ObjectId('67305f3c417471294b040b32'),
    name: 'Canon EOS 90D DSLR Camera 24MP',
    shortDescription: 'Máy ảnh Canon EOS 90D với độ phân giải 24MP, thích hợp cho nhiếp ảnh chuyên nghiệp.',
    description:
      'Canon EOS 90D là máy ảnh DSLR cao cấp với cảm biến CMOS APS-C 24.1MP, quay video 4K và khả năng chụp ảnh liên tục 10 fps. Màn hình cảm ứng 3 inch và hệ thống lấy nét tự động Dual Pixel AF mang lại khả năng chụp ảnh sắc nét và chính xác.',
    category: new mongoose.Types.ObjectId('6514231234567890abcdef03'),
    price: 26990000,
    totalQty: 30,
    totalSold: 15,
    totalReviews: 35,
    averageRating: 4.8,
    attributes: [
      { key: 'Độ phân giải', value: '24MP' },
      { key: 'Loại', value: 'DSLR' }
    ],
    reviews: [],
    images: [
      {
        url: 'https://via.placeholder.com/200',
        public_id: 'canon90d-1'
      }
    ]
  },
  {
    _id: new mongoose.Types.ObjectId('67305f3c417471294b040b33'),
    name: 'Sony Alpha 7 IV Mirrorless Camera 33MP',
    shortDescription: 'Máy ảnh mirrorless Sony Alpha 7 IV với độ phân giải 33MP, phù hợp cho nhiếp ảnh và quay phim.',
    description:
      'Sony Alpha 7 IV là máy ảnh mirrorless full-frame 33MP, với khả năng quay video 4K, hệ thống lấy nét tự động 759 điểm và màn hình cảm ứng 3 inch. Đây là một lựa chọn tuyệt vời cho nhiếp ảnh gia và videographer chuyên nghiệp.',
    category: new mongoose.Types.ObjectId('6514231234567890abcdef03'),
    price: 46990000,
    totalQty: 25,
    totalSold: 12,
    totalReviews: 20,
    averageRating: 4.9,
    attributes: [
      { key: 'Độ phân giải', value: '33MP' },
      { key: 'Loại', value: 'Mirrorless' }
    ],
    reviews: [],
    images: [
      {
        url: 'https://via.placeholder.com/200',
        public_id: 'sonya7iv-1'
      }
    ]
  },
  {
    _id: new mongoose.Types.ObjectId('67305f3c417471294b040b34'),
    name: 'Nikon D7500 DSLR Camera 20MP',
    shortDescription: 'Nikon D7500 với cảm biến 20MP và quay video 4K UHD.',
    description:
      'Nikon D7500 là máy ảnh DSLR được trang bị cảm biến APS-C 20.9MP, hệ thống lấy nét tự động 51 điểm và khả năng quay video 4K UHD. Với màn hình xoay lật 3.2 inch và thiết kế bền bỉ, máy thích hợp cho cả chụp ảnh và quay video.',
    category: new mongoose.Types.ObjectId('6514231234567890abcdef03'),
    price: 18990000,
    totalQty: 40,
    totalSold: 18,
    totalReviews: 50,
    averageRating: 4.7,
    attributes: [
      { key: 'Độ phân giải', value: '20MP' },
      { key: 'Loại', value: 'DSLR' }
    ],
    reviews: [],
    images: [
      {
        url: 'https://via.placeholder.com/200',
        public_id: 'nikond7500-1'
      }
    ]
  },
  {
    _id: new mongoose.Types.ObjectId('67305f3c417471294b040b35'),
    name: 'Fujifilm X-T4 Mirrorless Camera 26MP',
    shortDescription: 'Máy ảnh Fujifilm X-T4 với cảm biến 26MP, hỗ trợ quay video 4K.',
    description:
      'Fujifilm X-T4 là máy ảnh mirrorless với cảm biến X-Trans CMOS 26.1MP, quay video 4K/60p và hỗ trợ hệ thống lấy nét tự động nâng cao. Với thiết kế cổ điển và khả năng chụp ảnh sắc nét, X-T4 là lựa chọn tuyệt vời cho nhiếp ảnh gia và videographer.',
    category: new mongoose.Types.ObjectId('6514231234567890abcdef03'),
    price: 32990000,
    totalQty: 35,
    totalSold: 22,
    totalReviews: 40,
    averageRating: 4.8,
    attributes: [
      { key: 'Độ phân giải', value: '26MP' },
      { key: 'Loại', value: 'Mirrorless' }
    ],
    reviews: [],
    images: [
      {
        url: 'https://via.placeholder.com/200',
        public_id: 'fujifilmxt4-1'
      }
    ]
  },
  {
    _id: new mongoose.Types.ObjectId('67305f3c417471294b040b36'),
    name: 'Canon EOS M50 Mark II Mirrorless Camera 24MP',
    shortDescription: 'Canon EOS M50 Mark II với khả năng quay video 4K, cảm biến 24MP.',
    description:
      'Canon EOS M50 Mark II là máy ảnh mirrorless với cảm biến CMOS 24.1MP, hỗ trợ quay video 4K và màn hình cảm ứng xoay lật 3 inch. Hệ thống lấy nét Dual Pixel giúp bạn dễ dàng chụp ảnh sắc nét và quay video chuyên nghiệp.',
    category: new mongoose.Types.ObjectId('6514231234567890abcdef03'),
    price: 13990000,
    totalQty: 50,
    totalSold: 30,
    totalReviews: 60,
    averageRating: 4.6,
    attributes: [
      { key: 'Độ phân giải', value: '24MP' },
      { key: 'Loại', value: 'Mirrorless' }
    ],
    reviews: [],
    images: [
      {
        url: 'https://via.placeholder.com/200',
        public_id: 'canoneosm50-1'
      }
    ]
  },
  {
    _id: new mongoose.Types.ObjectId('67305f3c417471294b040b37'),
    name: 'Panasonic Lumix TZ200 Compact Camera 20MP',
    shortDescription: 'Máy ảnh compact Panasonic Lumix TZ200 với 20MP và zoom quang học 15x.',
    description:
      'Panasonic Lumix TZ200 là máy ảnh compact với cảm biến 1 inch 20.1MP, zoom quang học 15x, và khả năng quay video 4K. Thiết kế nhỏ gọn, dễ dàng mang theo, rất phù hợp cho những chuyến du lịch và nhiếp ảnh gia di động.',
    category: new mongoose.Types.ObjectId('6514231234567890abcdef03'),
    price: 13990000,
    totalQty: 40,
    totalSold: 25,
    totalReviews: 45,
    averageRating: 4.7,
    attributes: [
      { key: 'Độ phân giải', value: '20MP' },
      { key: 'Loại', value: 'Compact' }
    ],
    reviews: [],
    images: [
      {
        url: 'https://via.placeholder.com/200',
        public_id: 'panasoniclumix-1'
      }
    ]
  },

  // Máy tính bảng (6 products)
  {
    _id: new mongoose.Types.ObjectId('67305f3c417471294b040b40'),
    name: 'Apple iPad 10.2-inch 9th Gen Wi-Fi',
    shortDescription: 'Máy tính bảng Apple iPad 10.2-inch 9th Gen với màn hình Retina sắc nét.',
    description:
      'Apple iPad 10.2-inch 9th Gen với màn hình Retina 10.2 inch, bộ vi xử lý A13 Bionic mạnh mẽ, và camera 8MP. Cung cấp hiệu suất tuyệt vời cho công việc và giải trí, đặc biệt là với hệ điều hành iPadOS mượt mà và các ứng dụng phong phú.',
    category: new mongoose.Types.ObjectId('6514231234567890abcdef04'),
    price: 8990000,
    totalQty: 40,
    totalSold: 18,
    totalReviews: 50,
    averageRating: 4.7,
    attributes: [
      { key: 'Kích thước màn hình', value: '10 inch' },
      { key: 'Kết nối', value: 'Wifi' }
    ],
    reviews: [],
    images: [
      {
        url: 'https://via.placeholder.com/200',
        public_id: 'ipad102-1'
      }
    ]
  },
  {
    _id: new mongoose.Types.ObjectId('67305f3c417471294b040b41'),
    name: 'Samsung Galaxy Tab S6 10.5-inch Wi-Fi',
    shortDescription: 'Máy tính bảng Samsung Galaxy Tab S6 với màn hình 10.5 inch và hiệu suất mạnh mẽ.',
    description:
      'Samsung Galaxy Tab S6 sở hữu màn hình Super AMOLED 10.5 inch, bộ vi xử lý Snapdragon 855 và RAM 6GB, đem lại hiệu suất vượt trội cho cả công việc và giải trí. Máy cũng hỗ trợ bút S Pen tiện lợi cho việc vẽ và ghi chú.',
    category: new mongoose.Types.ObjectId('6514231234567890abcdef04'),
    price: 12990000,
    totalQty: 30,
    totalSold: 14,
    totalReviews: 30,
    averageRating: 4.6,
    attributes: [
      { key: 'Kích thước màn hình', value: '10 inch' },
      { key: 'Kết nối', value: 'Wifi' }
    ],
    reviews: [],
    images: [
      {
        url: 'https://via.placeholder.com/200',
        public_id: 'galaxytab-s6-1'
      }
    ]
  },
  {
    _id: new mongoose.Types.ObjectId('67305f3c417471294b040b42'),
    name: 'Huawei MediaPad M5 8.4-inch Wi-Fi',
    shortDescription: 'Máy tính bảng Huawei MediaPad M5 với màn hình 8.4 inch sắc nét.',
    description:
      'Huawei MediaPad M5 trang bị màn hình 8.4 inch 2K, vi xử lý Kirin 960 và RAM 4GB. Được thiết kế mỏng nhẹ, mang lại trải nghiệm hình ảnh sống động và âm thanh vòm Harman Kardon, lý tưởng cho nhu cầu giải trí và làm việc.',
    category: new mongoose.Types.ObjectId('6514231234567890abcdef04'),
    price: 7490000,
    totalQty: 45,
    totalSold: 20,
    totalReviews: 40,
    averageRating: 4.8,
    attributes: [
      { key: 'Kích thước màn hình', value: '8 inch' },
      { key: 'Kết nối', value: 'Wifi' }
    ],
    reviews: [],
    images: [
      {
        url: 'https://via.placeholder.com/200',
        public_id: 'mediapadm5-1'
      }
    ]
  },
  {
    _id: new mongoose.Types.ObjectId('67305f3c417471294b040b43'),
    name: 'Lenovo Tab P11 11-inch Wi-Fi',
    shortDescription: 'Máy tính bảng Lenovo Tab P11 với màn hình 11 inch, hiệu suất cao.',
    description:
      'Lenovo Tab P11 với màn hình 11 inch 2K và bộ vi xử lý Qualcomm Snapdragon 662, cung cấp khả năng xử lý mượt mà cho công việc và giải trí. Máy cũng được trang bị bộ loa JBL mạnh mẽ và hỗ trợ bút Lenovo Precision Pen 2.',
    category: new mongoose.Types.ObjectId('6514231234567890abcdef04'),
    price: 9990000,
    totalQty: 50,
    totalSold: 22,
    totalReviews: 35,
    averageRating: 4.6,
    attributes: [
      { key: 'Kích thước màn hình', value: '10 inch' },
      { key: 'Kết nối', value: 'Wifi' }
    ],
    reviews: [],
    images: [
      {
        url: 'https://via.placeholder.com/200',
        public_id: 'lenovotabp11-1'
      }
    ]
  },
  {
    _id: new mongoose.Types.ObjectId('67305f3c417471294b040b44'),
    name: 'Apple iPad Pro 12.9-inch Wi-Fi + 5G',
    shortDescription: 'Máy tính bảng iPad Pro 12.9-inch với kết nối 5G và màn hình Liquid Retina.',
    description:
      'Apple iPad Pro 12.9-inch sở hữu màn hình Liquid Retina XDR 12.9 inch, vi xử lý M1 mạnh mẽ, và kết nối 5G cực nhanh. Đây là máy tính bảng cao cấp, thích hợp cho công việc chuyên nghiệp, thiết kế đồ họa, và sản xuất video.',
    category: new mongoose.Types.ObjectId('6514231234567890abcdef04'),
    price: 23990000,
    totalQty: 20,
    totalSold: 10,
    totalReviews: 15,
    averageRating: 4.9,
    attributes: [
      { key: 'Kích thước màn hình', value: '12 inch' },
      { key: 'Kết nối', value: '5G' }
    ],
    reviews: [],
    images: [
      {
        url: 'https://via.placeholder.com/200',
        public_id: 'ipadpro129-1'
      }
    ]
  },
  {
    _id: new mongoose.Types.ObjectId('67305f3c417471294b040b45'),
    name: 'Samsung Galaxy Tab A7 10.4-inch Wifi + 4G',
    shortDescription: 'Máy tính bảng Samsung Galaxy Tab A7 với màn hình 10.4 inch và hỗ trợ 4G.',
    description:
      'Samsung Galaxy Tab A7 với màn hình 10.4 inch, bộ vi xử lý Snapdragon 662 và RAM 3GB, mang đến trải nghiệm mượt mà cho nhu cầu học tập và giải trí. Máy hỗ trợ kết nối 4G, giúp bạn luôn kết nối mọi lúc mọi nơi.',
    category: new mongoose.Types.ObjectId('6514231234567890abcdef04'),
    price: 6990000,
    totalQty: 50,
    totalSold: 25,
    totalReviews: 55,
    averageRating: 4.7,
    attributes: [
      { key: 'Kích thước màn hình', value: '10 inch' },
      { key: 'Kết nối', value: '4G' }
    ],
    reviews: [],
    images: [
      {
        url: 'https://via.placeholder.com/200',
        public_id: 'galaxytaba7-1'
      }
    ]
  },
  // Máy in (6 products)
  {
    _id: new mongoose.Types.ObjectId('67305f3c417471294b040b50'),
    name: 'Máy in Laser Canon LBP6030W',
    shortDescription: 'Máy in Canon LBP6030W Laser, kết nối Wifi, in nhanh chóng và tiết kiệm.',
    description:
      'Máy in Laser Canon LBP6030W với kết nối Wifi và tốc độ in lên tới 18 trang/phút. Máy in này phù hợp cho các văn phòng nhỏ, giúp bạn tiết kiệm chi phí và dễ dàng kết nối với các thiết bị di động và máy tính.',
    category: new mongoose.Types.ObjectId('6514231234567890abcdef05'),
    price: 2490000,
    totalQty: 40,
    totalSold: 25,
    totalReviews: 40,
    averageRating: 4.5,
    attributes: [
      { key: 'Loại máy in', value: 'Laser' },
      { key: 'Khổ giấy', value: 'A4' }
    ],
    reviews: [],
    images: [
      {
        url: 'https://via.placeholder.com/200',
        public_id: 'canon-lbp6030w-1'
      }
    ]
  },
  {
    _id: new mongoose.Types.ObjectId('67305f3c417471294b040b51'),
    name: 'Máy in phun mực HP Ink Tank 415',
    shortDescription: 'Máy in phun mực HP Ink Tank 415, in màu chất lượng cao, giá cả phải chăng.',
    description:
      'Máy in phun mực HP Ink Tank 415 với hệ thống mực in khổng lồ, giúp giảm thiểu chi phí in ấn và tiết kiệm thời gian. Máy có khả năng in màu sắc nét và hỗ trợ in hai mặt tự động, phù hợp cho nhu cầu in ấn văn phòng và gia đình.',
    category: new mongoose.Types.ObjectId('6514231234567890abcdef05'),
    price: 3390000,
    totalQty: 35,
    totalSold: 20,
    totalReviews: 30,
    averageRating: 4.7,
    attributes: [
      { key: 'Loại máy in', value: 'Phun mực' },
      { key: 'Khổ giấy', value: 'A4' }
    ],
    reviews: [],
    images: [
      {
        url: 'https://via.placeholder.com/200',
        public_id: 'hp-ink-tank-415-1'
      }
    ]
  },
  {
    _id: new mongoose.Types.ObjectId('67305f3c417471294b040b52'),
    name: 'Máy in đa năng Brother DCP-T520W',
    shortDescription: 'Máy in đa năng Brother DCP-T520W, in, sao chép, quét với kết nối Wi-Fi.',
    description:
      'Máy in đa năng Brother DCP-T520W kết hợp các chức năng in, sao chép, và quét. Máy in này hỗ trợ kết nối Wi-Fi và in nhanh chóng với độ phân giải cao. Đây là lựa chọn lý tưởng cho văn phòng vừa và nhỏ.',
    category: new mongoose.Types.ObjectId('6514231234567890abcdef05'),
    price: 3890000,
    totalQty: 50,
    totalSold: 18,
    totalReviews: 40,
    averageRating: 4.6,
    attributes: [
      { key: 'Loại máy in', value: 'Đa năng' },
      { key: 'Khổ giấy', value: 'A4' }
    ],
    reviews: [],
    images: [
      {
        url: 'https://via.placeholder.com/200',
        public_id: 'brother-dcpt520w-1'
      }
    ]
  },
  {
    _id: new mongoose.Types.ObjectId('67305f3c417471294b040b53'),
    name: 'Máy in Laser HP LaserJet Pro MFP M428fdw',
    shortDescription: 'Máy in Laser đa năng HP LaserJet Pro MFP M428fdw, in nhanh và tiết kiệm.',
    description:
      'Máy in Laser HP LaserJet Pro MFP M428fdw với khả năng in, sao chép, quét và gửi fax. Máy hỗ trợ in hai mặt tự động và kết nối không dây, rất phù hợp cho các văn phòng lớn và có nhu cầu in ấn thường xuyên.',
    category: new mongoose.Types.ObjectId('6514231234567890abcdef05'),
    price: 8500000,
    totalQty: 25,
    totalSold: 12,
    totalReviews: 15,
    averageRating: 4.8,
    attributes: [
      { key: 'Loại máy in', value: 'Laser' },
      { key: 'Khổ giấy', value: 'A4' }
    ],
    reviews: [],
    images: [
      {
        url: 'https://via.placeholder.com/200',
        public_id: 'hp-laserjet-pro-m428fdw-1'
      }
    ]
  },
  {
    _id: new mongoose.Types.ObjectId('67305f3c417471294b040b54'),
    name: 'Máy in phun mực Epson EcoTank L3150',
    shortDescription: 'Máy in phun mực Epson EcoTank L3150, kết nối Wi-Fi, in màu chất lượng cao.',
    description:
      'Máy in phun mực Epson EcoTank L3150 với hệ thống mực in lớn, giúp tiết kiệm chi phí. Máy có khả năng in màu sắc nét và kết nối Wi-Fi tiện lợi. Đây là lựa chọn lý tưởng cho các văn phòng nhỏ hoặc gia đình.',
    category: new mongoose.Types.ObjectId('6514231234567890abcdef05'),
    price: 4290000,
    totalQty: 60,
    totalSold: 25,
    totalReviews: 50,
    averageRating: 4.7,
    attributes: [
      { key: 'Loại máy in', value: 'Phun mực' },
      { key: 'Khổ giấy', value: 'A4' }
    ],
    reviews: [],
    images: [
      {
        url: 'https://via.placeholder.com/200',
        public_id: 'epson-l3150-1'
      }
    ]
  },
  {
    _id: new mongoose.Types.ObjectId('67305f3c417471294b040b55'),
    name: 'Máy in Laser Samsung ProXpress M3820ND',
    shortDescription: 'Máy in Laser Samsung ProXpress M3820ND, in nhanh với chi phí thấp.',
    description:
      'Máy in Laser Samsung ProXpress M3820ND là máy in tốc độ cao, với khả năng in lên đến 38 trang/phút. Máy có khả năng in hai mặt tự động và hỗ trợ kết nối qua Ethernet, phù hợp cho các văn phòng có nhu cầu in ấn lớn.',
    category: new mongoose.Types.ObjectId('6514231234567890abcdef05'),
    price: 5700000,
    totalQty: 30,
    totalSold: 15,
    totalReviews: 20,
    averageRating: 4.6,
    attributes: [
      { key: 'Loại máy in', value: 'Laser' },
      { key: 'Khổ giấy', value: 'A4' }
    ],
    reviews: [],
    images: [
      {
        url: 'https://via.placeholder.com/200',
        public_id: 'samsung-m3820nd-1'
      }
    ]
  },

  // Âm thanh (6 products)
  {
    _id: new mongoose.Types.ObjectId('67305f3c417471294b040b60'),
    name: 'Tai nghe Sony WH-1000XM5',
    shortDescription: 'Tai nghe Sony WH-1000XM5 với công nghệ chống ồn chủ động, âm thanh chất lượng cao.',
    description:
      'Sony WH-1000XM5 là một trong những tai nghe chống ồn tốt nhất hiện nay. Với công nghệ chống ồn chủ động, âm thanh sống động và khả năng kết nối Bluetooth tiện lợi, tai nghe này là lựa chọn lý tưởng cho những người yêu thích âm nhạc hoặc cần sự yên tĩnh trong môi trường ồn ào.',
    category: new mongoose.Types.ObjectId('6514231234567890abcdef06'),
    price: 9900000,
    totalQty: 30,
    totalSold: 15,
    totalReviews: 25,
    averageRating: 4.8,
    attributes: [
      { key: 'Loại', value: 'Tai nghe' },
      { key: 'Kết nối', value: 'Bluetooth' },
      { key: 'Thương hiệu', value: 'Sony' }
    ],
    reviews: [],
    images: [
      {
        url: 'https://via.placeholder.com/200',
        public_id: 'sony-wh1000xm5-1'
      }
    ]
  },
  {
    _id: new mongoose.Types.ObjectId('67305f3c417471294b040b61'),
    name: 'Loa Bluetooth JBL Charge 5',
    shortDescription: 'Loa Bluetooth JBL Charge 5, âm thanh mạnh mẽ, chống nước, pin lâu dài.',
    description:
      'Loa Bluetooth JBL Charge 5 mang đến âm thanh mạnh mẽ với bass sâu và âm treble rõ ràng. Hỗ trợ kết nối Bluetooth, có khả năng chống nước IP67 và thời gian sử dụng lên đến 20 giờ. Đây là loa di động lý tưởng cho các buổi tiệc ngoài trời hoặc nghe nhạc ở bất kỳ đâu.',
    category: new mongoose.Types.ObjectId('6514231234567890abcdef06'),
    price: 4890000,
    totalQty: 40,
    totalSold: 20,
    totalReviews: 30,
    averageRating: 4.7,
    attributes: [
      { key: 'Loại', value: 'Loa bluetooth' },
      { key: 'Kết nối', value: 'Bluetooth' },
      { key: 'Thương hiệu', value: 'JBL' }
    ],
    reviews: [],
    images: [
      {
        url: 'https://via.placeholder.com/200',
        public_id: 'jbl-charge5-1'
      }
    ]
  },
  {
    _id: new mongoose.Types.ObjectId('67305f3c417471294b040b62'),
    name: 'Soundbar Bose Soundbar 700',
    shortDescription: 'Soundbar Bose Soundbar 700 với âm thanh sống động và thiết kế sang trọng.',
    description:
      'Bose Soundbar 700 là một trong những soundbar tốt nhất hiện nay, mang lại âm thanh sống động và rõ ràng. Thiết kế tinh tế, hỗ trợ kết nối Bluetooth và Wi-Fi, dễ dàng kết nối với các thiết bị như TV, điện thoại hoặc máy tính bảng. Là lựa chọn tuyệt vời cho hệ thống âm thanh gia đình.',
    category: new mongoose.Types.ObjectId('6514231234567890abcdef06'),
    price: 16900000,
    totalQty: 20,
    totalSold: 12,
    totalReviews: 18,
    averageRating: 4.9,
    attributes: [
      { key: 'Loại', value: 'Soundbar' },
      { key: 'Kết nối', value: 'Bluetooth' },
      { key: 'Thương hiệu', value: 'Bose' }
    ],
    reviews: [],
    images: [
      {
        url: 'https://via.placeholder.com/200',
        public_id: 'bose-soundbar700-1'
      }
    ]
  },
  {
    _id: new mongoose.Types.ObjectId('67305f3c417471294b040b63'),
    name: 'Tai nghe Marshall Major IV',
    shortDescription: 'Tai nghe Marshall Major IV với âm thanh mạnh mẽ và thiết kế cổ điển.',
    description:
      'Marshall Major IV mang đến trải nghiệm âm thanh chất lượng cao với âm bass mạnh mẽ và độ chi tiết cao. Tai nghe có thiết kế cổ điển đặc trưng của Marshall, kết nối Bluetooth 5.0 và thời gian sử dụng lên đến 80 giờ. Đây là lựa chọn tuyệt vời cho những người yêu âm nhạc.',
    category: new mongoose.Types.ObjectId('6514231234567890abcdef06'),
    price: 4590000,
    totalQty: 25,
    totalSold: 10,
    totalReviews: 15,
    averageRating: 4.7,
    attributes: [
      { key: 'Loại', value: 'Tai nghe' },
      { key: 'Kết nối', value: 'Bluetooth' },
      { key: 'Thương hiệu', value: 'Marshall' }
    ],
    reviews: [],
    images: [
      {
        url: 'https://via.placeholder.com/200',
        public_id: 'marshall-majoriv-1'
      }
    ]
  },
  {
    _id: new mongoose.Types.ObjectId('67305f3c417471294b040b64'),
    name: 'Loa Bluetooth Sony SRS-XB43',
    shortDescription: 'Loa Bluetooth Sony SRS-XB43 với âm thanh mạnh mẽ và chống nước IP67.',
    description:
      'Sony SRS-XB43 là loa Bluetooth di động với âm thanh mạnh mẽ, bass sâu và âm treble rõ ràng. Loa hỗ trợ kết nối Bluetooth và có khả năng chống nước IP67, phù hợp cho các hoạt động ngoài trời. Với thời gian sử dụng lên đến 24 giờ, đây là loa lý tưởng cho các chuyến du lịch hoặc bữa tiệc.',
    category: new mongoose.Types.ObjectId('6514231234567890abcdef06'),
    price: 5490000,
    totalQty: 30,
    totalSold: 15,
    totalReviews: 20,
    averageRating: 4.8,
    attributes: [
      { key: 'Loại', value: 'Loa bluetooth' },
      { key: 'Kết nối', value: 'Bluetooth' },
      { key: 'Thương hiệu', value: 'Sony' }
    ],
    reviews: [],
    images: [
      {
        url: 'https://via.placeholder.com/200',
        public_id: 'sony-srs-xb43-1'
      }
    ]
  },
  {
    _id: new mongoose.Types.ObjectId('67305f3c417471294b040b65'),
    name: 'Hệ thống âm thanh Marshall Stanmore II',
    shortDescription: 'Hệ thống âm thanh Marshall Stanmore II, âm thanh mạnh mẽ và thiết kế cổ điển.',
    description:
      'Marshall Stanmore II là hệ thống âm thanh mạnh mẽ với thiết kế cổ điển đặc trưng. Với công suất lớn và âm thanh đầy đủ dải, Stanmore II sẽ mang lại cho bạn trải nghiệm âm nhạc tuyệt vời. Hệ thống này hỗ trợ kết nối Bluetooth, AUX, và RCA, phù hợp cho nhiều thiết bị khác nhau.',
    category: new mongoose.Types.ObjectId('6514231234567890abcdef06'),
    price: 13900000,
    totalQty: 20,
    totalSold: 8,
    totalReviews: 12,
    averageRating: 4.9,
    attributes: [
      { key: 'Loại', value: 'Hệ thống âm thanh' },
      { key: 'Kết nối', value: 'Bluetooth' },
      { key: 'Thương hiệu', value: 'Marshall' }
    ],
    reviews: [],
    images: [
      {
        url: 'https://via.placeholder.com/200',
        public_id: 'marshall-stanmoreii-1'
      }
    ]
  },

  // Thiết bị gaming (6 products)
  {
    _id: new mongoose.Types.ObjectId('67305f3c417471294b040b70'),
    name: 'Chuột gaming Razer DeathAdder V2',
    shortDescription: 'Chuột gaming Razer DeathAdder V2 với cảm biến quang học chính xác cao.',
    description:
      'Razer DeathAdder V2 là chuột gaming dành cho game thủ chuyên nghiệp, với cảm biến quang học 20,000 DPI, khả năng phản hồi cực nhanh, và thiết kế công thái học giúp bạn chơi game trong thời gian dài mà không cảm thấy mệt mỏi. Đèn nền RGB tùy chỉnh mang lại vẻ đẹp nổi bật.',
    category: new mongoose.Types.ObjectId('6514231234567890abcdef07'),
    price: 1390000,
    totalQty: 50,
    totalSold: 25,
    totalReviews: 35,
    averageRating: 4.8,
    attributes: [
      { key: 'Loại', value: 'Chuột gaming' },
      { key: 'Đèn nền', value: 'RGB' },
      { key: 'Thương hiệu', value: 'Razer' }
    ],
    reviews: [],
    images: [
      {
        url: 'https://via.placeholder.com/200',
        public_id: 'razer-deathadder-v2-1'
      }
    ]
  },
  {
    _id: new mongoose.Types.ObjectId('67305f3c417471294b040b71'),
    name: 'Bàn phím cơ Logitech G Pro X',
    shortDescription: 'Bàn phím cơ Logitech G Pro X với switch tùy chỉnh và đèn nền RGB.',
    description:
      'Logitech G Pro X là bàn phím cơ với thiết kế gọn nhẹ, dễ dàng mang theo. Các switch có thể thay đổi theo nhu cầu và đèn nền RGB đầy sắc màu mang lại trải nghiệm chơi game tuyệt vời. Chất lượng build chắc chắn và độ bền cao là điểm nổi bật của sản phẩm.',
    category: new mongoose.Types.ObjectId('6514231234567890abcdef07'),
    price: 2490000,
    totalQty: 40,
    totalSold: 18,
    totalReviews: 20,
    averageRating: 4.7,
    attributes: [
      { key: 'Loại', value: 'Bàn phím cơ' },
      { key: 'Đèn nền', value: 'RGB' },
      { key: 'Thương hiệu', value: 'Logitech' }
    ],
    reviews: [],
    images: [
      {
        url: 'https://via.placeholder.com/200',
        public_id: 'logitech-g-pro-x-1'
      }
    ]
  },
  {
    _id: new mongoose.Types.ObjectId('67305f3c417471294b040b72'),
    name: 'Tai nghe gaming SteelSeries Arctis 7',
    shortDescription: 'Tai nghe SteelSeries Arctis 7 với âm thanh vòm 7.1 và kết nối không dây.',
    description:
      'SteelSeries Arctis 7 mang đến trải nghiệm âm thanh vòm 7.1 mạnh mẽ và kết nối không dây ổn định. Tai nghe được thiết kế nhẹ nhàng và thoải mái, thích hợp cho những buổi chơi game dài. Với chất lượng âm thanh tuyệt vời và microphone rõ ràng, đây là lựa chọn lý tưởng cho các game thủ.',
    category: new mongoose.Types.ObjectId('6514231234567890abcdef07'),
    price: 3290000,
    totalQty: 30,
    totalSold: 15,
    totalReviews: 22,
    averageRating: 4.9,
    attributes: [
      { key: 'Loại', value: 'Tai nghe gaming' },
      { key: 'Đèn nền', value: 'Không đèn' },
      { key: 'Thương hiệu', value: 'SteelSeries' }
    ],
    reviews: [],
    images: [
      {
        url: 'https://via.placeholder.com/200',
        public_id: 'steelseries-arctis-7-1'
      }
    ]
  },
  {
    _id: new mongoose.Types.ObjectId('67305f3c417471294b040b73'),
    name: 'Ghế gaming Corsair T3 Rush',
    shortDescription: 'Ghế gaming Corsair T3 Rush với thiết kế thể thao và đệm êm ái.',
    description:
      'Corsair T3 Rush là ghế gaming được thiết kế với đệm mút đặc biệt giúp bạn ngồi thoải mái suốt thời gian chơi game dài. Ghế có khả năng điều chỉnh độ cao, độ nghiêng và tay vịn, giúp bạn tìm được vị trí ngồi thoải mái nhất. Chất liệu vải thoáng khí giúp bạn không cảm thấy nóng khi ngồi lâu.',
    category: new mongoose.Types.ObjectId('6514231234567890abcdef07'),
    price: 4990000,
    totalQty: 15,
    totalSold: 7,
    totalReviews: 12,
    averageRating: 4.6,
    attributes: [
      { key: 'Loại', value: 'Ghế gaming' },
      { key: 'Đèn nền', value: 'Không đèn' },
      { key: 'Thương hiệu', value: 'Corsair' }
    ],
    reviews: [],
    images: [
      {
        url: 'https://via.placeholder.com/200',
        public_id: 'corsair-t3-rush-1'
      }
    ]
  },
  {
    _id: new mongoose.Types.ObjectId('67305f3c417471294b040b74'),
    name: 'Chuột gaming Logitech G502 HERO',
    shortDescription: 'Chuột gaming Logitech G502 HERO với cảm biến HERO 25K và đèn nền RGB.',
    description:
      'Logitech G502 HERO là chuột gaming nổi bật với cảm biến HERO 25K, mang lại độ chính xác cực kỳ cao. Được thiết kế dành riêng cho các game thủ, chuột có các nút bấm tùy chỉnh và đèn nền RGB đầy màu sắc. Đây là một trong những chuột gaming được yêu thích nhất trên thị trường.',
    category: new mongoose.Types.ObjectId('6514231234567890abcdef07'),
    price: 1590000,
    totalQty: 60,
    totalSold: 35,
    totalReviews: 40,
    averageRating: 4.8,
    attributes: [
      { key: 'Loại', value: 'Chuột gaming' },
      { key: 'Đèn nền', value: 'RGB' },
      { key: 'Thương hiệu', value: 'Logitech' }
    ],
    reviews: [],
    images: [
      {
        url: 'https://via.placeholder.com/200',
        public_id: 'logitech-g502-hero-1'
      }
    ]
  },
  {
    _id: new mongoose.Types.ObjectId('67305f3c417471294b040b75'),
    name: 'Bàn phím cơ Razer Huntsman Mini',
    shortDescription: 'Bàn phím cơ Razer Huntsman Mini với switch quang học và thiết kế 60%.',
    description:
      'Razer Huntsman Mini là bàn phím cơ kích thước 60% với switch quang học Razer, giúp phản hồi cực kỳ nhanh chóng. Với thiết kế gọn nhẹ, dễ dàng mang theo và đèn nền RGB tùy chỉnh, sản phẩm này là lựa chọn tuyệt vời cho các game thủ muốn một bàn phím nhỏ gọn nhưng mạnh mẽ.',
    category: new mongoose.Types.ObjectId('6514231234567890abcdef07'),
    price: 2190000,
    totalQty: 25,
    totalSold: 12,
    totalReviews: 18,
    averageRating: 4.7,
    attributes: [
      { key: 'Loại', value: 'Bàn phím cơ' },
      { key: 'Đèn nền', value: 'RGB' },
      { key: 'Thương hiệu', value: 'Razer' }
    ],
    reviews: [],
    images: [
      {
        url: 'https://via.placeholder.com/200',
        public_id: 'razer-huntsman-mini-1'
      }
    ]
  }
];
