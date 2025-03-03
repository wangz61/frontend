import { BarChart } from "@mui/x-charts";
import { useDataLoad } from "../../hooks/useDataLoad";
import { getOrders } from "../../api/orders.api";
import { Box, CircularProgress } from "@mui/material";
import { Order } from "../../types";

export default function Dashboard() {

    const { data: orders, isLoading } = useDataLoad(getOrders)

    if (isLoading) {
        return <Box display="flex" justifyContent="center" alignItems="center" height="70vh">
            <CircularProgress />
        </Box>;
    }

    const groupedOrders = orders?.reduce((acc: Record<string, Order[]>, order: Order) => {
        const dayStr: string = order.createdAt.split('T')[0]
        if (!acc[dayStr]) {
            acc[dayStr] = [order]
        } else {
            acc[dayStr].push(order)
        }
        return acc
    }, {} as Record<string, Order[]>)

    const dates = Object.keys(groupedOrders ?? {}).sort()

    const series = dates.map((date) => groupedOrders?.[date]?.length ?? 0)


    return (
        <div>
            <h1>Dashboard</h1>
            <BarChart
                xAxis={[
                    {
                        scaleType: 'band',
                        data: dates
                    }
                ]}
                series={[{ data: series , label: 'Orders'}]}
                height={300}
                barLabel={'value'}
            />
        </div>
    )
}