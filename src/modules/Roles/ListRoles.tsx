import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { getRoles } from "../../api/roles.api";
import { Box, Button, CircularProgress } from "@mui/material";
import { Link } from "react-router";
import { useDataLoad } from "../../hooks/useFataLoad";

export default function ListRoles() {

    const { data, isLoading } = useDataLoad(getRoles);

    if (isLoading) {
        return <Box display="flex" justifyContent="center" alignItems="center" height="70vh"><CircularProgress /></Box>
    }

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'name', headerName: 'Name', width: 150 },
        { field: 'permissions', headerName: 'Permissions', width: 150, flex: 1, 
            renderCell: (params) => {
                return params.row.permissions.map((perm: { id: string, name: string }) => perm.name).join(', ');
            }
        },
    ];

    return (
        <div>
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <h3>Roles</h3>
                <Button variant="contained" color="primary">
                    <Link to="/roles/create" style={{ textDecoration: 'none', color: 'inherit' }}>Create Role</Link>
                </Button>
            </Box>
            <DataGrid rows={data} columns={columns} disableRowSelectionOnClick />
        </div>
    );
}
