import { HeaderTemplate } from "../../templates/HeaderTemplate";

export function TermsAndConditions() {
    return (
        <HeaderTemplate>
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-4">Terms and Conditions</h1>
                <p className="mb-8">
                    Please read these terms and conditions carefully before using our online bookstore application.
                </p>
                <ol className="list-decimal pl-6 mb-8">
                    <li>
                        <h2 className="text-xl font-bold mb-2">Book Availability</h2>
                        <p>
                            While we make every effort to ensure accurate stock information, book availability is subject to change without notice. We reserve the right to cancel orders if a book becomes unavailable.
                        </p>
                    </li>
                    <li>
                        <h2 className="text-xl font-bold mb-2">Pricing</h2>
                        <p>
                            All prices listed on our website are in the local currency and inclusive of applicable taxes. Prices are subject to change at our discretion.
                        </p>
                    </li>
                    <li>
                        <h2 className="text-xl font-bold mb-2">Intellectual Property</h2>
                        <p>
                            All content on our application, including book descriptions, images, and logos, are protected by copyright and intellectual property laws. Unauthorized use or reproduction of our content is strictly prohibited.
                        </p>
                    </li>
                    <li>
                        <h2 className="text-xl font-bold mb-2">Privacy</h2>
                        <p>
                            We value your privacy and handle your personal information in accordance with our Privacy Policy. By using our application, you consent to the collection and use of your information as outlined in the policy.
                        </p>
                    </li>
                    <li>
                        <h2 className="text-xl font-bold mb-2">User Responsibilities</h2>
                        <p>
                            Users are responsible for maintaining the confidentiality of their account credentials and for any activity that occurs under their account. Users must provide accurate and up-to-date information during the registration process.
                        </p>
                    </li>
                    <li>
                        <h2 className="text-xl font-bold mb-2">Returns and Refunds</h2>
                        <p>
                            Please refer to our Return Policy for detailed information regarding returns and refunds.
                        </p>
                    </li>
                    <li>
                        <h2 className="text-xl font-bold mb-2">Governing Law</h2>
                        <p>
                            These terms and conditions shall be governed by and construed in accordance with the laws of [Your Jurisdiction]. Any disputes arising out of or in connection with these terms shall be subject to the exclusive jurisdiction of the courts of [Your Jurisdiction].
                        </p>
                    </li>
                </ol>
            </div>
        </HeaderTemplate>
    );
}

export default TermsAndConditions;