import { HeaderTemplate } from "../../templates/HeaderTemplate";

export function AboutUs() {
    return (
        <HeaderTemplate>
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-4">About Us</h1>
                <p className="mb-4">
                    At Taste Explorer, we're passionate about simplifying your culinary experience. Our app is designed to help you manage your pantry and create delicious meals based on the ingredients you have on hand.
                </p>
                <p className="mb-4">
                    With Taste Explorer, you can effortlessly keep track of your pantry items, including their names, expiration dates, and quantities. We'll even send you handy notifications when your ingredients are running low.
                </p>
                <p className="mb-4">
                    Our app offers a diverse range of recipes tailored to the ingredients you have in your pantry, reducing food waste and making meal planning a breeze. Customize your profile with dietary restrictions and personal preferences to receive personalized recipe recommendations.
                </p>
                <p className="mb-4">
                    Taste Explorer is not just a pantry manager; it's a culinary community. Join our recipe sharing platform, where you can share your culinary creations, discover new recipes, and connect with fellow food enthusiasts. Use our integration with Google Maps to find nearby markets and receive daily recipe suggestions.
                </p>
                <p className="mb-4">
                    Thank you for choosing Taste Explorer to revolutionize your daily culinary management. Let's explore the world of flavors and make cooking an enjoyable adventure!
                </p>
            </div>
        </HeaderTemplate>
    );
}

export default AboutUs;