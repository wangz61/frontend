import { useEffect, useState } from "react";
import { getUsers } from "../../api/users.api";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { getRoles } from "../../api/roles.api";
import { User, Role } from "../../types";
import { Box, Button, CircularProgress } from "@mui/material";
import { Link } from "react-router";

export default function ListUsers() {

    const [data, setData] = useState<User[]>([]);
    const [roles, setRoles] = useState<Role[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const data = await getUsers();
            const roles = await getRoles();
            setData(data);
            setRoles(roles);
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
        { field: 'roleId', headerName: 'Role', width: 150, valueGetter: (value: string) => {
            const role = roles.find((role) => role.id === value);
            return role?.name;
        } },
    ];

    return (
        <div>
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <h3>Users</h3>
                <Button variant="contained" color="primary">
                    <Link to="/users/create" style={{ textDecoration: 'none', color: 'inherit' }}>Create User</Link>
                </Button>
            </Box>

            <DataGrid rows={data} columns={columns} disableRowSelectionOnClick />
        </div>
    );
}
