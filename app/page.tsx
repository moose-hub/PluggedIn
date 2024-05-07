import Link from 'next/link'
 
export default function Home() {
  return (
    <div className='flex flex-col text-center'>
      <h1>Plugged-in</h1>
      <Link href="/">Home</Link>
      <Link href="/login">Login</Link>
    </div>
  )
}