import React, { Suspense, lazy, useEffect, useState } from "react";

import { Route, Routes } from "react-router-dom";
// Routes
const AppLayout = lazy(() => import("./pages/AppLayout"));

const App = () => {
  const [isAuth, setIsAuth] = useState(false);

  return (
    <Suspense>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<AppLayout />} />
      </Routes>
    </Suspense>
  );
};

export default App;
