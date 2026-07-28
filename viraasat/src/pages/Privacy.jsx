import { Shield } from "lucide-react";

export default function Privacy() {
  return (
    <section className="bg-[#F8F3EC] min-h-screen py-20">
      <div className="max-w-5xl mx-auto px-6">

        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#20196D]/10 text-[#20196D] font-medium">
            <Shield size={18} />
            Privacy Policy
          </div>

          <h1 className="text-5xl font-bold text-[#20196D] mt-6">
            Privacy Policy
          </h1>

          <p className="text-gray-500 mt-4">
            Last Updated: July 2026
          </p>
        </div>

        <div className="mt-14 bg-white rounded-3xl shadow-sm border border-[#EFE5D8] p-10 space-y-10">

          <section>
            <h2 className="text-2xl font-semibold text-[#20196D] mb-4">
              Information We Collect
            </h2>

            <p className="text-gray-600 leading-8">
              We collect only the information necessary to provide our
              services, including account details, preferences, search
              history, and feedback submitted through Viraasat.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#20196D] mb-4">
              How We Use Information
            </h2>

            <p className="text-gray-600 leading-8">
              Your information helps personalize recommendations, improve
              our AI guide, enhance user experience, and maintain platform
              security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#20196D] mb-4">
              Data Security
            </h2>

            <p className="text-gray-600 leading-8">
              We implement industry-standard security measures to protect
              your information against unauthorized access, disclosure,
              alteration, or destruction.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#20196D] mb-4">
              Contact Us
            </h2>

            <p className="text-gray-600 leading-8">
              If you have any questions regarding this Privacy Policy,
              please contact us at support@viraasat.in.
            </p>
          </section>

        </div>
      </div>
    </section>
  );
}