import Link from "next/link";
import { Upload, CheckCircle, Bubbles, Zap, Shield } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function GetStarted() {
  return (
    <div className="min-h-screen bg-blue-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
            Get Started with Strinova OCR
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Extract text from in-game screenshots in just a few steps
          </p>
        </div>

        {/* Quick Start Steps */}
        <div className="max-w-5xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Quick Start</h2>
          <div className="grid gap-8 md:grid-cols-3">
            {/* Step 1 */}
            <div className="relative">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-600 text-white font-bold text-xl mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Choose Scan Type
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Select the type of screenshot you want to scan: Replay, End Match, Damage, Skill, or Synergy.
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-600 text-white font-bold text-xl mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Upload Screenshot
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Drag & drop your in-game screenshot or click to browse. Supports JPG, PNG, WEBP, and BMP formats.
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-600 text-white font-bold text-xl mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Get Results
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                View extracted data in a structured table. Copy, download, or export results in your preferred format.
              </p>
            </div>
          </div>
        </div>

        <Separator className="my-16" />

        {/* Scan Types */}
        <div className="max-w-5xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Available Scan Types</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Damage */}
            <Link 
              href="/damage"
              className="p-6 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-blue-500 dark:hover:border-blue-500 transition-all hover:shadow-lg"
            >
              <Zap className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-3" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Damage</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Analyze damage, damage score, kills, deaths, and assists.
              </p>
            </Link>

            {/* Skill */}
            <Link 
              href="/skill"
              className="p-6 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-blue-500 dark:hover:border-blue-500 transition-all hover:shadow-lg"
            >
              <Bubbles className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-3" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Skill</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Extract skill, skill assist, skill hit and healing data.
              </p>
            </Link>

            {/* Synergy */}
            <Link 
              href="/synergy"
              className="p-6 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-blue-500 dark:hover:border-blue-500 transition-all hover:shadow-lg"
            >
              <Shield className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-3" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Synergy</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Capture synergy, damage taken, plant, defuse and rescue data
              </p>
            </Link>
          </div>
        </div>

        <Separator className="my-16" />

        {/* Features */}
        <div className="max-w-5xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Key Features</h2>
          <div className="grid gap-8 md:grid-cols-2">
            {/* Fast Processing */}
            <div className="flex gap-4">
              <div className="shrink-0">
                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                  <Zap className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Lightning Fast
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Get OCR results in seconds with our optimized PaddleOCR engine. No waiting, no delays.
                </p>
              </div>
            </div>

            {/* Accurate */}
            <div className="flex gap-4">
              <div className="shrink-0">
                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                  <CheckCircle className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Highly Accurate
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Advanced OCR technology ensures high accuracy for in-game text extraction.
                </p>
              </div>
            </div>

            {/* Privacy */}
            <div className="flex gap-4">
              <div className="shrink-0">
                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                  <Shield className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Privacy First
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Your screenshots are processed securely and never stored on our servers.
                </p>
              </div>
            </div>

            {/* Easy to Use */}
            <div className="flex gap-4">
              <div className="shrink-0">
                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                  <Upload className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Simple Interface
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Intuitive drag-and-drop interface makes it easy for anyone to use.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
