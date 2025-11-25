// Mock backend service for order management
const ORDERS_KEY = 'pureline_orders';

// Generate unique order ID
const generateOrderId = () => {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return `ORD-${timestamp}-${random}`;
};

// Get all orders from localStorage
export const getAllOrders = () => {
    try {
        const orders = localStorage.getItem(ORDERS_KEY);
        return orders ? JSON.parse(orders) : [];
    } catch (error) {
        console.error('Error loading orders:', error);
        return [];
    }
};

// Get single order by ID
export const getOrderById = (orderId) => {
    const orders = getAllOrders();
    return orders.find((order) => order.id === orderId);
};

// Create new order
export const createOrder = (orderData) => {
    const orders = getAllOrders();
    const newOrder = {
        id: generateOrderId(),
        ...orderData,
        status: 'pending',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };

    orders.push(newOrder);
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));

    return newOrder;
};

// Update order status
export const updateOrderStatus = (orderId, status) => {
    const orders = getAllOrders();
    const updatedOrders = orders.map((order) =>
        order.id === orderId
            ? { ...order, status, updatedAt: new Date().toISOString() }
            : order
    );

    localStorage.setItem(ORDERS_KEY, JSON.stringify(updatedOrders));
    return updatedOrders.find((order) => order.id === orderId);
};

// Get order statistics
export const getOrderStats = () => {
    const orders = getAllOrders();

    const stats = {
        totalOrders: orders.length,
        totalRevenue: orders.reduce((sum, order) => sum + order.total, 0),
        statusBreakdown: {
            pending: orders.filter((o) => o.status === 'pending').length,
            processing: orders.filter((o) => o.status === 'processing').length,
            completed: orders.filter((o) => o.status === 'completed').length,
            cancelled: orders.filter((o) => o.status === 'cancelled').length,
        },
        recentOrders: orders
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .slice(0, 5),
    };

    return stats;
};

// Delete order (for testing purposes)
export const deleteOrder = (orderId) => {
    const orders = getAllOrders();
    const filteredOrders = orders.filter((order) => order.id !== orderId);
    localStorage.setItem(ORDERS_KEY, JSON.stringify(filteredOrders));
};

// Clear all orders (for testing purposes)
export const clearAllOrders = () => {
    localStorage.removeItem(ORDERS_KEY);
};
