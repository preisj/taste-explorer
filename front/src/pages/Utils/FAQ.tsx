import { HeaderTemplate } from "../../templates/HeaderTemplate";

export function FAQ() {
    return (
        <HeaderTemplate>
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-4">Frequently Asked Questions</h1>
                <div className="mb-8">
                    <h2 className="text-xl font-bold mb-4">How can I place an order?</h2>
                    <p>
                        Placing an order is simple! Just follow these steps:
                    </p>
                    <ol className="list-decimal pl-6 mt-2 mb-4">
                        <li>Browse our collection and click on a book to view its details.</li>
                        <li>Find a desired book and click "Add to Cart".</li>
                        <li>Review the items in your cart and proceed to checkout.</li>
                        <li>Provide your shipping address and payment information.</li>
                        <li>Confirm your order, and you're done! We'll take care of the rest.</li>
                    </ol>
                </div>
                <div className="mb-8">
                    <h2 className="text-xl font-bold mb-4">What payment methods do you accept?</h2>
                    <p>
                        We accept major credit cards, including Visa, Mastercard, and American Express. You can also use popular payment platforms like PayPal for a secure and convenient checkout experience.
                    </p>
                </div>
                <div className="mb-8">
                    <h2 className="text-xl font-bold mb-4">How long does delivery take?</h2>
                    <p>
                        Delivery times may vary based on your location and the availability of the book. Generally, we aim to deliver within 3-5 business days for physical copies. For eBooks, you can instantly download them after completing your purchase.
                    </p>
                </div>
                <div className="mb-8">
                    <h2 className="text-xl font-bold mb-4">What if I receive a damaged book or have other issues with my order?</h2>
                    <p>
                        We take pride in the quality of our products and services. If you receive a damaged book or have any issues with your order, please contact our customer support team within 7 days of receiving your package. We'll gladly assist you and provide a suitable solution.
                    </p>
                </div>
            </div>
        </HeaderTemplate>
    );
}

export default FAQ;