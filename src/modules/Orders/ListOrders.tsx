import { useEffect, useState } from "react";
import { getOrders } from "../../api/orders.api";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box, Button, CircularProgress } from "@mui/material";
import { Link } from "react-router";

export default function ListOrders() {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const data = await getOrders();
            setData(data);
            console.log(data);
            setLoading(false);
        };
        fetchData();
    }, []);
    if (loading) {
        return <Box display="flex" justifyContent="center" alignItems="center" height="70vh"><CircularProgress /></Box>
    }

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'name', headerName: 'Name', width: 150 },
        { field: 'email', headerName: 'Email', width: 150, flex: 1 },
        { field: 'createdAt', headerName: 'Created At', width: 150, flex: 1 },
        { field: 'totalPrice', headerName: 'Total Price', width: 150, flex: 1 },
    ];

    return (
        <div>
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <h3>Orders</h3>
                <Button variant="contained" color="primary">
                    <Link to="/orders/create" style={{ textDecoration: 'none', color: 'inherit' }}>Create Order</Link>
                </Button>
            </Box>
            <DataGrid rows={data} columns={columns} disableRowSelectionOnClick />
        </div>
    );
}
