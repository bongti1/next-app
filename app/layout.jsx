import { Navbar } from "@/components/Navbar";
import "../styles/globals.css";
import { Provider } from "@/components/Provider";
import { Suspense } from "react";

export const metadata = {
    title: "promptopia",
    description: "Dicover & Share AI with Prompts"
}
const Layout = ({children}) => {
  return (
    <html lang="en">
        <body>
            <Provider>
                {/* <div className="main">
                  <div className="gradient"></div>
              </div>
            */}
              <main className="app">
                <Navbar></Navbar>
                  <Suspense>
                    {children}
                  </Suspense>
              </main>
            </Provider>
        </body>
    </html>
  );
}

export default Layout;

