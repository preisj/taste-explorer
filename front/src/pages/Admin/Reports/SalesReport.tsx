import React, {useEffect, useRef, useState} from 'react';
import * as echarts from 'echarts';
import {getOrderItems} from "../../../api/orderItem/orderItem.service";
import {getAllOrders} from "../../../api/order/order.service";
import {getBook} from "../../../api/book/book.service";
import {getPerson} from "../../../api/person/person.service";

export const SalesReport = () => {
    const [chartInstance, setChartInstance] = useState<echarts.ECharts | null>(null); // [1
    const chartRef = useRef<HTMLDivElement>(null);

    const height = window.innerHeight * 0.85;
    const width = window.innerWidth * 0.9;

    useEffect(() => {
        if (chartRef.current) {
            echarts.dispose(chartRef.current);
            (async () => {
                const orders = await getAllOrders();

                const orderItems = await Promise.all(orders.map((order) => getOrderItems(order.id)));

                // Fetching person details for each order
                const personPromises = orders.map((order) => getPerson(order.personId));
                const persons = await Promise.all(personPromises);

                // Extracting necessary data from fetched objects
                const salesData = await Promise.all(orders.map(async (order, index) => {
                    const books = await Promise.all(orderItems[index].map(async (orderItem) => {
                        return await getBook(orderItem.bookId);
                    }));

                    const bookQuantity = orderItems[index].map((orderItem) => {
                        return {
                            bookId: orderItem.bookId,
                            quantity: orderItem.quantity,
                            price: orderItem.price,
                        };
                    });

                    return {
                        date: order.createdAt, // Assuming createdAt represents the date of the order
                        sales: order.totalPrice,
                        books: books,
                        person: persons[index],
                        bookQuantity: bookQuantity,
                    };
                }));

                const chartData = await Promise.all(salesData.map(async (data) => ({
                    name: data.date,
                    value: [data.date, data.sales, data.books, data.person, data.bookQuantity],
                })));


                // ECharts options
                const options = {
                    tooltip: {
                        trigger: 'axis',
                        formatter: (params: { data: any; }[]) => {
                            const data = params[0].data;

                            // Extracting data from the object
                            const date = new Date(data.name).toLocaleString();
                            const person = data.value[3];
                            const books = data.value[2];
                            const totalPrice = data.value[1];

                            const bookQuantity = data.value[4];

                            // Formatting the books array
                            const formattedBooks = books.map((book: { id: any, title: any; quantity: any; }) => {
                                const quantity = bookQuantity.find((bookQuantity: { bookId: any; }) => bookQuantity.bookId === book.id).quantity
                                const price = bookQuantity.find((bookQuantity: { bookId: any; }) => bookQuantity.bookId === book.id).price
                                return `<br>
                                        - Title: ${book.title}<br>
                                        - Quantity: ${quantity}<br> 
                                        - Price: US\$ ${price}<br>`;
                            }).join('\n');

                            // Formatting the final output
                            return `Date: ${date}<br>
                                    Person: ${person.firstName} ${person.lastName}<br><br>
                                    Books:
                                    ${formattedBooks}
                                    <br>
                                    Total price: US\$ ${totalPrice}`;
                        },
                    },
                    xAxis: {
                        type: 'category',
                        data: salesData.map((data) => data.date),
                        name: 'Order Date', // Add X-axis label
                    },
                    yAxis: {
                        type: 'value',
                        name: 'Price', // Add Y-axis label
                    },
                    series: [
                        {
                            type: 'line',
                            data: chartData,
                        },
                    ],
                };

                if (chartRef.current) {
                    const chart = echarts.init(chartRef.current);
                    chart.setOption(options);
                    setChartInstance(chart);
                }
            })();
        }
    }, []);

    const exportToPNG = () => {
        if (chartRef.current && chartInstance) {
            const chart = echarts.getInstanceByDom(chartRef.current);
            const dataURL = chartInstance.getDataURL({
                type: 'png',
                pixelRatio: 2,
                backgroundColor: '#fff',
            });

            const link = document.createElement('a');
            link.href = dataURL;
            link.download = 'sales_report.png';
            link.click();
        }
    };

    return (
        <div>
            <div className="flex justify-center">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={exportToPNG}>Export to PNG
                </button>
            </div>
            <div ref={chartRef} style={{width: width, height: height}}/>
        </div>
    );
};
export default SalesReport;
