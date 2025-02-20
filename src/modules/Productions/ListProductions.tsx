import { useEffect, useState } from "react";
import { getProductions } from "../../api/productions.api";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Production } from "../../types";
import { Box, Button } from "@mui/material";
import { Link } from "react-router";


export default function ListProductions() {

    const [data, setData] = useState<Production[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const data = await getProductions();
            setData(data);
            console.log(data);
            setLoading(false);
        };
        fetchData();
    }, []);
    if (loading) {
        return
    }

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'title', headerName: 'Title', minWidth: 200 },
        { field: 'description', headerName: 'Description', minWidth: 150, flex: 1 },
        { field: 'price', headerName: 'Price', minWidth: 150 }
    ];

    return (
        <div>
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <h3>Productions</h3>
                <Button variant="contained" color="primary">
                    <Link to="/productions/edit" style={{ textDecoration: 'none', color: 'inherit' }}>Edit Productions</Link>
                </Button>
            </Box>
            <DataGrid rows={data} columns={columns} disableRowSelectionOnClick />
        </div>
    );
}
