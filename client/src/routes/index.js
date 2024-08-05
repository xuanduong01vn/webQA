import Home from '../pages/Home/Home.js';
import ReadPost from '../pages/ReadPost/ReadPost.js';
import Login from '../pages/Login/Login.js';
import Register from '../pages/Register/Register.js';
import Profile from '../pages/Account/Profile.js';
import Password from '../pages/Account/Password.js';
import User from '../pages/User/User.js';
import AccountPost from '../pages/Account/AccountPost.js';
import AccountDeleted from '../pages/Account/AccountDeleted.js';
import AccountMarked from '../pages/Account/AccountMarked.js';
import AccountLiked from '../pages/Account/AccountLiked.js';
import CreatePost from '../pages/CreatePost/CreatePost.js';
import HomeAdmin from '../pages/HomeAdmin/HomeAdmin.js';
import PageDashboardPost from '../pages/DashboardPost/DashboardPost.js';
import DashboardAdmin from '../pages/DashboardAdmin/DashboardAdmin.js';
import DashboardUser from '../pages/DashboardUser/DashboardUser.js';
import PageDashboardTag from '../pages/DashboardTag/DashboardTag.js';
import AddNewAdmin from '../pages/AddNewAdmin/AddNewAdmin.js';
import UpdatePost from '../pages/UpdatePost/UpdatePost.js';
import PageDashboardComment from '../pages/DashboardComment/DashboardComment.js';
import PageDashboardPostDetail from '../pages/DashboardPost/DashboardPostDetail.js';
import PageDashboardUserDetail from '../pages/DashboardUser/DashboardUserDetail.js';
import AccountNotify from '../pages/Account/AccountNotify.js';


const routes=[
  {path: '/', component: Home},
  {path: '/post/:id', component: ReadPost},
  {path: '/login', component: Login},
  {path: '/register', component: Register},
  {path: '/account/profile', component: Profile},
  {path: '/account/password', component: Password},
  {path: '/user/:id', component: User},
  {path: '/account/posts', component: AccountPost},
  {path: '/account/deleted', component: AccountDeleted},
  {path: '/account/marked', component: AccountMarked},
  {path: '/account/liked', component: AccountLiked},
  {path: '/create/post', component: CreatePost},
  {path: '/dashboard', component: HomeAdmin},
  {path: '/dashboard/posts/', component: PageDashboardPost},
  {path: '/dashboard/admins', component: DashboardAdmin},
  {path: '/dashboard/new-admin', component: AddNewAdmin},
  {path: '/dashboard/users', component: DashboardUser},
  {path: '/dashboard/tags', component: PageDashboardTag},
  {path: '/dashboard/tags?page:query', component: PageDashboardTag},
  {path: '/post/:id/edit', component: UpdatePost},
  {path: '/dashboard/comments', component: PageDashboardComment},
  {path: '/dashboard/post/:id', component: PageDashboardPostDetail},
  {path: '/dashboard/user/:id', component: PageDashboardUserDetail},
  {path: '/account/notify', component: AccountNotify},
]

export { routes };