
import Link from "next/link"
import BrandTitle from "@/components/brand-title";
import LoginForm from "@/app/(auth)/_components/login-form";

export default function LoginPage() {


    return (
        <div className="flex min-h-[100dvh] items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
            <div className="mx-auto w-full max-w-md space-y-8">
                <BrandTitle className={"sm:text-4xl text-4xl text-center"}/>
                <div>
                    <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-foreground">
                        Log in to your account
                    </h2>
                    <p className="mt-2 text-center text-sm text-muted-foreground">
                        Or{" "}
                        <Link href={"/signup"} className="font-medium text-blue-500 hover:underline hover:text-blue-500/90" prefetch={false}>
                            register for a new account
                        </Link>
                    </p>
                </div>
                <LoginForm />
            </div>
        </div>
    )
}