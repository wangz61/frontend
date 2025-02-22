import { useState, useEffect } from "react";
import { User } from "../../types";
import { Role } from "../../types";
import { createUser } from "../../api/users.api";
import { TextField, Box, CircularProgress, OutlinedInput, InputLabel, MenuItem, FormControl, Select, SelectChangeEvent, Button, useTheme } from "@mui/material";
import { getRoles } from "../../api/roles.api";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const initialUser: Partial<User> = {
    name: "",
    email: "",
    password: "",
    roleId: "",
};

export default function EditUsers() {
    const theme = useTheme();
    const [user, setUser] = useState<Partial<User>>(initialUser);
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

    const handleChange = (field: keyof User) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setUser({
            ...user,
            [field]: event.target.value,
        });
    };

    const handleSelectChange = (event: SelectChangeEvent<string>) => {
        const selectedId = event.target.value as string;

        setUser({
            ...user,
            roleId: selectedId,
        });
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("Submitting role:", user);

        const formattedUser = {
            ...user,
            roleId: user.roleId,
        };

        try {
            await createUser(formattedUser);
            alert("User created successfully!");
            setUser(initialUser);
        } catch (error) {
            console.error("Role creation failed:", error);
            alert("Failed to create role.");
        }
    };

    if (loading) {
        return <Box display="flex" justifyContent="center" alignItems="center" height="70vh">
            <CircularProgress />
        </Box>;
    }

    return (
        <div>
            <h1>Create Role</h1>
            <Box display="flex" flexDirection="column" gap={2} width="500px">
                
                <FormControl>
                    <InputLabel id="permissions-select-label">Permissions</InputLabel>
                    <Select
                        labelId="permissions-select-label"
                        id="permissions-select"
                        multiple
                        value={user.roleId}
                        onChange={handleSelectChange}
                        input={<OutlinedInput label="Permissions" />}
                        MenuProps={MenuProps}
                        renderValue={() => (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {roles.map((role) => (
                                    <MenuItem
                                        key={role.id}
                                        value={role.id}
                                    >
                                        {role.name}
                                    </MenuItem>
                                ))}
                            </Box>
                        )}
                    >
                        {roles.map((role) => (
                            <MenuItem
                                key={role.id}
                                value={role.id}
                                style={{ fontWeight: role.id === user.roleId ? theme.typography.fontWeightMedium : theme.typography.fontWeightRegular }}
                            >
                                {role.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <TextField label="Name" value={user.name} onChange={handleChange("name")} />
                <TextField label="Email" value={user.email} onChange={handleChange("email")} />
                <TextField label="Password" value={user.password} onChange={handleChange("password")} />
                <form onSubmit={handleSubmit}>
                    <Button type="submit" variant="contained" color="primary">Submit</Button>
                </form>
            </Box>
        </div>
    );
}
