import { Routes, Route } from 'react-router-dom';

import PrivateRoutes from './PrivateRoutes';
import LoginPage from '../pages/LoginPage';
import MyArticles from '../pages/MyArticles';
import Toolbar from '../components/Toolbar';
import Home from '../pages/Home';
import AddArticle from '../pages/AddArticle';
// import Article from '../pages/Article';
// import ArticleEdit from '../pages/ArticleEdit';

const Router = () => {
  console.log('Router rendering...');
  return (
    <>
      <Toolbar />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/articles/" element={<MyArticles />} />
          <Route path="/article/new" element={<AddArticle />} />
          {/* <Route path="/articles/:id" element={<Article />} />
          <Route path="/articles/:id" element={<ArticleEdit />} /> */}
        </Route>
      </Routes>
    </>
  );
};

export default Router;
