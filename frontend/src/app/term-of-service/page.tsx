import { Separator } from "@/components/ui/separator";

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-blue-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="max-w-4xl mx-auto mb-16">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-4">
            Terms of Service
          </h1>
          <p className="text-muted-foreground text-sm">
            Last updated: November 5, 2025
          </p>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Introduction */}
          <section>
            <p className="leading-7">
              Welcome to Strinova OCR. By accessing or using our service, you agree to be bound by these Terms of Service. 
              Please read them carefully before using our OCR (Optical Character Recognition) service.
            </p>
          </section>

          <Separator />

          {/* 1. Acceptance of Terms */}
          <section>
            <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
              1. Acceptance of Terms
            </h2>
            <div className="space-y-4 mt-6">
              <p className="leading-7">
                By accessing and using Strinova OCR (&quot;the Service&quot;), you accept and agree to be bound by the terms 
                and provision of this agreement. If you do not agree to these terms, please do not use the Service.
              </p>
              <p className="leading-7">
                We reserve the right to update or modify these Terms of Service at any time without prior notice. 
                Your continued use of the Service after any such changes constitutes your acceptance of the new terms.
              </p>
            </div>
          </section>

          <Separator />

          {/* 2. Service Description */}
          <section>
            <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
              2. Service Description
            </h2>
            <div className="space-y-4 mt-6">
              <p className="leading-7">
                Strinova OCR provides optical character recognition services specifically designed for extracting text 
                and data from Strinova game screenshots. The Service includes:
              </p>
              <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
                <li>Damage statistics extraction</li>
                <li>Skill performance analysis</li>
                <li>Synergy data recognition</li>
                <li>Match replay information</li>
                <li>End match results extraction</li>
              </ul>
              <p className="leading-7">
                The Service is provided &quot;as is&quot; and we make no guarantees regarding accuracy, availability, or fitness 
                for a particular purpose.
              </p>
            </div>
          </section>

          <Separator />

          {/* 3. User Responsibilities */}
          <section>
            <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
              3. User Responsibilities
            </h2>
            <div className="space-y-4 mt-6">
              <p className="leading-7">When using the Service, you agree to:</p>
              <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
                <li>Upload only screenshots from the Strinova game that you have the right to use</li>
                <li>Not use the Service for any illegal or unauthorized purpose</li>
                <li>Not upload images containing malicious code, viruses, or harmful content</li>
                <li>Not attempt to reverse engineer, decompile, or extract the source code of the Service</li>
                <li>Not use automated systems or bots to access the Service without permission</li>
                <li>Not overload or attempt to disrupt the Service infrastructure</li>
              </ul>
            </div>
          </section>

          <Separator />

          {/* 4. Privacy and Data Processing */}
          <section>
            <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
              4. Privacy and Data Processing
            </h2>
            <div className="space-y-4 mt-6">
              <p className="leading-7">
                <strong>Image Processing:</strong> All uploaded screenshots are processed temporarily in memory 
                and are not permanently stored on our servers. Images are automatically deleted after processing is complete.
              </p>
              <p className="leading-7">
                <strong>Data Collection:</strong> We may collect anonymous usage statistics to improve the Service, 
                including but not limited to: number of scans, error rates, and processing times. No personally identifiable 
                information is collected without your explicit consent.
              </p>
              <p className="leading-7">
                <strong>Third-Party Services:</strong> The Service uses PaddleOCR technology for text recognition. 
                By using our Service, you also agree to comply with applicable third-party service terms.
              </p>
            </div>
          </section>

          <Separator />

          {/* 5. Intellectual Property */}
          <section>
            <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
              5. Intellectual Property
            </h2>
            <div className="space-y-4 mt-6">
              <p className="leading-7">
                <strong>Service Ownership:</strong> The Service, including its original content, features, and functionality, 
                is owned by Strinova Vietnam Series and is protected by international copyright, trademark, and other intellectual 
                property laws.
              </p>
              <p className="leading-7">
                <strong>Game Content:</strong> Strinova game assets, trademarks, and copyrights belong to their respective owners. 
                This Service is an independent fan project and is not officially affiliated with or endorsed by the game developers.
              </p>
              <p className="leading-7">
                <strong>User Content:</strong> You retain all rights to the screenshots you upload. By using the Service, 
                you grant us a temporary, non-exclusive license to process your images solely for providing OCR services.
              </p>
            </div>
          </section>

          <Separator />

          {/* 6. Disclaimer of Warranties */}
          <section>
            <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
              6. Disclaimer of Warranties
            </h2>
            <div className="space-y-4 mt-6">
              <p className="leading-7">
                THE SERVICE IS PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, 
                INCLUDING BUT NOT LIMITED TO:
              </p>
              <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
                <li>Accuracy or completeness of OCR results</li>
                <li>Uninterrupted or error-free operation</li>
                <li>Fitness for a particular purpose</li>
                <li>Non-infringement of third-party rights</li>
              </ul>
              <p className="leading-7">
                We do not guarantee that the Service will meet your specific requirements or that OCR results will be 100% accurate. 
                You use the Service at your own risk.
              </p>
            </div>
          </section>

          <Separator />

          {/* 7. Limitation of Liability */}
          <section>
            <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
              7. Limitation of Liability
            </h2>
            <div className="space-y-4 mt-6">
              <p className="leading-7">
                To the maximum extent permitted by law, Strinova OCR and its contributors shall not be liable for any indirect, 
                incidental, special, consequential, or punitive damages, including but not limited to:
              </p>
              <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
                <li>Loss of data or profits</li>
                <li>Service interruptions</li>
                <li>Errors in OCR results</li>
                <li>Unauthorized access to your transmissions or data</li>
              </ul>
              <p className="leading-7">
                In no event shall our total liability exceed the amount you paid to use the Service (if any).
              </p>
            </div>
          </section>

          <Separator />

          {/* 8. Service Availability */}
          <section>
            <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
              8. Service Availability
            </h2>
            <div className="space-y-4 mt-6">
              <p className="leading-7">
                We strive to maintain the Service operational 24/7, but we do not guarantee uninterrupted availability. 
                The Service may be temporarily unavailable due to:
              </p>
              <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
                <li>Scheduled maintenance</li>
                <li>Technical issues or server problems</li>
                <li>Force majeure events</li>
                <li>Third-party service disruptions</li>
              </ul>
              <p className="leading-7">
                We reserve the right to modify, suspend, or discontinue the Service (or any part thereof) at any time 
                without prior notice.
              </p>
            </div>
          </section>

          <Separator />

          {/* 9. Termination */}
          <section>
            <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
              9. Termination
            </h2>
            <div className="space-y-4 mt-6">
              <p className="leading-7">
                We reserve the right to terminate or suspend your access to the Service immediately, without prior notice 
                or liability, for any reason, including but not limited to:
              </p>
              <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
                <li>Violation of these Terms of Service</li>
                <li>Fraudulent or illegal activities</li>
                <li>Abuse or misuse of the Service</li>
                <li>Request by law enforcement or government agencies</li>
              </ul>
            </div>
          </section>

          <Separator />

          {/* 10. Governing Law */}
          <section>
            <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
              10. Governing Law
            </h2>
            <div className="mt-6">
              <p className="leading-7">
                These Terms shall be governed and construed in accordance with the laws of Vietnam, without regard to 
                its conflict of law provisions. Any disputes arising from these Terms or the Service shall be resolved 
                through good faith negotiation.
              </p>
            </div>
          </section>

          <Separator />

          {/* 11. Changes to Terms */}
          <section>
            <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
              11. Changes to Terms
            </h2>
            <div className="mt-6">
              <p className="leading-7">
                We reserve the right to modify these Terms at any time. We will notify users of any material changes by 
                updating the &quot;Last updated&quot; date at the top of this page. Your continued use of the Service after such 
                modifications constitutes your acceptance of the updated Terms.
              </p>
            </div>
          </section>

          <Separator />

          {/* 12. Contact Information */}
          <section>
            <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
              12. Contact Information
            </h2>
            <div className="space-y-4 mt-6">
              <p className="leading-7">
                If you have any questions about these Terms of Service, please contact us through:
              </p>
              <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
                <li>
                  GitHub: <a 
                    href="https://github.com/StrinovaVN/Screenshot-OCR" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="font-medium text-primary underline underline-offset-4"
                  >
                    github.com/StrinovaVN/Screenshot-OCR
                  </a>
                </li>
                <li>
                  Issues: <a 
                    href="https://github.com/StrinovaVN/Screenshot-OCR/issues" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="font-medium text-primary underline underline-offset-4"
                  >
                    Report an Issue
                  </a>
                </li>
              </ul>
            </div>
          </section>

          {/* Acknowledgment */}
          <blockquote className="mt-6 border-l-2 pl-6 italic">
            By using Strinova OCR, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
          </blockquote>
        </div>
      </div>
    </div>
  );
}
