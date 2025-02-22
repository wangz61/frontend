import { useState, useEffect } from "react";
import { Production } from "../../types";
import { TextField, Box, CircularProgress, Button } from "@mui/material";
import { createProduction } from "../../api/productions.api";

const initialProduction: Partial<Production> = {
    title: "",
    description: "",
    price: 0
};

export default function CreateProductions() {
    const [productions, setProductions] = useState<Partial<Production>>(initialProduction);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setLoading(false);
        };
        fetchData();
    }, []);
    
    const handleChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setProductions({ ...productions, [field]: event.target.value });
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(productions);
        await createProduction(productions);
        setProductions(initialProduction);
    };

    if (loading) {
        return <Box display="flex" justifyContent="center" alignItems="center" height="70vh"><CircularProgress /></Box>
    }

    return (
        <div>
            <h1>Create Productions</h1>
            <Box display="flex" flexDirection="column" gap={2} width="500px">
                <TextField label="Title" value={productions?.title} onChange={handleChange("title")} />
                <TextField label="Description" value={productions?.description} onChange={handleChange("description")} />
                <TextField label="Price" value={productions?.price} onChange={handleChange("price")} />
                <form onSubmit={handleSubmit}>
                    <Button type="submit" variant="contained" color="primary">Create</Button>
                </form>
            </Box>
        </div>
    );
}

