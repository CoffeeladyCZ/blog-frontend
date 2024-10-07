import { Routes, Route } from 'react-router-dom';

import { Container } from '@mui/material';
import { styled } from '@mui/material/styles';

import PrivateRoutes from './PrivateRoutes';
import LoginPage from '../pages/LoginPage';
import MyArticles from '../pages/MyArticles';
import Home from '../pages/Home';
import AddArticle from '../pages/AddArticle';
import ArticleDetail from '../pages/ArticleDetail';
import EditArticle from '../pages/EditArticle';
import RecentArticles from '../pages/RecentArticles';
import NotFound from '../pages/NotFound';
import Disconnected from '../pages/Disconected';

const StyledRouterContainer = styled(Container)`
  margin-top: 100px;
`;

const Router = () => {
  return (
    <StyledRouterContainer>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/recent-articles" element={<RecentArticles />} />
        <Route path="/article/:id" element={<ArticleDetail />} />
        <Route path="/disconnected" element={<Disconnected />} />
        <Route path="*" element={<NotFound />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/articles" element={<MyArticles />} />
          <Route path="/article/new" element={<AddArticle />} />
          <Route path="/article/edit/:id" element={<EditArticle />} />
        </Route>
      </Routes>
    </StyledRouterContainer>
  );
};

export default Router;
