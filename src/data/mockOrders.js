export const mockOrders = [
  {
    order_id: "AMZ-12345678",
    platform: "Amazon",
    order_date: "2025-01-20",
    items: ["Bluetooth Headset", "USB-C Cable"],
    total_amount: 2499,
    payment_mode: "UPI",
    tracking_id: "TBA123456789",
    delivery_status: "Out for Delivery",
    delivery_address: "Raj Residency, Sector 12, Bangalore, IN",
    tracking_url: "https://tracking.amazon.in/TBA123456789",
    email_snippet: "<p>Thank you for shopping with Amazon. Your order of Bluetooth Headset has been shipped.</p>"
  },
  {
    order_id: "FLP-98765432",
    platform: "Flipkart",
    order_date: "2025-01-18",
    items: ["Running Shoes"],
    total_amount: 1799,
    payment_mode: "Credit Card",
    tracking_id: "FK12345678",
    delivery_status: "Delivered",
    delivery_address: "Gulmohar Apartments, Noida Sector 62, UP",
    tracking_url: "https://flipkart.com/track/FK12345678",
    email_snippet: "<p>Your order from Flipkart has been delivered successfully. Thank you for shopping with us!</p>"
  },
  {
    order_id: "MYN-44556677",
    platform: "Myntra",
    order_date: "2025-01-15",
    items: ["Casual T-shirt", "Denim Jeans"],
    total_amount: 2199,
    payment_mode: "COD",
    tracking_id: "MN44556677",
    delivery_status: "Pending",
    delivery_address: "Lakeview Homes, Whitefield, Bangalore",
    tracking_url: "https://myntra.com/track/MN44556677",
    email_snippet: "<p>Your Myntra order is being prepared for dispatch.</p>"
  },
  {
    order_id: "AMZ-87654321",
    platform: "Amazon",
    order_date: "2025-01-12",
    items: ["Wireless Mouse", "Keyboard", "Mouse Pad"],
    total_amount: 3299,
    payment_mode: "Debit Card",
    tracking_id: "TBA987654321",
    delivery_status: "Delivered",
    delivery_address: "Tech Park Apartments, Electronic City, Bangalore",
    tracking_url: "https://tracking.amazon.in/TBA987654321",
    email_snippet: "<p>Your Amazon order has been delivered. Rate your experience!</p>"
  },
  {
    order_id: "FLP-11223344",
    platform: "Flipkart",
    order_date: "2025-01-10",
    items: ["Smartphone Case", "Screen Protector"],
    total_amount: 899,
    payment_mode: "UPI",
    tracking_id: "FK11223344",
    delivery_status: "Shipped",
    delivery_address: "Sunrise Towers, Gurgaon, HR",
    tracking_url: "https://flipkart.com/track/FK11223344",
    email_snippet: "<p>Your Flipkart order is on its way! Expected delivery in 2-3 days.</p>"
  },
  {
    order_id: "MYN-55667788",
    platform: "Myntra",
    order_date: "2025-01-08",
    items: ["Winter Jacket"],
    total_amount: 4599,
    payment_mode: "Credit Card",
    tracking_id: "MN55667788",
    delivery_status: "Cancelled",
    delivery_address: "Green Valley Society, Pune, MH",
    tracking_url: "https://myntra.com/track/MN55667788",
    email_snippet: "<p>Your Myntra order has been cancelled as per your request. Refund will be processed within 5-7 days.</p>"
  }
];

export const platforms = ["All", "Amazon", "Flipkart", "Myntra"];
export const deliveryStatuses = ["All", "Pending", "Shipped", "Out for Delivery", "Delivered", "Cancelled"];