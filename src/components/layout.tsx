import HTMLHead from "./htmlhead";
import Navbar from "./navbar/navbar";
import Footer from "./footer";

const Layout = ({ children }: { children: React.ReactNode; }) => {
    return (
        <div>
            <HTMLHead />
            <Navbar />
            <main>
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default Layout;