import Image from "next/image"
import Link from "next/link"
import navbar from '../config/navbar.json'

const Navbar = () => {
    return (
        <nav className="flex flex-row justify-between mx-6">
            <div className="flex flex-row items-center gap-6">
                <div className="m-2">
                    <Link href="/">
                        <Image src="/img/logo2.png" alt="logo" height={100} width={50}/>
                    </Link>
                </div>
                <div className="flex flex-row gap-6">
                    {
                        navbar && navbar.links && navbar.links.map(link => {
                            return (
                                <Link key={link.name} href={link.url}>
                                    {link.name}
                                </Link>
                            )
                        })
                    }
                </div>
            </div>
            <div className="flex flex-row items-center gap-4">
                <Link href="/auth/sign-in">
                    <div className="font-semibold">
                        Log In
                    </div>
                </Link>
                <Link href="/auth/sign-up">
                    <div className="bg-secondary w-fit py-2 px-6 font-semibold">
                        Sign Up
                    </div>
                </Link>
            </div>
        </nav>
    )
}

export default Navbar