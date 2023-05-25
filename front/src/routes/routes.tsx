import { Routes as ReactRoutes, Route } from "react-router-dom";
import { UserPage } from "../pages/Admin/UserPage";
import { Authenticate } from "../pages/Authenticate/Authenticate";
import { LandingPage } from "../pages/Landing/LandingPage";
import { useAuth } from "../context/AuthContext";
import { UserEdit } from "../pages/Admin/AddUser/UserEdit";
import { BookEdit } from "../pages/Admin/AddBook/BookEdit";
import { BookVisualize } from "../pages/Book/ViewBook/BookVisualize";
import { CategoryVisualize } from "../pages/Book/ViewCategory/CategoryVisualize";
import { Auth } from "../context/AuthContext";

interface AppRoutesProps {
    auth: Auth;
}

export function AppRoutes({ auth }: AppRoutesProps) {
    return (
        <ReactRoutes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/authenticate" element={<Authenticate />} />
            <Route path="/book/:id/visualize" element={<BookVisualize />} />
            <Route path="/books/:type" element={<CategoryVisualize />} />
            <Route path="/admin" element={auth.isAdmin ? <UserPage /> : <LandingPage/>} />
            <Route path="/person/:id/update" element={auth.isAdmin ? <UserEdit /> : <LandingPage/>} />
            <Route path="/book/:id/update" element={auth.isAdmin ? <BookEdit /> : <LandingPage/>} />
        </ReactRoutes>
    );
}

function AuthRoutes() {
    return (
        <ReactRoutes>
            <Route path="/authenticate" element={<Authenticate login />} />
            <Route path="/register" element={<Authenticate />} />
            <Route path="/" element={<LandingPage />} />
        </ReactRoutes>
    );
}

export function Routes() {
    const { auth } = useAuth();

    if (auth.isLoading) return <span>Carregando...</span>;
    if (!auth.isAuthenticated) return <AuthRoutes />;

    return <AppRoutes auth={{...auth, isAdmin: auth.isAdmin}} />;
}