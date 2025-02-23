import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { getProductions } from "../../api/productions.api";
import { Box, Button, CircularProgress } from "@mui/material";
import { Link } from "react-router";
import { useDataLoad } from "../../hooks/useFataLoad";

export default function ListProductions() {

    const { data, isLoading } = useDataLoad(getProductions);


    if (isLoading) {
        return <Box display="flex" justifyContent="center" alignItems="center" height="70vh"><CircularProgress /></Box>
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
                    <Link to="/productions/create" style={{ textDecoration: 'none', color: 'inherit' }}>Create Production</Link>
                </Button>
            </Box>
            <DataGrid rows={data} columns={columns} disableRowSelectionOnClick />
        </div>
    );
}
