import Link from 'next/link';

export default function TermsPage() {
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
          
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Terms of Service</h1>
          
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-600 mb-4">
              Last updated: {new Date().toLocaleDateString()}
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-3">1. Acceptance of Terms</h2>
            <p className="text-gray-700 mb-4">
              By accessing and using Synk, you accept and agree to be bound by the terms and provision of this agreement.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-3">2. Use License</h2>
            <p className="text-gray-700 mb-4">
              Permission is granted to temporarily use Synk for personal, non-commercial transitory viewing only.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-3">3. User Accounts</h2>
            <p className="text-gray-700 mb-4">
              You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-3">4. Data Storage</h2>
            <p className="text-gray-700 mb-4">
              Your data is stored securely and is only accessible by you. We do not share your personal data with third parties without your consent.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-3">5. Prohibited Uses</h2>
            <p className="text-gray-700 mb-4">
              You may not use Synk for any illegal or unauthorized purpose. You must not transmit any malicious code or interfere with the service.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-3">6. Termination</h2>
            <p className="text-gray-700 mb-4">
              We may terminate or suspend your account immediately, without prior notice, for any reason, including breach of these Terms.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-3">7. Changes to Terms</h2>
            <p className="text-gray-700 mb-4">
              We reserve the right to modify these terms at any time. We will notify users of any changes by updating the date at the top of this page.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-3">8. Contact</h2>
            <p className="text-gray-700 mb-4">
              If you have any questions about these Terms, please contact us through the app support section.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

