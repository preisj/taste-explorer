import { HeaderTemplate } from "../../templates/HeaderTemplate";

export function FAQ() {
    return (
        <HeaderTemplate>
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-4">Frequently Asked Questions</h1>
                <div className="mb-8">
                    <h2 className="text-xl font-bold mb-4">How does the pantry and recipe management app work?</h2>
                    <p>
                        Our app simplifies your food organization and meal creation process. Here's how it works:
                    </p>
                    <ol className="list-decimal pl-6 mt-2 mb-4">
                        <li>Add products to your pantry, including their name, expiration date, and quantity.</li>
                        <li>Receive notifications when your pantry items are running low.</li>
                        <li>Explore a wide range of recipes based on the ingredients available in your pantry.</li>
                        <li>Customize your profile with dietary restrictions and personal preferences for personalized recipe recommendations.</li>
                        <li>Join our recipe sharing community to post your culinary creations and discover new ideas.</li>
                        <li>Use Google Maps integration to find nearby markets and get daily dish suggestions.</li>
                    </ol>
                </div>
                <div className="mb-8">
                    <h2 className="text-xl font-bold mb-4">What features are available in the app?</h2>
                    <p>
                        Our app offers the following features:
                    </p>
                    <ul className="list-disc pl-6 mt-2 mb-4">
                        <li>Pantry management with notifications for low-stock items.</li>
                        <li>Recipe suggestions based on your pantry ingredients.</li>
                        <li>Customizable user profiles with dietary restrictions and preferences.</li>
                        <li>A recipe sharing community to post and discover new recipes.</li>
                        <li>Integration with Google Maps to find nearby markets.</li>
                        <li>Daily dish suggestions for your culinary adventures.</li>
                    </ul>
                </div>
            </div>
        </HeaderTemplate>
    );
}

export default FAQ;