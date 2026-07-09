export default function RootLayout({ children }: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      {children}
    </html>
  )
};