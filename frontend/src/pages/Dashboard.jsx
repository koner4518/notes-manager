import { useEffect } from "react";
import api from "../services/api";

const Dashboard = () => {

    useEffect(() => {
        const testProtectedRoute = async () => {
            try {
                const response = await api.get("/protected");

                console.log(response.data);

            } catch (error) {
                console.error(error);
            }
        };

        testProtectedRoute();
    }, []);

    return (
        <div>
            <h1>Dashboard</h1>
        </div>
    );
};

export default Dashboard;