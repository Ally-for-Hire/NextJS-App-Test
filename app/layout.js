import "./globals.css";

export const metadata = {
  title: "Hello App",
  description: "Simple Next.js app with a Hello button.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}