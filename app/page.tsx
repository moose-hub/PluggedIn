import Link from 'next/link'
 
export default function Home() {
  return (
    <div>
      <h6>Home</h6>
      <Link href="/about">About</Link>
    </div>
  )
}