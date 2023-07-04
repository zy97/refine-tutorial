import {
  Refine,
  GitHubBanner,
  WelcomePage,
  Authenticated,
} from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import {
  AuthPage,
  ErrorComponent,
  notificationProvider,
  ThemedLayoutV2,
} from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";

import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";
import routerBindings, {
  NavigateToResource,
  CatchAllNavigate,
  UnsavedChangesNotifier,
  DocumentTitleHandler,
} from "@refinedev/react-router-v6";
import dataProvider from "@refinedev/simple-rest";
import { ColorModeContextProvider } from "./contexts/color-mode";
import { Header } from "./components/header";
import { AntdInferencer } from "@refinedev/inferencer/antd";
function App() {
  return (
    <BrowserRouter>
      <GitHubBanner />
      <RefineKbarProvider>
        <ColorModeContextProvider>
          <Refine
            notificationProvider={notificationProvider}
            routerProvider={routerBindings}
            dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
            options={{
              syncWithLocation: true,
              warnWhenUnsavedChanges: true,
            }}
            resources={[
              {
                name: "blog_posts",
                list: "/blog-posts",
                show: "/blog-posts/show/:id",
                create: "/blog-posts/create",
                edit: "/blog-posts/edit/:id",
              },
            ]}
          >
            <Routes>
              <Route
                element={
                  <ThemedLayoutV2>
                    <Outlet />
                  </ThemedLayoutV2>
                }
              >
                <Route index element={<NavigateToResource resource="blog_posts" />} />
                <Route path="blog-posts">
                  <Route index element={<AntdInferencer />} />
                  <Route
                    path="show/:id"
                    element={<AntdInferencer />}
                  />
                  <Route
                    path="edit/:id"
                    element={<AntdInferencer />}
                  />
                  <Route
                    path="create"
                    element={<AntdInferencer />}
                  />
                </Route>
                <Route path="*" element={<ErrorComponent />} />
              </Route>
            </Routes>
            <RefineKbar />
            <UnsavedChangesNotifier />
            <DocumentTitleHandler />
          </Refine>
        </ColorModeContextProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
