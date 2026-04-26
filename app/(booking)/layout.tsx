import { Navbar } from '@/components/shared/navbar'

export default function BookingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Navbar variant="solid" />
      <div className="min-h-screen bg-sp-cream pt-20">
        {children}
      </div>
    </>
  )
}
