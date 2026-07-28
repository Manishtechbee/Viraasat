import { FileText } from "lucide-react";

export default function Terms() {
  return (
    <section className="bg-[#F8F3EC] min-h-screen py-20">

      <div className="max-w-5xl mx-auto px-6">

        <div className="text-center">

          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#20196D]/10 text-[#20196D] font-medium">
            <FileText size={18} />
            Terms & Conditions
          </div>

          <h1 className="text-5xl font-bold text-[#20196D] mt-6">
            Terms & Conditions
          </h1>

          <p className="text-gray-500 mt-4">
            Last Updated: July 2026
          </p>

        </div>

        <div className="mt-14 bg-white rounded-3xl shadow-sm border border-[#EFE5D8] p-10 space-y-10">

          <section>
            <h2 className="text-2xl font-semibold text-[#20196D] mb-4">
              Acceptance of Terms
            </h2>

            <p className="text-gray-600 leading-8">
              By accessing Viraasat, you agree to these Terms and Conditions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#20196D] mb-4">
              User Responsibilities
            </h2>

            <p className="text-gray-600 leading-8">
              Users agree to use the platform responsibly and not engage in
              activities that disrupt or misuse the service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#20196D] mb-4">
              Intellectual Property
            </h2>

            <p className="text-gray-600 leading-8">
              All platform content, branding, and design belong to Viraasat
              unless otherwise stated.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#20196D] mb-4">
              Limitation of Liability
            </h2>

            <p className="text-gray-600 leading-8">
              Viraasat is provided "as is" without warranties regarding
              uninterrupted availability or accuracy of all information.
            </p>
          </section>

        </div>

      </div>

    </section>
  );
}