// import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
// import Cookies from 'js-cookie';

import LoginPage from '../pages/LoginPage';
import MyArticles from '../pages/MyArticles';
import Toolbar from '../components/Toolbar';
import Home from '../pages/Home';
// import CreateArticle from '../pages/CreateArticle';

const Router = () => {
  // const [jwtState, setJwtState] = useState(Cookies.get('token') || null);

  return (
    <>
      <Toolbar />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/my-articles" element={<MyArticles />} />
        {/* <Route path="/article/new" element={<CreateArticle />} /> */}
      </Routes>
    </>
  );
};

export default Router;
