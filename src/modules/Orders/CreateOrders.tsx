import { useState, useEffect } from "react";
import { Order, Production } from "../../types";
import { TextField, Box, CircularProgress, OutlinedInput, InputLabel, MenuItem, FormControl, Select, SelectChangeEvent, Button, Chip, Theme, useTheme } from "@mui/material";
import { createOrder } from "../../api/orders.api";
import { getProductions } from "../../api/productions.api";

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

function getStyles(name: string, selectedIds: (string | number)[], theme: Theme) {
  return {
    fontWeight: selectedIds.includes(name)
      ? theme.typography.fontWeightMedium
      : theme.typography.fontWeightRegular,
  };
}

const initialOrder: Partial<Order> = {
    name: "",
    email: "",
    createdAt: new Date().toISOString(),
    totalPrice: 0,
    productions: [],
};

export default function CreateOrders() {
    const theme = useTheme();
    const [order, setOrder] = useState<Partial<Order>>(initialOrder);
    const [productions, setProductions] = useState<Production[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const productionsData = await getProductions();
            setProductions(productionsData);
            setLoading(false);
        };
        fetchData();
    }, []);

    const handleChange = (field: keyof Order) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setOrder({
            ...order,
            [field]: field === "totalPrice" ? parseFloat(event.target.value) || 0 : event.target.value,
        });
    };

    const handleSelectChange = (event: SelectChangeEvent<string[]>) => {
        const selectedIds = event.target.value as string[];
        const selectedProductions = productions.filter(p => selectedIds.includes(String(p.id)));

        setOrder({
            ...order,
            productions: selectedProductions,
        });
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("Submitting order:", order);

        const formattedOrder = {
            ...order,
            totalPrice: order.totalPrice || 0,
            productions: order.productions?.map(p => p.id) || [],
        };

        try {
            await createOrder(formattedOrder);
            alert("Order created successfully!");
            setOrder(initialOrder);
        } catch (error) {
            console.error("Order creation failed:", error);
            alert("Failed to create order.");
        }
    };

    if (loading) {
        return <Box display="flex" justifyContent="center" alignItems="center" height="70vh">
            <CircularProgress />
        </Box>;
    }

    return (
        <div>
            <h1>Create Order</h1>
            <Box display="flex" flexDirection="column" gap={2} width="500px">
                <TextField label="Name" value={order.name} onChange={handleChange("name")} />
                <TextField label="Email" value={order.email} onChange={handleChange("email")} />
                <TextField label="Total Price" value={order.totalPrice?.toString()} onChange={handleChange("totalPrice")} />
                <FormControl>
                    <InputLabel id="productions-select-label">Productions</InputLabel>
                    <Select
                        labelId="productions-select-label"
                        id="productions-select"
                        multiple
                        value={order.productions?.map(p => String(p.id)) || []}
                        onChange={handleSelectChange}
                        input={<OutlinedInput label="Productions" />}
                        MenuProps={MenuProps}
                        renderValue={(selected) => (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {selected.map((id) => {
                                    const production = productions.find(p => String(p.id) === id);
                                    return production ? <Chip key={id} label={production.title} /> : null;
                                })}
                            </Box>
                        )}
                    >
                        {productions.map((production) => (
                            <MenuItem
                                key={production.id}
                                value={String(production.id)}
                                style={getStyles(production.title, order.productions?.map(p => String(p.id)) || [], theme)}
                            >
                                {production.title}
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
