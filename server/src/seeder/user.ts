import { hashSync } from 'bcryptjs';
import mongoose from 'mongoose';

export const userData = [
  {
    _id: new mongoose.Types.ObjectId('6751e09c8060a65658d68528'),
    firstName: 'ADMIN',
    lastName: 'ADMIN',
    email: 'admin@gmail.com',
    password: hashSync('password123', 10),
    avatar: 'https://robohash.org/user1.png?size=50x50&set=set1',
    role: 'admin',
    userName: 'admin'
  },
  {
    _id: new mongoose.Types.ObjectId('672f28cf6ec8ec32a896feeb'),
    firstName: 'Nguyễn',
    lastName: 'Văn An',
    email: 'nguyenvanan@gmail.com',
    password: hashSync('password123', 10),
    avatar: 'https://robohash.org/user1.png?size=50x50&set=set1',
    role: 'user',
    userName: 'nguyenvanan'
  },
  {
    _id: new mongoose.Types.ObjectId('672f28cf6ec8ec32a896feec'),
    firstName: 'Trần',
    lastName: 'Thị Bình',
    email: 'tranthibinh@gmail.com',
    password: hashSync('password123', 10),
    avatar: 'https://robohash.org/user2.png?size=50x50&set=set1',
    role: 'user',
    userName: 'tranthibinh'
  },
  {
    _id: new mongoose.Types.ObjectId('672f28cf6ec8ec32a896feed'),
    firstName: 'Lê',
    lastName: 'Hoàng',
    email: 'lehoang@gmail.com',
    password: hashSync('password123', 10),
    avatar: 'https://robohash.org/user3.png?size=50x50&set=set1',
    role: 'admin',
    userName: 'lehoang'
  },
  {
    _id: new mongoose.Types.ObjectId('672f28cf6ec8ec32a896feee'),
    firstName: 'Phạm',
    lastName: 'Minh Đức',
    email: 'phamminhduc@gmail.com',
    password: hashSync('password123', 10),
    avatar: 'https://robohash.org/user4.png?size=50x50&set=set1',
    role: 'user',
    userName: 'phamminhduc'
  },
  {
    _id: new mongoose.Types.ObjectId('672f28cf6ec8ec32a896feef'),
    firstName: 'Hoàng',
    lastName: 'Thị Mai',
    email: 'hoangthimai@gmail.com',
    password: hashSync('password123', 10),
    avatar: 'https://robohash.org/user5.png?size=50x50&set=set1',
    role: 'user',
    userName: 'hoangthimai'
  },
  {
    _id: new mongoose.Types.ObjectId('672f28cf6ec8ec32a896fef0'),
    firstName: 'Vũ',
    lastName: 'Đình Long',
    email: 'vudinhlong@gmail.com',
    password: hashSync('password123', 10),
    avatar: 'https://robohash.org/user6.png?size=50x50&set=set1',
    role: 'user',
    userName: 'vudinhlong'
  },
  {
    _id: new mongoose.Types.ObjectId('672f28cf6ec8ec32a896fef1'),
    firstName: 'Ngô',
    lastName: 'Thanh Hà',
    email: 'ngothanhha@gmail.com',
    password: hashSync('password123', 10),
    avatar: 'https://robohash.org/user7.png?size=50x50&set=set1',
    role: 'user',
    userName: 'ngothanhha'
  }
];
