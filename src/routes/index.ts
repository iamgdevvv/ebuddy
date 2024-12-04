import { AuthRoute } from '@modules/auth/route';
import { UserRoute } from '@modules/user/route';

const routes = [new UserRoute().router, new AuthRoute().router];

export default routes;
