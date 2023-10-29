import { HeaderTemplate } from "../../templates/HeaderTemplate";

export function AboutUs() {
    return (
        <HeaderTemplate>
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-4">About Us</h1>
                <p className="mb-4">
                    At BookVerse, we believe in the power of books to inspire, entertain, and transform lives. Our online bookstore is dedicated to providing a vast selection of books across various genres, ensuring that readers of all interests can find their next favorite read.
                </p>
                <p className="mb-4">
                    We strive to make the book-buying experience as convenient and enjoyable as possible. Our user-friendly platform allows you to easily browse through our extensive collection, read book descriptions and reviews, and make secure purchases. Whether you prefer the feel of a physical book in your hands or the convenience of an eBook, we have you covered.
                </p>
                <p className="mb-4">
                    Our team is passionate about literature and dedicated to curating a diverse range of titles from both established authors and emerging voices. We work closely with publishers and authors to bring you the latest releases, timeless classics, and hidden gems.
                </p>
                <p className="mb-4">
                    We value your satisfaction and are committed to providing exceptional customer service. If you have any questions, concerns, or feedback, our support team is always ready to assist you. We believe in fostering a vibrant reading community, so we encourage you to connect with us and fellow book lovers through our blog, social media channels, and events.
                </p>
                <p className="mb-4">
                    Thank you for choosing BookVerse as your trusted source for books. We hope you embark on many exciting literary adventures with us!
                </p>
            </div>
        </HeaderTemplate>
    );
}

export default AboutUs;