import { Routes, Route } from "react-router-dom";
import { Fragment, Suspense } from "react";
import { routes } from "./routes";
import { Spin } from "antd";

function App() {
    return (
        <div className="App">
            <Routes>
                {routes.map((route, index) => {
                    const Layout = route.layout ? route.layout : Fragment;
                    const Page = route.component;
                    return (
                        <Route
                            key={index}
                            path={route.path}
                            element={
                                <Layout>
                                    <Suspense
                                        fallback={
                                            <Spin
                                                style={{
                                                    height: "100%",
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                }}
                                            />
                                        }
                                    >
                                        <Page />
                                    </Suspense>
                                </Layout>
                            }
                        />
                    );
                })}
            </Routes>
        </div>
    );
}

export default App;
