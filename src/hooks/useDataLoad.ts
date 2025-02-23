import { useEffect, useState } from "react";

export const useDataLoad = <T>(api: (params?: any)=> Promise<T>) => {
    const [data, setData] = useState<T | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const data = await api();
            setData(data);
            setIsLoading(false);
        };
        fetchData();
    }, []);
    return { data, isLoading };
};

