import { Spinner } from "react-bootstrap";

export default function Loading() {
    return (
        <div className="page">
            <Spinner animation="border" variant="dark" />
        </div>
    );
}