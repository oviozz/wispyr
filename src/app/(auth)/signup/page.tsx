

import Link from "next/link"
import BrandTitle from "@/components/brand-title";
import SignupForm from "@/app/(auth)/_components/signup-form";

export default function SignUp() {

    return (
        <div className="flex items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
            <div className="mx-auto w-full max-w-md space-y-8">
                <BrandTitle className={"sm:text-4xl text-4xl text-center"}/>
                <div>
                    <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-foreground">
                        Create your account
                    </h2>
                    <p className="mt-2 text-center text-sm text-muted-foreground">
                        Or{" "}
                        <Link href={"/login"} className="hover:underline font-medium text-blue-500 hover:text-blue-500/90" prefetch={false}>
                            have a account already
                        </Link>
                    </p>
                </div>
                <SignupForm />
            </div>
        </div>
    )
}