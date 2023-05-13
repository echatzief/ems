import { User } from '@/src/user/user.entity';
import { USER_REPOSITORY } from '@/src/config';

const providers = [
  {
    provide: USER_REPOSITORY,
    useValue: User,
  },
];
export default providers;