import Navbar from './Navbar';
import Meta from './Meta';
// import ProjectForm from './ProjectForm';
// import ProjectItem from './ProjectItem';

const Layout = ({ children }) => {
    return (
        <>
            <Meta />
            <Navbar />
            <div className="container">
                <main className="main">
                    {children}
                </main>

            </div>
            {/* <ProjectForm />
            <ProjectItem /> */}
        </>
    )
}

export default Layout
