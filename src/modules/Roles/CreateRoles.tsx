import { useState, useEffect } from "react";
import PERMISSIONS from "../../constants";
import { Role } from "../../types";
import { TextField, Box, CircularProgress, OutlinedInput, InputLabel, MenuItem, FormControl, Select, SelectChangeEvent, Button, Chip, useTheme } from "@mui/material";
import { createRole } from "../../api/roles.api";

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

// 将 PERMISSIONS 转换为 { id, name } 数组
const formatPermissions = () => {
  return Object.entries(PERMISSIONS).flatMap(([category, perms]) =>
    Object.entries(perms).map(([key, value]) => ({
      id: value, // 权限字符串作为 id
      name: `${category} - ${key}`, // 组合权限类别和名称
    }))
  );
};

const initialRole: Partial<Role> = {
    name: "",
    permissions: [],
};

export default function CreateRoles() {
    const theme = useTheme();
    const [role, setRole] = useState<Partial<Role>>(initialRole);
    const [permissions, setPermissions] = useState<{ id: string, name: string }[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        setPermissions(formatPermissions()); // 转换 PERMISSIONS
        setLoading(false);
    }, []);

    const handleChange = (field: keyof Role) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setRole({
            ...role,
            [field]: event.target.value,
        });
    };

    const handleSelectChange = (event: SelectChangeEvent<string[]>) => {
        const selectedIds = event.target.value as string[];
        const selectedPermissions = permissions.filter(p => selectedIds.includes(p.id));

        setRole({
            ...role,
            permissions: selectedPermissions.map(p => p.id), // 只传递 id 数组
        });
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("Submitting role:", role);

        const formattedRole = {
            ...role,
            permissions: role.permissions?.map((p: string) => p) || [], // 只传递 id 数组
        };

        try {
            await createRole(formattedRole);
            alert("Role created successfully!");
            setRole(initialRole);
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
                <TextField label="Name" value={role.name} onChange={handleChange("name")} />
                <FormControl>
                    <InputLabel id="permissions-select-label">Permissions</InputLabel>
                    <Select
                        labelId="permissions-select-label"
                        id="permissions-select"
                        multiple
                        value={role.permissions?.map((p: string) => p) || []}
                        onChange={handleSelectChange}
                        input={<OutlinedInput label="Permissions" />}
                        MenuProps={MenuProps}
                        renderValue={(selected) => (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {selected.map((id) => {
                                    const permission = permissions.find(p => p.id === id);
                                    return permission ? <Chip key={id} label={permission.name} /> : null;
                                })}
                            </Box>
                        )}
                    >
                        {permissions.map((permission) => (
                            <MenuItem
                                key={permission.id}
                                value={permission.id}
                                style={{ fontWeight: role.permissions?.some((p: string) => p === permission.id) ? theme.typography.fontWeightMedium : theme.typography.fontWeightRegular }}
                            >
                                {permission.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <form onSubmit={handleSubmit}>
                    <Button type="submit" variant="contained" color="primary">Create</Button>
                </form>
            </Box>
        </div>
    );
}
