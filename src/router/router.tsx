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
import NotFound from '../pages/NotFound';
import Disconnected from '../pages/Disconected';

const Router = () => {
  return (
    <>
      <Navigation />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/recent-articles" element={<RecentArticles />} />
        <Route path="/article/:id" element={<ArticleDetail />} />
        <Route path="/disconnected" element={<Disconnected />} />
        <Route path="*" element={<NotFound />} />
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
