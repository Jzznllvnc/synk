import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <Link 
            href="/auth/login" 
            className="text-primary-600 hover:text-primary-700 mb-6 inline-block"
          >
            ← Back to Login
          </Link>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
          
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-600 mb-4">
              Last updated: {new Date().toLocaleDateString()}
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-3">1. Information We Collect</h2>
            <p className="text-gray-700 mb-4">
              We collect information you provide directly to us, including your name, email address, and any content you create within the app (tasks, notes, files, events).
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-3">2. How We Use Your Information</h2>
            <p className="text-gray-700 mb-4">
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li>Provide, maintain, and improve our services</li>
              <li>Process and complete transactions</li>
              <li>Send you technical notices and support messages</li>
              <li>Respond to your comments and questions</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-3">3. Data Security</h2>
            <p className="text-gray-700 mb-4">
              We use industry-standard security measures to protect your data. All data is encrypted in transit and at rest. We implement Row Level Security (RLS) to ensure your data is only accessible by you.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-3">4. Data Storage</h2>
            <p className="text-gray-700 mb-4">
              Your data is stored on secure servers provided by Supabase. We do not sell, trade, or transfer your personal information to third parties.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-3">5. Cookies and Tracking</h2>
            <p className="text-gray-700 mb-4">
              We use cookies and similar tracking technologies to maintain your session and improve your experience. You can control cookies through your browser settings.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-3">6. Your Rights</h2>
            <p className="text-gray-700 mb-4">
              You have the right to:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li>Access your personal data</li>
              <li>Correct inaccurate data</li>
              <li>Delete your account and data</li>
              <li>Export your data</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-3">7. Data Retention</h2>
            <p className="text-gray-700 mb-4">
              We retain your data for as long as your account is active. If you delete your account, your data will be permanently deleted within 30 days.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-3">8. Children's Privacy</h2>
            <p className="text-gray-700 mb-4">
              Synk is not intended for children under 13. We do not knowingly collect personal information from children under 13.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-3">9. Changes to Privacy Policy</h2>
            <p className="text-gray-700 mb-4">
              We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-3">10. Contact Us</h2>
            <p className="text-gray-700 mb-4">
              If you have any questions about this Privacy Policy, please contact us through the app support section.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

