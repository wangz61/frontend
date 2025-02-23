import { BarChart } from "@mui/x-charts";
import { useDataLoad } from "../../hooks/useDataLoad";
import { getOrders } from "../../api/orders.api";
import { CircularProgress } from "@mui/material";
import { Order } from "../../types";

export default function Dashboard() {

    const { data: orders, isLoading } = useDataLoad(getOrders)


    if (isLoading) {
        return <CircularProgress />
    }

    // [order1, order2, order3, order4, order5, order6]

    // {
    //     '2024-01-01': [order1, order2],
    //     '2024-01-02': [order3, order4],
    //     '2024-01-03': [order5, order6],
    // }

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