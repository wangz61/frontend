import { useState, useEffect } from "react";
import { User, Role } from "../../types";
import { TextField, Box, CircularProgress, Select, MenuItem, SelectChangeEvent, InputLabel, FormControl, Button } from "@mui/material";
import { getRoles } from "../../api/roles.api";
import { createUser } from "../../api/users.api";

const initialUser: Partial<User> = {
    name: "",
    email: "",
    roleId: "",
    password: "",
};

export default function CreateUsers() {
    const [users, setUsers] = useState<Partial<User>>(initialUser);
    const [roles, setRoles] = useState<Role[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const roles = await getRoles();
            setRoles(roles);
            setLoading(false);
        };
        fetchData();
    }, []);
    
    const handleChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsers({ ...users, [field]: event.target.value });
    };

    const handleSelectChange = (event: SelectChangeEvent<string>) => {
        setUsers({ ...users, roleId: event.target.value });
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(users);
        await createUser(users);
        setUsers(initialUser);
    };

    if (loading) {
        return <Box display="flex" justifyContent="center" alignItems="center" height="70vh"><CircularProgress /></Box>
    }

    return (
        <div>
            <h1>Create Users</h1>
            <Box display="flex" flexDirection="column" gap={2} width="500px">
                <TextField label="Name" value={users?.name} onChange={handleChange("name")} />
                <TextField label="Email" value={users?.email} onChange={handleChange("email")} />
                <TextField label="Password" value={users?.password} onChange={handleChange("password")} />
                <FormControl fullWidth>
                    <InputLabel id="role-select-label">Role</InputLabel>
                    <Select
                        labelId="role-select-label"
                        id="role-select"
                        value={users?.roleId}
                        label="Role"
                        onChange={handleSelectChange}
                    >
                        {roles.map((role) => {
                            return <MenuItem key={role.id} value={role.id}>{role.name}</MenuItem>
                        })}
                    </Select> 
                </FormControl>
                <form onSubmit={handleSubmit}>
                    <Button type="submit" variant="contained" color="primary">Create</Button>
                </form>
            </Box>
        </div>
    );
}

