import userRoutes from "./users";
import authRoutes from "./auth";

const routes = [
    ...authRoutes,
    ...userRoutes
]

export default routes;
