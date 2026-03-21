export default function Footer() {
  return (
    <footer className="border-t border-gray-200 py-6 mt-16">
      <div className="max-w-3xl mx-auto px-4 text-sm text-gray-400 text-center">
        © {new Date().getFullYear()} SHDPR. All rights reserved.
      </div>
    </footer>
  );
}
