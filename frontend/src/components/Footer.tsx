import { Separator } from "@/components/ui/separator";
import { Heart } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="container mx-auto px-4 py-8">
        {/* topbar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-1">
            <h4 className="text-sm leading-none font-medium text-gray-900 dark:text-white">Strinova OCR</h4>
            <p className="text-muted-foreground text-sm">
              Extract text from in-game screenshots using OCR. Fast, accurate, and supports multiple languages.
            </p>
          </div>
          <div className="flex h-5 items-center flex-wrap gap-3 text-sm">
            <a
              href="https://github.com/StrinovaVN/Screenshot-OCR/blob/main/README.md"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Documentation
            </a>
            <Separator orientation="vertical" />
            <a
              href="https://github.com/StrinovaVN/Screenshot-OCR/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Report Issues
            </a>
            <Separator orientation="vertical" />
            <a
                  href="https://discord.gg/strinovavietnam"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Our Disord
            </a>
          </div>
        </div>

        <Separator className="my-4" />

        {/* bottom bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            © {currentYear} Strinova OCR. Built by{' '}
            <a
              href="https://github.com/StrinovaVN"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
            >
              StrinovaVN
            </a>
          </p>
          <div className="flex h-5 items-center flex-wrap gap-3 text-sm">
            <span className="text-gray-600 dark:text-gray-400">Powered by</span>
            <a
              href="https://nextjs.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
            >
              Next.js
            </a>
            <Separator orientation="vertical" />
            <a
              href="https://github.com/gutenye/ocr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
            >
              PaddleOCR
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
