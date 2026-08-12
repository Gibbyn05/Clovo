import { redirect } from "next/navigation";

const FALLBACK_BOOKING_URL = "https://calendar.app.google/Wh2vYnLEm4KB3tHq5";

export default function DemoBookingPage() {
  redirect(process.env.GOOGLE_BOOKING_URL || FALLBACK_BOOKING_URL);
}
