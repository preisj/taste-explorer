import { Routes as ReactRoutes, Route } from "react-router-dom";
import { UserPage } from "../pages/Admin/UserPage";
import { Authenticate } from "../pages/Authenticate/Authenticate";
import { LandingPage } from "../pages/Landing/LandingPage";
import { useAuth } from "../context/AuthContext";
import { UserEdit } from "../pages/Admin/AddUser/UserEdit";
import { RecipeEdit } from "../pages/Admin/AddRecipe/RecipeEdit";
import { BookVisualize } from "../pages/Book/ViewBook/BookVisualize";
import { CategoryVisualize } from "../pages/Book/ViewCategory/CategoryVisualize";
import { MyOrdersPage } from "../pages/Orders/MyOrdersPage";
import { Auth } from "../context/AuthContext";
import { CompleteOrderPage } from "../pages/Orders/CompleteOrderPage";
import FindNearbyMarkets from "../pages/Utils/FindNearbyMarkets";
import FAQ from "../pages/Utils/FAQ";
import AboutUs from "../pages/Utils/AboutUs";
import TermsAndConditions from "../pages/Utils/TermsAndConditions";

interface AppRoutesProps {
    auth: Auth;
}

export function AppRoutes({ auth }: AppRoutesProps) {
    return (
        <ReactRoutes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/authenticate" element={<Authenticate />} />
            <Route path="/book/:id/visualize" element={<BookVisualize />} />
            <Route path="/recipes/:type" element={<CategoryVisualize />} />
            <Route path="/my-orders" element={<MyOrdersPage />} />
            <Route path="/admin" element={auth.isAdmin ? <UserPage /> : <LandingPage/>} />
            <Route path="/find-nearby-markets" element={<FindNearbyMarkets />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
            <Route path="/completeOrder" element={<CompleteOrderPage/>} />
            <Route path="/person/:id/update" element={auth.isAdmin ? <UserEdit /> : <LandingPage/>} />
            <Route path="/book/:id/update" element={auth.isAdmin ? <RecipeEdit /> : <LandingPage/>} />
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