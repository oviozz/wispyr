
import Link from "next/link"
import BrandTitle from "@/components/brand-title";
import {sample_built_by} from "@/data/sample-built-by";
import {Button} from "@/components/ui/button";


export default function LandingPage() {

    const isAuth: boolean = false;

    return (
        <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
            <div className="mx-auto w-full max-w-4xl space-y-8">
                <BrandTitle className={"text-5xl"}/>

                {/* Main Content */}
                <div className="space-y-4">
                    <h2 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                        Secure Conversations, Protected Data
                    </h2>
                    <p className="mx-auto max-w-[700px] text-lg text-muted-foreground sm:text-xl">
                        Experience chat messaging with uncompromising security. Your privacy is our top priority. </p>
                </div>


                <div>
                    { isAuth ?
                        (
                            <Link href={"/messages"}>
                                <Button size={"lg"} className="group relative overflow-hidden overflow-x-hidden rounded-md bg-neutral-950 dark:bg-blue-500 text-neutral-50">
                                    <span className="font-semibold relative z-10">
                                        Start Chatting
                                    </span>
                                    <span className="absolute inset-0 overflow-hidden rounded-md">
                                        <span className="absolute left-0 aspect-square w-full origin-center -translate-x-full rounded-full bg-blue-500 transition-all duration-500 group-hover:-translate-x-0 group-hover:scale-150"></span>
                                    </span>
                                </Button>
                            </Link>
                        ) : (
                            <div className={"flex justify-center items-center gap-2"}>
                                <Link href={"/login"}>
                                    <Button size={"lg"} variant={"main"}>
                                        Login
                                    </Button>
                                </Link>
                                <Link href={"/signup"}>
                                    <Button size={"lg"}>
                                        Sign up
                                    </Button>
                                </Link>
                            </div>
                        )
                    }
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center text-muted-foreground text-sm space-y-2 sm:space-y-0 sm:space-x-4">
                    <p className="text-md font-semibold">Built by:</p>
                    <ul className="flex justify-center flex-wrap gap-2">
                        {sample_built_by.map((builder, index) => (
                            <li key={index} className="bg-gray-200 px-3 py-1 rounded-full text-sm font-medium text-gray-700">
                                {builder.title}
                            </li>
                        ))}
                    </ul>
                </div>


            </div>

        </div>
    )
}