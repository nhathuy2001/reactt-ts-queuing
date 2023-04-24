import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function RootPage() {
    const navigate = useNavigate();
    useEffect(() => {
        navigate("/login");
    }, []);
    return <></>;
}

export default RootPage;
