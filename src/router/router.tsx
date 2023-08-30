import { Routes, Route } from 'react-router-dom';

import PrivateRoutes from './PrivateRoutes';
import LoginPage from '../pages/LoginPage';
import MyArticles from '../pages/MyArticles';
import Toolbar from '../components/Toolbar';
import Home from '../pages/Home';
import AddArticle from '../pages/AddArticle';
// import Article from '../pages/Article';
import EditArticle from '../pages/EditArticle';
import RecentArticles from '../pages/RecentArticles';

const Router = () => {
  console.log('Router rendering...');
  return (
    <>
      <Toolbar />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/recent-articles" element={<RecentArticles />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/articles/" element={<MyArticles />} />
          <Route path="/article/new" element={<AddArticle />} />
          {/* <Route path="/articles/:id" element={<Article />} /> */}
          <Route path="/article/edit/:id" element={<EditArticle />} />
        </Route>
      </Routes>
    </>
  );
};

export default Router;
