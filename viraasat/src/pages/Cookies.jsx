import { Cookie } from "lucide-react";

export default function Cookies() {
  return (
    <section className="bg-[#F8F3EC] min-h-screen py-20">

      <div className="max-w-5xl mx-auto px-6">

        <div className="text-center">

          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#20196D]/10 text-[#20196D] font-medium">
            <Cookie size={18} />
            Cookie Policy
          </div>

          <h1 className="text-5xl font-bold text-[#20196D] mt-6">
            Cookie Policy
          </h1>

          <p className="text-gray-500 mt-4">
            Last Updated: July 2026
          </p>

        </div>

        <div className="mt-14 bg-white rounded-3xl shadow-sm border border-[#EFE5D8] p-10 space-y-10">

          <section>
            <h2 className="text-2xl font-semibold text-[#20196D] mb-4">
              What Are Cookies?
            </h2>

            <p className="text-gray-600 leading-8">
              Cookies are small text files stored on your device to improve
              website functionality and user experience.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#20196D] mb-4">
              How We Use Cookies
            </h2>

            <p className="text-gray-600 leading-8">
              We use cookies to remember preferences, analyze traffic,
              improve performance, and personalize your experience.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#20196D] mb-4">
              Managing Cookies
            </h2>

            <p className="text-gray-600 leading-8">
              Most browsers allow you to manage or disable cookies through
              browser settings. Some features may not function properly if
              cookies are disabled.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#20196D] mb-4">
              Contact
            </h2>

            <p className="text-gray-600 leading-8">
              Questions regarding our Cookie Policy can be sent to
              support@viraasat.in.
            </p>
          </section>

        </div>

      </div>

    </section>
  );
}