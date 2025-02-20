import { useEffect, useState } from "react";
import { getRoles } from "../../api/roles.api";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Role } from "../../types";
import { Box, Button } from "@mui/material";
import { Link } from "react-router";

export default function ListRoles() {

    const [data, setData] = useState<Role[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const data = await getRoles();
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
        { field: 'id', headerName: 'ID', width: 90, flex: 1 },
        { field: 'name', headerName: 'Name', width: 150, flex: 1 },
    ];

    return (
        <div>
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <h3>Roles</h3>
                <Button variant="contained" color="primary">
                    <Link to="/roles/edit" style={{ textDecoration: 'none', color: 'inherit' }}>Edit Roles</Link>
                </Button>
            </Box>
            <DataGrid rows={data} columns={columns} disableRowSelectionOnClick />
        </div>
    );
}
