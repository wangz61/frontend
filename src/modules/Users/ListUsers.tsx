import { useEffect, useState } from "react";
import { getUsers, updateUser } from "../../api/users.api";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { getRoles } from "../../api/roles.api";
import { User, Role } from "../../types";
import { Box, Button, CircularProgress, DialogContent, DialogActions, Dialog, TextField, DialogTitle } from "@mui/material";
import { Link } from "react-router";

export default function ListUsers() {

    const [data, setData] = useState<User[]>([]);
    const [roles, setRoles] = useState<Role[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [editOpen, setEditOpen] = useState(false);


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

    const handleRowDoubleClick = (params: any) => {
        const user = data.find((u) => u.id === params.id);
        if (user) {
            setSelectedUser(user);
            setEditOpen(true);
        }
    };

    const handleEditChange = (field: keyof User) => (event: React.ChangeEvent<HTMLInputElement>) => {
        if (selectedUser) {
            setSelectedUser({ ...selectedUser, [field]: event.target.value });
        }
    };

    const handleEditSubmit = async () => {
        if (selectedUser) {
            try {
                await updateUser({
                    id: selectedUser.id,
                    name: selectedUser.name,
                    email: selectedUser.email,
                    roleId: selectedUser.roleId,
                });
                setData((prev) => prev.map((user) => (user.id === selectedUser.id ? selectedUser : user))); // 更新表格数据
                setEditOpen(false);
            } catch (error) {
                console.error("Failed to update user:", error);
                alert("Update failed!");
            }
        }
    };

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

            <DataGrid rows={data} columns={columns} disableRowSelectionOnClick onRowDoubleClick={handleRowDoubleClick} />
            <Dialog open={editOpen} onClose={() => setEditOpen(false)}>
                <DialogTitle>Edit User</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Name"
                        value={selectedUser?.name || ""}
                        onChange={handleEditChange("name")}
                        fullWidth
                    />
                    <TextField
                        label="Email"
                        value={selectedUser?.email || ""}
                        onChange={handleEditChange("email")}
                        fullWidth
                    />
                    <TextField
                        label="Password"
                        value={selectedUser?.password || ""}
                        onChange={handleEditChange("password")}
                        fullWidth
                    />
                    <TextField
                        label="Role"
                        value={selectedUser?.roleId || ""}
                        onChange={handleEditChange("roleId")}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setEditOpen(false)} color="secondary">Cancel</Button>
                    <Button onClick={handleEditSubmit} color="primary">Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
