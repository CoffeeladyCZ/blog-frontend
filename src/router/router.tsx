import { Routes, Route } from 'react-router-dom';

import PrivateRoutes from './PrivateRoutes';
import LoginPage from '../pages/LoginPage';
import MyArticles from '../pages/MyArticles';
import Navigation from '../components/Navigation';
import Home from '../pages/Home';
import AddArticle from '../pages/AddArticle';
import ArticleDetail from '../pages/ArticleDetail';
import EditArticle from '../pages/EditArticle';
import RecentArticles from '../pages/RecentArticles';

const Router = () => {
  console.log('Router rendering...');
  return (
    <>
      <Navigation />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/recent-articles" element={<RecentArticles />} />
        <Route path="/article/:id" element={<ArticleDetail />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/articles/" element={<MyArticles />} />
          <Route path="/article/new" element={<AddArticle />} />
          <Route path="/article/edit/:id" element={<EditArticle />} />
        </Route>
      </Routes>
    </>
  );
};

export default Router;
