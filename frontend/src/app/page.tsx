import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Shield, FileSearch } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-blue-50 dark:bg-gray-900 font-sans transition-colors">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center space-y-8 mb-20">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-6xl">
            Strinova OCR
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-7">
            Extract text from in-game screenshots instantly using OCR.
            Fast, accurate, and supports multiple image formats.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 justify-center mt-8">
            <Button asChild size="lg">
              <Link href="/get-started">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/term-of-service">
                Terms of Service
              </Link>
            </Button>
          </div>
        </div>

        {/* Features Section */}
        <div className="max-w-5xl mx-auto mb-20">
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight text-center mb-12">
            Key Features
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {/* Feature 1 */}
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30">
                  <Zap className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
              <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                Lightning Fast
              </h3>
              <p className="text-muted-foreground leading-7">
                Get OCR results in seconds with our optimized PaddleOCR engine. Process multiple screenshots efficiently.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30">
                  <FileSearch className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
              <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                Highly Accurate
              </h3>
              <p className="text-muted-foreground leading-7">
                Advanced OCR technology ensures high accuracy for in-game text extraction including damage, skills, and synergy data.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30">
                  <Shield className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
              <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                Privacy First
              </h3>
              <p className="text-muted-foreground leading-7">
                Your screenshots are processed securely and never stored on our servers. Complete privacy guaranteed.
              </p>
            </div>
          </div>
        </div>

        {/* Scan Types Section */}
        <div className="max-w-5xl mx-auto mb-20">
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight text-center mb-12">
            Available Scan Types
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Damage */}
            <Link 
              href="/damage"
              className="group p-6 rounded-lg border border-gray-200 dark:border-gray-800 hover:border-blue-500 dark:hover:border-blue-500 transition-all hover:shadow-lg"
            >
              <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                Damage
              </h3>
              <p className="text-sm text-muted-foreground leading-7">
                Extract damage, damage score, kills, deaths, and assists statistics from match screenshots.
              </p>
            </Link>

            {/* Skill */}
            <Link 
              href="/skill"
              className="group p-6 rounded-lg border border-gray-200 dark:border-gray-800 hover:border-blue-500 dark:hover:border-blue-500 transition-all hover:shadow-lg"
            >
              <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                Skill
              </h3>
              <p className="text-sm text-muted-foreground leading-7">
                Analyze skill usage, skill assists, skill hits, and healing data from gameplay.
              </p>
            </Link>

            {/* Synergy */}
            <Link 
              href="/synergy"
              className="group p-6 rounded-lg border border-gray-200 dark:border-gray-800 hover:border-blue-500 dark:hover:border-blue-500 transition-all hover:shadow-lg"
            >
              <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                Synergy
              </h3>
              <p className="text-sm text-muted-foreground leading-7">
                Capture synergy, damage taken, plant, defuse, and rescue statistics.
              </p>
            </Link>
          </div>
        </div>

        {/* Supported Formats */}
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm text-muted-foreground mb-4">Supported image formats:</p>
          <div className="flex flex-wrap gap-2 justify-center">
            {['JPG', 'PNG', 'WEBP', 'BMP'].map((format) => (
              <span
                key={format}
                className="px-3 py-1 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full text-xs font-medium"
              >
                {format}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
